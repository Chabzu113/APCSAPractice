// AP Practice Platform — Global App State & Utilities
// Handles: localStorage persistence, dark mode, shared state, helper functions

const APP_VERSION = '1.4.0';   // keep in sync with GitHub release tags
const GITHUB_REPO  = 'Chabzu113/APCSAPractice';
const STORAGE_KEY  = 'apcsa_state';

// ─── Update Check ──────────────────────────────────────────────────────────
async function checkForUpdate() {
  if (sessionStorage.getItem('update_dismissed')) return;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return;
    const data = await res.json();
    const latestTag = (data.tag_name || '').replace(/^v/, '');
    if (!isNewerVersion(APP_VERSION, latestTag)) return;

    // Find the direct download URL for the platform-specific asset
    const isWin = window.electronAPI && window.electronAPI.platform === 'win32';
    const assetName = isWin ? 'APTestPrep-Win.exe' : 'APTestPrep-Mac.zip';
    const asset = (data.assets || []).find(a => a.name === assetName);
    const assetUrl = asset ? asset.browser_download_url : null;

    showUpdateBanner(data.tag_name, assetUrl, data.html_url);
  } catch (e) { /* silent fail — offline, rate-limited, etc. */ }
}

function isNewerVersion(current, latest) {
  const c = current.split('.').map(Number);
  const l = latest.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((l[i] || 0) > (c[i] || 0)) return true;
    if ((l[i] || 0) < (c[i] || 0)) return false;
  }
  return false;
}

function showUpdateBanner(version, assetUrl, releaseUrl) {
  if (document.getElementById('updateBanner')) return;
  // Auto-install works on macOS and Windows; other platforms get a browser download link
  const canAutoUpdate = !!(window.electronAPI && assetUrl &&
    (window.electronAPI.platform === 'darwin' || window.electronAPI.platform === 'win32'));
  const banner = document.createElement('div');
  banner.id = 'updateBanner';
  banner.innerHTML = `
    <span>🔔 Update available: <strong>${version}</strong></span>
    ${canAutoUpdate
      ? `<button id="updateNowBtn" class="update-banner-btn">Update Now</button>`
      : `<a href="${releaseUrl}" target="_blank" class="update-banner-btn">Download →</a>`}
    <button onclick="document.getElementById('updateBanner').remove();sessionStorage.setItem('update_dismissed','1')" class="update-banner-dismiss">Later</button>
  `;
  document.body.prepend(banner);

  if (canAutoUpdate) {
    document.getElementById('updateNowBtn').addEventListener('click', () => {
      const btn = document.getElementById('updateNowBtn');
      btn.textContent = 'Downloading...';
      btn.disabled = true;
      window.electronAPI.installUpdate(assetUrl);
      window.electronAPI.onUpdateProgress(msg => { btn.textContent = msg; });
    });
  }
}

// ─── Default State ─────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  darkMode: false,
  onboarded: false,
  // Multi-subject fields
  subjectsConfigured: false,
  selectedSubjects: [],
  activeSubject: 'apcsa',
  subjects: {},
  // Legacy (kept for migration only)
  questionHistory: {},
  testHistory: []
};

// ─── Migration ──────────────────────────────────────────────────────────────
// Runs once after loadState() to move legacy CSA data into subjects.apcsa
function migrateStateIfNeeded(state) {
  if (!state.subjects) state.subjects = {};
  if (!state.subjects.apcsa) {
    state.subjects.apcsa = {
      questionHistory: state.questionHistory || {},
      testHistory: state.testHistory || [],
      studyMinutes: 0
    };
  }
  if (!Array.isArray(state.selectedSubjects)) state.selectedSubjects = [];
  if (state.subjectsConfigured === undefined) state.subjectsConfigured = false;
  if (!state.activeSubject) state.activeSubject = 'apcsa';
  // Auto-add any newly available subjects (hasContent: true) that aren't selected yet
  if (typeof SubjectRegistry !== 'undefined') {
    const availableIds = SubjectRegistry.SUBJECTS
      .filter(s => s.hasContent)
      .map(s => s.id);
    availableIds.forEach(id => {
      if (!state.selectedSubjects.includes(id)) {
        state.selectedSubjects.push(id);
      }
    });
  }
  return state;
}

// ─── State Management ───────────────────────────────────────────────────────
let _state = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateStateIfNeeded({ ...DEFAULT_STATE });
    const parsed = JSON.parse(raw);
    return migrateStateIfNeeded({ ...DEFAULT_STATE, ...parsed });
  } catch (e) {
    console.warn('Failed to load state:', e);
    return migrateStateIfNeeded({ ...DEFAULT_STATE });
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

function getState() {
  if (!_state) _state = loadState();
  return _state;
}

function updateState(partial) {
  _state = { ...getState(), ...partial };
  saveState(_state);
  return _state;
}

function resetState() {
  _state = migrateStateIfNeeded({ ...DEFAULT_STATE });
  saveState(_state);
  return _state;
}

// ─── Subject Management ─────────────────────────────────────────────────────
function getActiveSubject() {
  return getState().activeSubject || 'apcsa';
}

function setActiveSubject(id) {
  updateState({ activeSubject: id });
  _state = getState(); // refresh cache
}

function getSubjectData(id) {
  const state = getState();
  if (!state.subjects[id]) {
    state.subjects[id] = { questionHistory: {}, testHistory: [], studyMinutes: 0 };
    saveState(state);
  }
  return state.subjects[id];
}

function getSubjectOverallStats(id) {
  const bucket = getSubjectData(id);
  const history = bucket.questionHistory || {};
  let totalAnswered = 0, totalCorrect = 0;
  Object.values(history).forEach(h => {
    if (h.seen) { totalAnswered++; if (h.correct) totalCorrect++; }
  });
  return {
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
    testsTaken: (bucket.testHistory || []).length
  };
}

// ─── Question History (scoped to active subject) ─────────────────────────────
function recordAnswer(questionId, wasCorrect) {
  const state = getState();
  const subjId = getActiveSubject();
  if (!state.subjects[subjId]) {
    state.subjects[subjId] = { questionHistory: {}, testHistory: [], studyMinutes: 0 };
  }
  const existing = state.subjects[subjId].questionHistory[questionId] || { seen: false, correct: false, attempts: 0 };
  state.subjects[subjId].questionHistory[questionId] = {
    seen: true,
    correct: wasCorrect,
    attempts: existing.attempts + 1,
    lastSeen: Date.now()
  };
  saveState(state);
}

function getQuestionStatus(questionId) {
  const state = getState();
  const subjId = getActiveSubject();
  const bucket = state.subjects[subjId];
  if (!bucket) return 'unseen';
  const h = bucket.questionHistory[questionId];
  if (!h || !h.seen) return 'unseen';
  return h.correct ? 'correct' : 'incorrect';
}

function getUnitStats(unitNumber) {
  const state = getState();
  const subjId = getActiveSubject();
  const bucket = state.subjects[subjId] || {};
  const questionHistory = bucket.questionHistory || {};
  // Load questions for the active subject (not AP CS A legacy getAllQuestions())
  const subj = typeof SubjectRegistry !== 'undefined' ? SubjectRegistry.getSubjectById(subjId) : null;
  const allQ = [];
  if (subj && subj.dataFiles) {
    subj.dataFiles.forEach(f => {
      const arr = window[f];
      if (Array.isArray(arr)) allQ.push(...arr);
    });
  } else {
    // Fallback to legacy AP CS A globals if SubjectRegistry unavailable
    allQ.push(...getAllQuestions());
  }
  const unitQ = allQ.filter(q => q.unit === unitNumber);
  let seen = 0, correct = 0;
  unitQ.forEach(q => {
    const h = questionHistory[q.id];
    if (h && h.seen) { seen++; if (h.correct) correct++; }
  });
  return {
    total: unitQ.length,
    seen,
    correct,
    accuracy: seen > 0 ? Math.round((correct / seen) * 100) : 0
  };
}

function getOverallStats() {
  const subjId = getActiveSubject();
  return getSubjectOverallStats(subjId);
}

// Helper to get all questions merged
function getAllQuestions() {
  const mcq1 = typeof MCQ_U1U2 !== 'undefined' ? MCQ_U1U2 : [];
  const mcq2 = typeof MCQ_U3U4 !== 'undefined' ? MCQ_U3U4 : [];
  const frqs = typeof FRQ_BANK !== 'undefined' ? FRQ_BANK : [];
  return [...mcq1, ...mcq2, ...frqs];
}

// ─── Test History (scoped to active subject) ─────────────────────────────────
function saveTestResult(result) {
  const state = getState();
  const subjId = getActiveSubject();
  if (!state.subjects[subjId]) {
    state.subjects[subjId] = { questionHistory: {}, testHistory: [], studyMinutes: 0 };
  }
  try { localStorage.setItem('apcsa_last_result', JSON.stringify(result)); } catch(e){}
  const hist = state.subjects[subjId].testHistory || [];
  const filtered = hist.filter(h => h.testId !== result.testId || h.date !== result.date);
  filtered.unshift(result);
  state.subjects[subjId].testHistory = filtered.slice(0, 20);
  saveState(state);
}

function getTestHistory() {
  const state = getState();
  const subjId = getActiveSubject();
  const bucket = state.subjects[subjId] || {};
  return (bucket.testHistory || []).sort((a, b) => b.date - a.date);
}

function getLastTestScore() {
  const history = getTestHistory();
  return history.length > 0 ? history[0] : null;
}

// ─── Dark Mode ──────────────────────────────────────────────────────────────
function initDarkMode() {
  const state = getState();
  applyTheme(state.darkMode);
}

function toggleDarkMode() {
  const state = getState();
  const newDark = !state.darkMode;
  updateState({ darkMode: newDark });
  applyTheme(newDark);
}

function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}

// ─── Navigation ─────────────────────────────────────────────────────────────
function navigateTo(page) {
  window.location.href = page;
}

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ─── Utility Helpers ────────────────────────────────────────────────────────
function formatDate(timestamp) {
  if (!timestamp) return '—';
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatPercent(value, total) {
  if (!total || total === 0) return '—';
  return Math.round((value / total) * 100) + '%';
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Code Block Rendering ───────────────────────────────────────────────────
const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'static', 'void', 'int', 'double',
  'boolean', 'String', 'char', 'long', 'float', 'byte', 'short',
  'for', 'while', 'do', 'if', 'else', 'return', 'new', 'class',
  'this', 'super', 'null', 'true', 'false', 'import', 'extends',
  'implements', 'interface', 'abstract', 'final', 'try', 'catch',
  'throws', 'throw', 'instanceof', 'switch', 'case', 'break',
  'continue', 'default', 'package', 'ArrayList', 'Arrays'
]);

function highlightJava(code) {
  if (!code) return '';
  const out = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === '/' && code[i+1] === '/') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      out.push('<span class="kw-comment">' + escapeHtml(code.slice(i, end)) + '</span>');
      i = end; continue;
    }
    if (code[i] === '/' && code[i+1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = code.length; else end += 2;
      out.push('<span class="kw-comment">' + escapeHtml(code.slice(i, end)) + '</span>');
      i = end; continue;
    }
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') { if (code[j] === '\\') j++; j++; }
      if (j < code.length) j++;
      out.push('<span class="kw-string">' + escapeHtml(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") { if (code[j] === '\\') j++; j++; }
      if (j < code.length) j++;
      out.push('<span class="kw-string">' + escapeHtml(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i-1]))) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      out.push('<span class="kw-number">' + escapeHtml(code.slice(i, j)) + '</span>');
      i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (JAVA_KEYWORDS.has(word)) {
        out.push('<span class="kw-keyword">' + word + '</span>');
      } else {
        out.push(escapeHtml(word));
      }
      i = j; continue;
    }
    out.push(escapeHtml(code[i]));
    i++;
  }
  return out.join('');
}

function renderCode(codeString) {
  if (!codeString) return '';
  return `<pre class="code-block"><code class="java-code">${highlightJava(codeString)}</code></pre>`;
}

// ─── AP Score Estimation ────────────────────────────────────────────────────
function estimateAPScore(mcqCorrect, frqTotal) {
  const mcqPart = (mcqCorrect / 42) * 55;
  const frqPart = frqTotal > 0 ? (frqTotal / 28) * 45 : 0;
  const composite = mcqPart + frqPart;
  if (composite >= 70) return 5;
  if (composite >= 55) return 4;
  if (composite >= 40) return 3;
  if (composite >= 25) return 2;
  return 1;
}

// ─── Navbar Init ────────────────────────────────────────────────────────────
function initNavbar() {
  document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
  }

  const currentPage = getCurrentPage();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // Subject switcher dropdown (if present)
  const switcher = document.getElementById('subjectSwitcher');
  if (switcher) renderSubjectSwitcher(switcher);
}

function renderSubjectSwitcher(container) {
  const state = getState();
  if (!state.selectedSubjects || state.selectedSubjects.length <= 1) return;
  const subjects = state.selectedSubjects
    .map(id => (typeof SubjectRegistry !== 'undefined' ? SubjectRegistry.getSubjectById(id) : null))
    .filter(Boolean);
  if (subjects.length === 0) return;
  container.innerHTML = `<select id="subjectSwitcherSelect" title="Switch subject">
    ${subjects.map(s => `<option value="${s.id}" ${s.id === state.activeSubject ? 'selected' : ''}>${s.emoji} ${s.shortName}</option>`).join('')}
  </select>`;
  const sel = document.getElementById('subjectSwitcherSelect');
  if (sel) {
    sel.addEventListener('change', e => {
      setActiveSubject(e.target.value);
      location.reload();
    });
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  checkForUpdate();
  initDesmosPanel(); // no-op on pages that don't have the panel
});

// ─── Public API ──────────────────────────────────────────────────────────────
window.App = {
  loadState, saveState, getState, updateState, resetState,
  // Subject management
  getActiveSubject, setActiveSubject, getSubjectData, getSubjectOverallStats,
  // Question history
  recordAnswer, getQuestionStatus, getUnitStats, getOverallStats, getAllQuestions,
  // Test history
  saveTestResult, getTestHistory, getLastTestScore,
  // Dark mode
  initDarkMode, toggleDarkMode, applyTheme,
  // Navigation
  navigateTo, getCurrentPage, getUrlParam,
  // Utilities
  formatDate, formatPercent, shuffle, clamp, debounce, escapeHtml,
  renderCode, estimateAPScore
};

// ─── Math Rendering Utilities (KaTeX) ────────────────────────────────────────
// Global helpers shared by questionBank.js and testRunner.js.
// Requires KaTeX to be loaded on the page (deferred CDN script).

function isLatexString(s) {
  return typeof s === 'string' && (
    s.startsWith('\\') ||
    /\\(frac|sqrt|lim|int|sum|infty|cdot|leq|geq|neq|pi|theta|alpha|beta|delta|sigma|lambda|mu|to|pm|times|div)/.test(s)
  );
}

function renderMath(container) {
  if (typeof katex === 'undefined') return; // offline or CDN not yet loaded
  container.querySelectorAll('[data-latex]').forEach(el => {
    try {
      katex.render(el.dataset.latex, el, {
        throwOnError: false,
        displayMode: el.dataset.display === 'true',
        output: 'html'
      });
    } catch(e) { /* leave raw text on KaTeX error */ }
  });
}

function mathSpan(text, display) {
  if (isLatexString(text)) {
    const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    return `<span data-latex="${escaped}" data-display="${display ? 'true' : 'false'}"></span>`;
  }
  return App.escapeHtml(String(text));
}

// Renders text that may contain LaTeX in any of four delimiter styles:
//   $$…$$   display block     (Physics/Stats)
//   $…$     inline            (Physics/Stats)
//   \[…\]   display block     (AP Calc style)
//   \(…\)   inline            (AP Calc style)
// Also handles a fully-raw bare-LaTeX string (e.g. "\frac{1}{2}x^2").
function renderFRQPromptText(text) {
  if (!text) return '';
  // Shortcut: ONLY for pure bare-LaTeX strings that start with \ and have no delimiter wrappers.
  // Excludes natural-language sentences like "The rate... \(A(t)=10\sqrt{t}\) people/hr."
  if (isLatexString(text) && text.startsWith('\\') && !text.includes('$')) return mathSpan(text, false);
  // Match all four delimiter styles
  const re = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  let lastIndex = 0, result = '', match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) result += App.escapeHtml(text.slice(lastIndex, match.index)).replace(/\n/g, '<br>');
    const raw = match[0];
    const isDisplay = raw.startsWith('$$') || raw.startsWith('\\[');
    // Strip delimiters: $$ / \[ / \( are 2 chars each; single $ is 1 char
    const inner = (raw.startsWith('$') && !raw.startsWith('$$'))
      ? raw.slice(1, -1).trim()
      : raw.slice(2, -2).trim();
    const esc = inner.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    result += `<span data-latex="${esc}" data-display="${isDisplay ? 'true' : 'false'}"></span>`;
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) result += App.escapeHtml(text.slice(lastIndex)).replace(/\n/g, '<br>');
  return result;
}

// ─── Table builder (shared between testRunner and questionBank) ───────────────
// Renders a { headers: [...], rows: [[...], ...] } data object as an HTML table.
function buildTableHtml(tableData) {
  if (!tableData || !tableData.headers) return '';
  const ths = tableData.headers.map(h => `<th>${App.escapeHtml(h)}</th>`).join('');
  const rows = (tableData.rows || []).map(row => {
    const tds = row.map(cell => `<td>${App.escapeHtml(cell)}</td>`).join('');
    return `<tr>${tds}</tr>`;
  }).join('');
  return `<div class="q-table-wrap"><table class="q-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

// ─── Desmos Graphing Calculator ───────────────────────────────────────────────
// Toggles the floating Desmos panel (iframe-based, no API key needed).
// Buttons wire up via addEventListener in questionBank.js / testRunner.js —
// NOT onclick attributes, which are blocked by the Electron CSP.
function toggleDesmos() {
  const panel = document.getElementById('desmos-panel');
  if (!panel) return;
  const visible = panel.style.display !== 'none';
  panel.style.display = visible ? 'none' : 'block';
}

// Makes the Desmos panel draggable via its title bar (#desmos-drag).
// Called once on DOMContentLoaded for pages that include the panel.
function initDesmosPanel() {
  const panel = document.getElementById('desmos-panel');
  const handle = document.getElementById('desmos-drag');
  if (!panel || !handle) return;

  let isDragging = false;
  let startMouseX = 0, startMouseY = 0;
  let startPanelLeft = 0, startPanelTop = 0;

  handle.addEventListener('mousedown', e => {
    // Don't initiate drag when clicking the close button inside the handle
    if (e.target.id === 'desmos-close') return;
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    // Switch from bottom/right anchoring to top/left so we can move it freely
    panel.style.bottom = 'auto';
    panel.style.right  = 'auto';
    panel.style.left   = rect.left + 'px';
    panel.style.top    = rect.top  + 'px';
    startMouseX    = e.clientX;
    startMouseY    = e.clientY;
    startPanelLeft = rect.left;
    startPanelTop  = rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;
    const maxX = window.innerWidth  - panel.offsetWidth;
    const maxY = window.innerHeight - panel.offsetHeight;
    panel.style.left = Math.max(0, Math.min(startPanelLeft + dx, maxX)) + 'px';
    panel.style.top  = Math.max(0, Math.min(startPanelTop  + dy, maxY)) + 'px';
  });

  document.addEventListener('mouseup', () => { isDragging = false; });
}
