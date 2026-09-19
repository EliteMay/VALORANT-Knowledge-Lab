const state = {
  concepts: [],
  sources: new Map(),
  activeId: null,
  category: 'all',
  query: ''
};

const categoryLabels = {
  'information-map-control': '情報・MAP CONTROL',
  'team-coordination': '味方との合わせ',
  'defense': '守り'
};

const els = {};
const THEME_STORAGE_KEY = 'vkl-theme';
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

window.addEventListener('DOMContentLoaded', () => {
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
    'theme-toggle', 'theme-toggle-label'
  ];
  for (const id of ids) els[id] = document.getElementById(id);
}

function initThemeControls() {
  syncThemeControl(getActiveTheme());
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

  document.querySelector('.category-filter').addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('is-active', chip === button));
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

  els['retry-button'].addEventListener('click', loadKnowledge);

  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (id && id !== state.activeId && state.concepts.some(concept => concept.id === id)) {
      selectConcept(id, false);
    }
  });
}

async function loadKnowledge() {
  showLoading();
  try {
    const [indexData, sourceData] = await Promise.all([
      fetchJson('data/concept-index.json'),
      fetchJson('data/sources.json')
    ]);

    const concepts = await Promise.all(indexData.concepts.map(entry => fetchJson(entry.path)));
    state.concepts = concepts;
    state.sources = new Map(sourceData.sources.map(source => [source.id, source]));

    renderConceptList();
    const requested = decodeURIComponent(location.hash.replace(/^#/, ''));
    const firstId = state.concepts.some(concept => concept.id === requested) ? requested : state.concepts[0]?.id;
    if (!firstId) throw new Error('No concepts found');
    selectConcept(firstId, false);
    showContent();
  } catch (error) {
    console.error(error);
    showError();
  }
}

async function fetchJson(path) {
  const response = await fetch(path, {cache: 'no-store'});
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}

function renderConceptList() {
  const items = state.concepts.filter(concept => {
    if (state.category !== 'all' && concept.category !== state.category) return false;
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

    const labels = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = concept.titleJa;
    const small = document.createElement('small');
    small.textContent = concept.titleEn;
    labels.append(strong, small);
    button.append(labels);
    return button;
  }));

  els['concept-empty'].hidden = items.length > 0;
}

function selectConcept(id, updateHash) {
  const concept = state.concepts.find(item => item.id === id);
  if (!concept) return;
  state.activeId = id;
  if (updateHash && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  renderConceptList();
  renderConcept(concept);
}

function renderConcept(concept) {
  els['concept-category'].textContent = categoryLabels[concept.category] || concept.category;
  els['concept-title'].textContent = concept.titleJa;
  els['concept-title-en'].textContent = `${concept.titleEn} / ${concept.aliases?.join(' · ') || '—'}`;
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

    const textWrap = document.createElement('div');
    const kicker = document.createElement('p');
    kicker.className = 'section-kicker';
    kicker.textContent = `CLAIM ${String(index + 1).padStart(2, '0')}`;
    const text = document.createElement('p');
    text.className = 'claim-text';
    text.textContent = claim.text;
    textWrap.append(kicker, text);

    const meta = document.createElement('div');
    meta.className = 'claim-meta';
    meta.append(
      metaRow('Strength', claim.strength, 'strength', claim.strength),
      metaRow('Type', claim.evidenceType || '—'),
      metaRow('Sources', String(claim.sourceIds?.length || 0))
    );
    if (claim.siteSynthesis) meta.append(metaRow('Boundary', 'Site Synthesis', 'site-synthesis'));

    const sourceRefs = renderClaimSourceRefs(claim.sourceIds || []);
    if (sourceRefs) textWrap.append(sourceRefs);

    article.append(textWrap, meta);
    return article;
  }));
}

function renderClaimSourceRefs(sourceIds) {
  if (!sourceIds.length) return null;

  const wrap = document.createElement('div');
  wrap.className = 'claim-source-refs';

  const label = document.createElement('span');
  label.className = 'claim-source-label';
  label.textContent = 'EVIDENCE';

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
    vodQuestions: 'VOD QUESTIONS',
    decisionCheck: 'DECISION CHECK',
    note: 'NOTE'
  };
  return labels[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
}

function renderSources(concept) {
  const ids = new Set();
  for (const id of concept.definition?.sourceIds || []) ids.add(id);
  for (const claim of concept.claims || []) for (const id of claim.sourceIds || []) ids.add(id);

  const sources = [...ids].map(id => state.sources.get(id)).filter(Boolean);
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
    sub.textContent = [source.publisherOrAuthor, source.published, source.gameScope].filter(Boolean).join(' · ');
    body.append(link, sub);

    const type = document.createElement('div');
    type.className = 'source-type';
    type.textContent = source.sourceType || 'Source';

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
      link.textContent = `${found.titleJa} / ${found.titleEn}`;
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
  return status.replaceAll('-', ' ');
}

function showLoading() {
  els['loading-state'].hidden = false;
  els['error-state'].hidden = true;
  els['concept-view'].hidden = true;
}

function showContent() {
  els['loading-state'].hidden = true;
  els['error-state'].hidden = true;
  els['concept-view'].hidden = false;
}

function showError() {
  els['loading-state'].hidden = true;
  els['error-state'].hidden = false;
  els['concept-view'].hidden = true;
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
