// AP CS A Practice Platform — Global App State & Utilities
// Handles: localStorage persistence, dark mode, shared state, helper functions

const APP_VERSION = '1.0.0';
const STORAGE_KEY = 'apcsa_state';

// ─── Default State ─────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  questionHistory: {},
  testHistory: [],
  darkMode: false,
  onboarded: false
};

// ─── State Management ───────────────────────────────────────────────────────
let _state = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.warn('Failed to load state:', e);
    return { ...DEFAULT_STATE };
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
  _state = { ...DEFAULT_STATE };
  saveState(_state);
  return _state;
}

// ─── Question History ───────────────────────────────────────────────────────
function recordAnswer(questionId, wasCorrect) {
  const state = getState();
  const existing = state.questionHistory[questionId] || { seen: false, correct: false, attempts: 0 };
  state.questionHistory[questionId] = {
    seen: true,
    correct: wasCorrect,
    attempts: existing.attempts + 1,
    lastSeen: Date.now()
  };
  saveState(state);
}

function getQuestionStatus(questionId) {
  const state = getState();
  const h = state.questionHistory[questionId];
  if (!h || !h.seen) return 'unseen';
  return h.correct ? 'correct' : 'incorrect';
}

function getUnitStats(unitNumber) {
  const state = getState();
  const allQ = getAllQuestions();
  const unitQ = allQ.filter(q => q.unit === unitNumber);
  let seen = 0, correct = 0;
  unitQ.forEach(q => {
    const h = state.questionHistory[q.id];
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
  const state = getState();
  const history = state.questionHistory;
  let totalAnswered = 0, totalCorrect = 0;
  Object.values(history).forEach(h => {
    if (h.seen) { totalAnswered++; if (h.correct) totalCorrect++; }
  });
  return {
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
    testsTaken: (state.testHistory || []).length
  };
}

// Helper to get all questions merged
function getAllQuestions() {
  const mcq1 = typeof MCQ_U1U2 !== 'undefined' ? MCQ_U1U2 : [];
  const mcq2 = typeof MCQ_U3U4 !== 'undefined' ? MCQ_U3U4 : [];
  const frqs = typeof FRQ_BANK !== 'undefined' ? FRQ_BANK : [];
  return [...mcq1, ...mcq2, ...frqs];
}

// ─── Test History ───────────────────────────────────────────────────────────
function saveTestResult(result) {
  const state = getState();
  if (!state.testHistory) state.testHistory = [];
  // Store as localStorage 'apcsa_last_result' too for review page
  try { localStorage.setItem('apcsa_last_result', JSON.stringify(result)); } catch(e){}
  // Remove old result for same testId if exists
  state.testHistory = state.testHistory.filter(h => h.testId !== result.testId || h.date !== result.date);
  state.testHistory.unshift(result);
  if (state.testHistory.length > 20) state.testHistory = state.testHistory.slice(0, 20);
  saveState(state);
}

function getTestHistory() {
  return (getState().testHistory || []).sort((a, b) => b.date - a.date);
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
  // Update toggle button icon
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.textContent = newDark ? '☀️' : '🌙';
}

function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
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
const JAVA_KEYWORDS = [
  'public', 'private', 'protected', 'static', 'void', 'int', 'double',
  'boolean', 'String', 'char', 'long', 'float', 'byte', 'short',
  'for', 'while', 'do', 'if', 'else', 'return', 'new', 'class',
  'this', 'super', 'null', 'true', 'false', 'import', 'extends',
  'implements', 'interface', 'abstract', 'final', 'try', 'catch',
  'throws', 'throw', 'instanceof', 'switch', 'case', 'break',
  'continue', 'default', 'package', 'ArrayList', 'Arrays'
];

function renderCode(codeString) {
  if (!codeString) return '';
  let html = escapeHtml(codeString);
  // Comments (single-line)
  html = html.replace(/(\/\/[^\n]*)/g, '<span class="kw-comment">$1</span>');
  // Strings
  html = html.replace(/(&quot;[^&]*&quot;)/g, '<span class="kw-string">$1</span>');
  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="kw-number">$1</span>');
  // Keywords
  JAVA_KEYWORDS.forEach(kw => {
    const re = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(re, '<span class="kw-keyword">$1</span>');
  });
  return `<pre class="code-block"><code class="java-code">${html}</code></pre>`;
}

// ─── AP Score Estimation ────────────────────────────────────────────────────
function estimateAPScore(mcqCorrect, frqTotal) {
  // mcqCorrect: out of 42, frqTotal: out of 28
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
  const darkBtn = document.getElementById('darkModeBtn');
  if (darkBtn) darkBtn.addEventListener('click', toggleDarkMode);

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Highlight current page in nav
  const currentPage = getCurrentPage();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
});

// ─── Public API ──────────────────────────────────────────────────────────────
window.App = {
  loadState, saveState, getState, updateState, resetState,
  recordAnswer, getQuestionStatus, getUnitStats, getOverallStats,
  getAllQuestions,
  saveTestResult, getTestHistory, getLastTestScore,
  initDarkMode, toggleDarkMode, applyTheme,
  navigateTo, getCurrentPage, getUrlParam,
  formatDate, formatPercent, shuffle, clamp, debounce, escapeHtml,
  renderCode, estimateAPScore
};
