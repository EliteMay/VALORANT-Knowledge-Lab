import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const index = readJson('data/concept-index.json');
const sources = readJson('data/sources.json');
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
