const state = {
  concepts: [],
  domains: [],
  sources: new Map(),
  activeId: null,
  activeDomainId: null,
  query: ''
};

const categoryLabels = {
  'information-map-control': '情報・マップコントロール',
  'team-coordination': '味方との合わせ',
  'defense': '守り',
  'peek-duel': '撃ち合い・ピーク'
};

const strengthLabels = {
  'Confirmed': '確認済み',
  'Supported': '根拠あり',
  'Context-dependent': '条件次第',
  'Weak': '根拠弱め',
  'Unverified': '未確認'
};

const evidenceTypeLabels = {
  'Official / Mechanic': '公式仕様・ゲーム仕様',
  'Expert Practice / Analysis': 'プロ・専門家の実戦分析',
  'Academic General Principle': '論文から言える一般原理',
  'Coaching Heuristic': 'コーチング上の目安',
  'Community Observation': 'コミュニティでの観察',
  'Site Synthesis': 'サイトによる整理',
  'Pro / VCT Analyst Practice': 'プロ・VCTアナリストの実戦分析'
};

const sourceTypeLabels = {
  'Pro Practice': 'プロの実戦知識',
  'Pro Interview': 'プロ選手インタビュー',
  'Pro Coach Interview': 'プロコーチインタビュー',
  'Coaching / Analysis': 'コーチング・分析',
  'Pro IGL Interview': 'プロIGLインタビュー',
  'Coaching Heuristic': 'コーチング上の目安',
  'Peer-reviewed Paper': '査読論文',
  'Systematic Review': '系統的レビュー',
  'VCT Analyst Direct Analysis': 'VCTアナリスト本人の分析',
  'Official Credential Context': '公式プロフィール確認',
  'Pro Player Interview': 'プロ選手インタビュー',
  'Terminology Reference': '用語参照',
  'Official / Mechanic': '公式仕様・ゲーム仕様',
  'Official / Data Analysis': '公式データ分析',
  'Official / Design Context': '公式設計資料'
};

const gameScopeLabels = {
  'VALORANT': 'VALORANT',
  'CS:GO / general tactical-FPS applicability': 'CS:GO / タクティカルFPS全般への応用',
  'Esports / cross-game': 'eスポーツ全般',
  'VALORANT / VCT Pacific': 'VALORANT / VCT Pacific',
  'VALORANT / international pro play': 'VALORANT / 国際プロシーン',
  'VALORANT esports': 'VALORANT eスポーツ',
  'Professional Counter-Strike / general esports teamwork applicability': 'Counter-Strikeプロ / eスポーツの連携全般',
  'VALORANT / Japan Challengers': 'VALORANT / 日本Challengers',
  'VALORANT / all ranks': 'VALORANT / 全ランク',
  'VALORANT / Platinum-Diamond ranked': 'VALORANT / プラチナ〜ダイヤ帯',
  'VALORANT / PC': 'VALORANT / PC版',
  'FPS / general aiming applicability': 'FPS全般 / エイム研究',
  'FPS / Aim Lab / professional-level players': 'FPS全般 / Aim Lab / プロ級選手',
  'FPS / Aim Lab / aiming focus-of-attention': 'FPS全般 / Aim Lab / エイム時の注意研究'
};

const els = {};
const THEME_STORAGE_KEY = 'vkl-theme';
const SITE_DATA_VERSION = '20260919-2308';
const FETCH_TIMEOUT_MS = 6000;
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

window.addEventListener('DOMContentLoaded', () => {
  window.__vklAppReady = true;
  cacheElements();
  initThemeControls();
  bindEvents();
  loadKnowledge();
});

function cacheElements() {
  const ids = [
    'concept-search', 'concept-list', 'concept-empty', 'loading-state', 'error-state',
    'retry-button', 'concept-view', 'concept-category', 'concept-title', 'concept-title-en',
    'concept-status', 'concept-definition', 'goal-section', 'concept-goals', 'subtype-section',
    'concept-subtypes', 'claims-section-number', 'concept-claims', 'concept-cues',
    'concept-mistakes', 'concept-practice', 'concept-sources', 'related-section', 'related-concepts',
    'theme-toggle', 'theme-toggle-label', 'sidebar', 'sidebar-domain-link', 'sidebar-domain-title',
    'sidebar-domain-description', 'home-view', 'domain-grid', 'domain-view', 'domain-title',
    'domain-description', 'domain-concept-list', 'source-count', 'error-detail'
  ];
  for (const id of ids) els[id] = document.getElementById(id);
}

function initThemeControls() {
  applyTheme(getActiveTheme(), false);
  systemThemeQuery.addEventListener?.('change', event => {
    if (getStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light', false);
  });
}

function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function getActiveTheme() {
  const current = document.documentElement.dataset.theme;
  if (current === 'dark' || current === 'light') return current;
  return systemThemeQuery.matches ? 'dark' : 'light';
}

function applyTheme(theme, persist) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.getElementById('theme-color');
  if (themeColor) themeColor.content = theme === 'dark' ? '#081018' : '#0f1923';

  if (persist) {
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
  }

  syncThemeControl(theme);
}

function syncThemeControl(theme) {
  const isDark = theme === 'dark';
  const nextLabel = isDark ? 'ライト' : 'ナイト';
  const accessibleLabel = isDark ? 'ライトモードに切り替える' : 'ナイトモードに切り替える';

  els['theme-toggle']?.setAttribute('aria-pressed', String(isDark));
  els['theme-toggle']?.setAttribute('aria-label', accessibleLabel);
  if (els['theme-toggle']) els['theme-toggle'].title = accessibleLabel;
  if (els['theme-toggle-label']) els['theme-toggle-label'].textContent = nextLabel;
}

function bindEvents() {
  els['theme-toggle'].addEventListener('click', () => {
    const nextTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  els['concept-search'].addEventListener('input', event => {
    state.query = event.target.value.trim().toLocaleLowerCase('ja');
    renderConceptList();
  });

  els['concept-list'].addEventListener('click', event => {
    const button = event.target.closest('[data-concept-id]');
    if (!button) return;
    selectConcept(button.dataset.conceptId, true);
  });

  els['related-concepts'].addEventListener('click', event => {
    const link = event.target.closest('[data-related-id]');
    if (!link) return;
    event.preventDefault();
    selectConcept(link.dataset.relatedId, true);
    document.getElementById('main-content').scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth'});
  });

  document.querySelector('.article-jump-nav')?.addEventListener('click', event => {
    const button = event.target.closest('[data-scroll-target]');
    if (!button) return;
    const target = document.getElementById(button.dataset.scrollTarget);
    if (!target) return;
    target.scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start'});
  });

  els['retry-button'].addEventListener('click', loadKnowledge);

  window.addEventListener('hashchange', routeFromHash);
}

async function loadKnowledge() {
  showLoading();
  try {
    const [indexData, sourceData, domainData] = await Promise.all([
      fetchJson('data/concept-index.json'),
      fetchJson('data/sources.json'),
      fetchJson('data/domains.json')
    ]);

    const concepts = await Promise.all(indexData.concepts.map(entry => fetchJson(entry.path)));
    state.concepts = concepts;
    state.domains = domainData.domains || [];
    state.sources = new Map(sourceData.sources.map(source => [source.id, source]));

    window.__vklDataReady = true;
    renderHomeDomains();
    routeFromHash();
  } catch (error) {
    console.error(error);
    window.__vklDataReady = false;
    showError(formatLoadError(error));
  }
}

async function fetchJson(path) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const url = new URL(path, document.baseURI);
    url.searchParams.set('v', SITE_DATA_VERSION);
    const response = await fetch(url, {cache: 'no-store', signal: controller.signal});
    if (!response.ok) throw new Error(`${path} の取得に失敗しました（HTTP ${response.status}）`);
    return await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error(`${path} の読み込みがタイムアウトしました`);
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

function formatLoadError(error) {
  const message = error?.message || '不明な読み込みエラー';
  return `${message}。再試行しても直らない場合は、ページを更新してください。`;
}

function renderConceptList() {
  const domain = getDomain(state.activeDomainId);
  const allowed = new Set(domain?.conceptIds || state.concepts.map(concept => concept.id));
  const items = state.concepts.filter(concept => {
    if (!allowed.has(concept.id)) return false;
    if (!state.query) return true;
    const haystack = [
      concept.titleJa,
      concept.titleEn,
      ...(concept.aliases || []),
      concept.definition?.text,
      ...(concept.claims || []).map(claim => claim.text)
    ].filter(Boolean).join(' ').toLocaleLowerCase('ja');
    return haystack.includes(state.query);
  });

  els['concept-list'].replaceChildren(...items.map(concept => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'concept-button';
    button.dataset.conceptId = concept.id;
    button.classList.toggle('is-active', concept.id === state.activeId);
    button.setAttribute('aria-current', concept.id === state.activeId ? 'page' : 'false');

    const strong = document.createElement('strong');
    strong.textContent = concept.titleJa;
    button.append(strong);
    return button;
  }));

  els['concept-empty'].hidden = items.length > 0;
}

function selectConcept(id, updateHash) {
  const concept = state.concepts.find(item => item.id === id);
  if (!concept) return;
  const currentDomain = getDomain(state.activeDomainId);
  if (!currentDomain?.conceptIds?.includes(id)) {
    state.activeDomainId = getDomainsForConcept(id)[0]?.id || null;
  }
  state.activeId = id;
  if (updateHash && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  renderSidebarContext();
  renderConceptList();
  renderConcept(concept);
  showConceptView();
}

function getDomain(id) {
  return state.domains.find(domain => domain.id === id) || null;
}

function getDomainsForConcept(conceptId) {
  return state.domains.filter(domain => domain.conceptIds?.includes(conceptId));
}

function conceptsForDomain(domain) {
  const ids = new Set(domain?.conceptIds || []);
  return state.concepts.filter(concept => ids.has(concept.id));
}

function renderHomeDomains() {
  const nodes = state.domains.map((domain, index) => {
    const link = document.createElement('a');
    link.className = 'domain-card';
    link.href = `#domain-${domain.id}`;

    const number = document.createElement('span');
    number.className = 'domain-number';
    number.textContent = String(index + 1).padStart(2, '0');

    const body = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = domain.title;
    const description = document.createElement('p');
    description.textContent = domain.description;
    const examples = document.createElement('p');
    examples.className = 'domain-examples';
    examples.textContent = (domain.examples || []).join(' ・ ');
    const count = document.createElement('span');
    count.className = 'domain-count';
    count.textContent = `${conceptsForDomain(domain).length}件の知識`;
    body.append(title, description, examples, count);

    const arrow = document.createElement('span');
    arrow.className = 'domain-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    link.append(number, body, arrow);
    return link;
  });
  els['domain-grid'].replaceChildren(...nodes);
}

function renderDomainView(domain) {
  els['domain-title'].textContent = domain.title;
  els['domain-description'].textContent = domain.description;
  const nodes = conceptsForDomain(domain).map(concept => {
    const link = document.createElement('a');
    link.className = 'domain-concept-row';
    link.href = `#${concept.id}`;

    const body = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = concept.titleJa;
    const description = document.createElement('p');
    description.textContent = concept.definition?.text || '';
    body.append(title, description);

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    link.append(body, arrow);
    return link;
  });
  els['domain-concept-list'].replaceChildren(...nodes);
}

function renderSidebarContext() {
  const domain = getDomain(state.activeDomainId);
  els['sidebar-domain-title'].textContent = domain?.title || '知識一覧';
  els['sidebar-domain-description'].textContent = domain?.description || '関連する知識を表示します。';
  els['sidebar-domain-link'].href = domain ? `#domain-${domain.id}` : '#home';
  els['sidebar-domain-link'].textContent = domain ? `← ${domain.title}一覧へ` : '← ホームへ';
}

function routeFromHash() {
  const route = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!route || route === 'home') {
    showHomeView();
    return;
  }

  if (route.startsWith('domain-')) {
    const domain = getDomain(route.slice('domain-'.length));
    if (domain) {
      state.activeDomainId = domain.id;
      state.activeId = null;
      state.query = '';
      if (els['concept-search']) els['concept-search'].value = '';
      renderDomainView(domain);
      showDomainView();
      return;
    }
  }

  const concept = state.concepts.find(item => item.id === route);
  if (concept) {
    selectConcept(concept.id, false);
    return;
  }

  showHomeView();
}

function showHomeView() {
  document.querySelector('.app-shell')?.classList.add('overview-mode');
  els['sidebar'].hidden = true;
  els['loading-state'].hidden = true;
  els['error-state'].hidden = true;
  els['home-view'].hidden = false;
  els['domain-view'].hidden = true;
  els['concept-view'].hidden = true;
  document.title = 'VALORANT Knowledge Lab';
}

function showDomainView() {
  document.querySelector('.app-shell')?.classList.add('overview-mode');
  els['sidebar'].hidden = true;
  els['loading-state'].hidden = true;
  els['error-state'].hidden = true;
  els['home-view'].hidden = true;
  els['domain-view'].hidden = false;
  els['concept-view'].hidden = true;
  const domain = getDomain(state.activeDomainId);
  document.title = domain ? `${domain.title} | VALORANT Knowledge Lab` : 'VALORANT Knowledge Lab';
}

function showConceptView() {
  document.querySelector('.app-shell')?.classList.remove('overview-mode');
  els['sidebar'].hidden = false;
  els['loading-state'].hidden = true;
  els['error-state'].hidden = true;
  els['home-view'].hidden = true;
  els['domain-view'].hidden = true;
  els['concept-view'].hidden = false;
}

function renderConcept(concept) {
  els['concept-category'].textContent = categoryLabels[concept.category] || concept.category;
  els['concept-title'].textContent = concept.titleJa;
  els['concept-title-en'].textContent = `英語名: ${concept.titleEn}`;
  els['concept-status'].textContent = formatStatus(concept.status);
  els['concept-definition'].textContent = concept.definition?.text || '';

  renderGoals(concept.goal || []);
  renderSubtypes(concept.subtypes || []);
  renderClaims(concept.claims || []);
  renderSimpleList(els['concept-cues'], concept.cues || []);
  renderSimpleList(els['concept-mistakes'], concept.mistakes || []);
  renderPractice(concept.practice || {});
  renderSources(concept);
  renderRelated(concept.relatedConceptIds || []);

  document.title = `${concept.titleJa} | VALORANT Knowledge Lab`;
}

function renderGoals(goals) {
  els['goal-section'].hidden = goals.length === 0;
  els['concept-goals'].replaceChildren(...goals.map(makeListItem));
  updateSectionNumbers(goals.length > 0, !els['subtype-section'].hidden);
}

function renderSubtypes(subtypes) {
  els['subtype-section'].hidden = subtypes.length === 0;
  els['concept-subtypes'].replaceChildren(...subtypes.map(item => {
    const card = document.createElement('article');
    card.className = 'subtype-card';
    const heading = document.createElement('h4');
    heading.textContent = item.label;
    const text = document.createElement('p');
    text.textContent = item.description;
    card.append(heading, text);
    return card;
  }));
  updateSectionNumbers(!els['goal-section'].hidden, subtypes.length > 0);
}

function updateSectionNumbers(hasGoal, hasSubtype) {
  let number = 1;
  if (hasGoal) number += 1;
  if (hasSubtype) number += 1;
  els['claims-section-number'].textContent = String(number).padStart(2, '0');
}

function renderClaims(claims) {
  els['concept-claims'].replaceChildren(...claims.map((claim, index) => {
    const article = document.createElement('article');
    article.className = 'claim';

    const head = document.createElement('div');
    head.className = 'claim-head';

    const indexLabel = document.createElement('span');
    indexLabel.className = 'claim-index';
    indexLabel.textContent = String(index + 1).padStart(2, '0');

    const strength = document.createElement('span');
    strength.className = 'claim-strength';
    strength.dataset.strength = claim.strength || '';
    strength.textContent = formatStrength(claim.strength);

    head.append(indexLabel, strength);

    const text = document.createElement('p');
    text.className = 'claim-text';
    text.textContent = claim.text;

    const quickMeta = document.createElement('div');
    quickMeta.className = 'claim-summary-meta';

    const type = document.createElement('span');
    type.textContent = formatEvidenceType(claim.evidenceType);

    const sourceCount = document.createElement('span');
    sourceCount.textContent = `出典 ${claim.sourceIds?.length || 0}件`;

    quickMeta.append(type, sourceCount);

    if (claim.siteSynthesis) {
      const synthesis = document.createElement('span');
      synthesis.textContent = 'サイト整理';
      quickMeta.append(synthesis);
    }

    const details = document.createElement('details');
    details.className = 'claim-evidence';

    const summary = document.createElement('summary');
    summary.textContent = '対応する出典を見る';
    details.append(summary);

    const evidenceBody = document.createElement('div');
    evidenceBody.className = 'claim-evidence-body';

    const sourceRefs = renderClaimSourceRefs(claim.sourceIds || []);
    if (sourceRefs) evidenceBody.append(sourceRefs);
    details.append(evidenceBody);

    article.append(head, text, quickMeta, details);
    return article;
  }));
}

function renderClaimSourceRefs(sourceIds) {
  if (!sourceIds.length) return null;

  const wrap = document.createElement('div');
  wrap.className = 'claim-source-refs';

  const label = document.createElement('span');
  label.className = 'claim-source-label';
  label.textContent = '根拠';

  const links = document.createElement('div');
  links.className = 'claim-source-links';

  for (const id of sourceIds) {
    const source = state.sources.get(id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'claim-source-link';
    button.textContent = source ? `${source.sourceTier || '?'} · ${source.publisherOrAuthor || source.title}` : id;
    button.title = source?.title || id;
    button.addEventListener('click', () => {
      const target = document.getElementById(sourceAnchorId(id));
      if (!target) return;
      target.scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center'});
      target.classList.remove('is-highlighted');
      requestAnimationFrame(() => target.classList.add('is-highlighted'));
      window.setTimeout(() => target.classList.remove('is-highlighted'), 1800);
    });
    links.append(button);
  }

  wrap.append(label, links);
  return wrap;
}

function sourceAnchorId(id) {
  return `source-${String(id).replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}

function metaRow(label, value, valueClass = '', dataStrength = '') {
  const row = document.createElement('div');
  row.className = 'meta-row';
  const labelEl = document.createElement('span');
  labelEl.className = 'meta-label';
  labelEl.textContent = label;
  const valueEl = document.createElement('span');
  valueEl.className = valueClass;
  valueEl.textContent = value;
  if (dataStrength) valueEl.dataset.strength = dataStrength;
  row.append(labelEl, valueEl);
  return row;
}

function renderSimpleList(element, items) {
  element.replaceChildren(...items.map(makeListItem));
}

function makeListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}

function renderPractice(practice) {
  const blocks = [];
  for (const [key, value] of Object.entries(practice)) {
    const block = document.createElement('div');
    block.className = 'practice-block';
    const heading = document.createElement('h4');
    heading.textContent = practiceLabel(key);
    block.append(heading);

    if (Array.isArray(value)) {
      const list = document.createElement(key.toLowerCase().includes('question') || key.toLowerCase().includes('check') ? 'ol' : 'ul');
      list.append(...value.map(makeListItem));
      block.append(list);
    } else {
      const p = document.createElement('p');
      p.className = 'practice-note';
      p.textContent = String(value);
      block.append(p);
    }
    blocks.push(block);
  }
  els['concept-practice'].replaceChildren(...blocks);
}

function practiceLabel(key) {
  const labels = {
    vodQuestions: '試合動画で確認すること',
    decisionCheck: '判断チェック',
    note: '補足'
  };
  return labels[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
}

function renderSources(concept) {
  const ids = new Set();
  for (const id of concept.definition?.sourceIds || []) ids.add(id);
  for (const claim of concept.claims || []) for (const id of claim.sourceIds || []) ids.add(id);

  const sources = [...ids].map(id => state.sources.get(id)).filter(Boolean);
  if (els['source-count']) els['source-count'].textContent = `${sources.length}件`;
  els['concept-sources'].replaceChildren(...sources.map(source => {
    const item = document.createElement('article');
    item.className = 'source-item';
    item.id = sourceAnchorId(source.id);

    const tier = document.createElement('span');
    tier.className = 'source-tier';
    tier.dataset.tier = source.sourceTier || '?';
    tier.textContent = source.sourceTier || '?';

    const body = document.createElement('div');
    const link = document.createElement('a');
    link.className = 'source-title';
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = source.title;
    const sub = document.createElement('p');
    sub.className = 'source-sub';
    sub.textContent = [source.publisherOrAuthor, source.published, formatGameScope(source.gameScope)].filter(Boolean).join(' · ');
    body.append(link, sub);

    const type = document.createElement('div');
    type.className = 'source-type';
    type.textContent = formatSourceType(source.sourceType);

    item.append(tier, body, type);
    return item;
  }));
}

function renderRelated(ids) {
  const items = ids.map(id => {
    const found = state.concepts.find(concept => concept.id === id);
    if (found) {
      const link = document.createElement('a');
      link.href = `#${found.id}`;
      link.className = 'related-link';
      link.dataset.relatedId = found.id;
      link.textContent = found.titleJa;
      return link;
    }
    const span = document.createElement('span');
    span.className = 'related-missing';
    span.textContent = `${id}（調査予定）`;
    return span;
  });
  els['related-section'].hidden = items.length === 0;
  els['related-concepts'].replaceChildren(...items);
}

function formatStatus(status = '') {
  const labels = {
    'research-backed-draft': '根拠付き・草案'
  };
  return labels[status] || status.replaceAll('-', ' ');
}

function formatStrength(value = '') {
  return strengthLabels[value] || value || '—';
}

function formatEvidenceType(value = '') {
  return evidenceTypeLabels[value] || value || '—';
}

function formatSourceType(value = '') {
  return sourceTypeLabels[value] || value || '出典';
}

function formatGameScope(value = '') {
  return gameScopeLabels[value] || value;
}

function showLoading() {
  document.querySelector('.app-shell')?.classList.add('overview-mode');
  if (els['sidebar']) els['sidebar'].hidden = true;
  els['loading-state'].hidden = false;
  els['error-state'].hidden = true;
  if (els['home-view']) els['home-view'].hidden = true;
  if (els['domain-view']) els['domain-view'].hidden = true;
  els['concept-view'].hidden = true;
}

function showError(message = '') {
  document.querySelector('.app-shell')?.classList.add('overview-mode');
  if (els['sidebar']) els['sidebar'].hidden = true;
  els['loading-state'].hidden = true;
  els['error-state'].hidden = false;
  if (els['home-view']) els['home-view'].hidden = true;
  if (els['domain-view']) els['domain-view'].hidden = true;
  els['concept-view'].hidden = true;
  if (els['error-detail'] && message) els['error-detail'].textContent = message;
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
