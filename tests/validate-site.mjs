import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const index = readJson('data/concept-index.json');
const sources = readJson('data/sources.json');
const domains = readJson('data/domains.json');
const sourceIds = new Set(sources.sources.map(source => source.id));
const errors = [];
const warnings = [];
const conceptIds = new Set();

for (const entry of index.concepts) {
  const fullPath = path.join(root, entry.path);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing concept file: ${entry.path}`);
    continue;
  }
  const concept = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  conceptIds.add(concept.id);
  for (const field of ['id','titleJa','titleEn','category','definition','claims','cues','mistakes','practice']) {
    if (concept[field] == null) errors.push(`${entry.path}: missing ${field}`);
  }
  if (concept.id !== entry.id) errors.push(`${entry.path}: index id ${entry.id} != concept id ${concept.id}`);

  const refs = new Set([...(concept.definition?.sourceIds || [])]);
  for (const claim of concept.claims || []) for (const id of claim.sourceIds || []) refs.add(id);
  for (const ref of refs) if (!sourceIds.has(ref)) errors.push(`${concept.id}: missing source ${ref}`);
}

for (const entry of index.concepts) {
  const concept = readJson(entry.path);
  for (const related of concept.relatedConceptIds || []) {
    if (!conceptIds.has(related)) warnings.push(`${concept.id}: related concept not yet present: ${related}`);
  }
}

for (const file of ['index.html','styles.css','app.js']) {
  if (!fs.existsSync(path.join(root,file))) errors.push(`Missing site file: ${file}`);
}

const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const htmlSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const cssSource = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');


const knownConceptIds = new Set(index.concepts.map(entry => entry.id));
const domainIds = new Set();
const coveredConceptIds = new Set();
for (const domain of domains.domains || []) {
  if (!domain.id || !domain.title || !domain.description) errors.push('data/domains.json: domain missing required fields');
  if (domainIds.has(domain.id)) errors.push(`data/domains.json: duplicate domain ${domain.id}`);
  domainIds.add(domain.id);
  if (!Array.isArray(domain.conceptIds) || domain.conceptIds.length === 0) errors.push(`data/domains.json: empty domain ${domain.id}`);
  for (const conceptId of domain.conceptIds || []) {
    if (!knownConceptIds.has(conceptId)) errors.push(`data/domains.json: unknown concept ${conceptId} in ${domain.id}`);
    coveredConceptIds.add(conceptId);
  }
}
for (const conceptId of knownConceptIds) {
  if (!coveredConceptIds.has(conceptId)) errors.push(`data/domains.json: concept not reachable from home ${conceptId}`);
}
for (const id of ['micro','macro','aim-mechanics','positioning','information-decision','weapon-range','teamplay']) {
  if (!domainIds.has(id)) errors.push(`data/domains.json: missing learning domain ${id}`);
}
for (const token of ['home-view','domain-grid','domain-view','domain-concept-list','sidebar-domain-link']) {
  if (!htmlSource.includes(token)) errors.push(`index.html: missing learning hub hook ${token}`);
}
for (const token of ['renderHomeDomains','renderDomainView','routeFromHash','showHomeView','showDomainView']) {
  if (!appSource.includes(token)) errors.push(`app.js: missing learning hub behavior ${token}`);
}

for (const token of ['renderClaimSourceRefs', 'sourceAnchorId', 'claim-source-link']) {
  if (!appSource.includes(token)) errors.push(`app.js: missing claim-to-source traceability hook ${token}`);
}

for (const token of ['theme-toggle', 'theme-toggle-label', 'color-scheme', 'prefers-color-scheme']) {
  if (!htmlSource.includes(token)) errors.push(`index.html: missing theme hook ${token}`);
}
for (const token of ['THEME_STORAGE_KEY', 'applyTheme', 'getActiveTheme', 'systemThemeQuery']) {
  if (!appSource.includes(token)) errors.push(`app.js: missing theme behavior ${token}`);
}
for (const token of ['html[data-theme="dark"]', '.theme-toggle', '.theme-icon-sun']) {
  if (!cssSource.includes(token)) errors.push(`styles.css: missing night-mode style ${token}`);
}

for (const token of ['根拠から学ぶ戦術知識', '知識一覧', '重要ポイント', 'このページの根拠']) {
  if (!htmlSource.includes(token)) errors.push(`index.html: missing Japanese-first UI label ${token}`);
}
for (const token of ['strengthLabels', 'evidenceTypeLabels', 'sourceTypeLabels', 'gameScopeLabels', '根拠付き・草案']) {
  if (!appSource.includes(token)) errors.push(`app.js: missing Japanese metadata mapping ${token}`);
}

const unexplainedEnglish = /\b(?:Adaptation|Commit|Hold|Delay|Execute|Threat|Punish|Fight|LOS|Setup|Partner|Pressure|Rotation|Utility|Contact|Route|Timing|Action|Position|Role|Value|Main group)\b/i;
for (const entry of index.concepts) {
  const concept = readJson(entry.path);
  const visibleText = [
    concept.definition?.text,
    ...(concept.goal || []),
    ...(concept.claims || []).map(claim => claim.text),
    ...(concept.subtypes || []).flatMap(item => [item.label, item.description]),
    ...(concept.cues || []),
    ...(concept.mistakes || []),
    ...Object.values(concept.practice || {}).flatMap(value => Array.isArray(value) ? value : [value])
  ].filter(Boolean).join('\n');
  if (unexplainedEnglish.test(visibleText)) {
    errors.push(`${concept.id}: unexplained English remains in visible learning copy`);
  }
}

if (warnings.length) {
  console.log('Warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error('Errors:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS: ${index.concepts.length} concepts, ${sources.sources.length} sources, site shell present.`);
