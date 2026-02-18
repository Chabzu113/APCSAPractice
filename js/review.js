// AP CS A Post-Test Review Page

let _testResult = null;
let _allQuestions = [];
let _testDef = null;
let _currentFilter = 'all';
let _frqGrades = {};

function initReview() {
  // Load last test result
  try {
    const raw = localStorage.getItem('apcsa_last_result');
    if (raw) _testResult = JSON.parse(raw);
  } catch(e) {}

  if (!_testResult) {
    document.getElementById('reviewSummary').innerHTML =
      '<p class="text-muted">No test result found. <a href="index.html">Return to dashboard</a></p>';
    return;
  }

  _allQuestions = App.getAllQuestions();
  const tests = typeof PRACTICE_TESTS !== 'undefined' ? PRACTICE_TESTS : [];
  _testDef = tests.find(t => t.id === _testResult.testId) || null;

  // Initial FRQ grades from result
  _frqGrades = { ...(_testResult.frqSelfGrades || {}) };

  renderSummary();
  renderMCQReview();
  renderFRQReview();
  updateTabCounts();
  wireTabButtons();
}

function renderSummary() {
  const el = document.getElementById('reviewSummary');
  if (!el) return;
  const mcqCorrect = _testResult.mcqCorrect || 0;
  const mcqTotal = _testResult.mcqTotal || 42;
  const frqTotal = Object.values(_frqGrades).reduce((s, v) => s + (v || 0), 0);
  const apScore = App.estimateAPScore(mcqCorrect, frqTotal);
  const apColors = { 1: '#EF4444', 2: '#F97316', 3: '#EAB308', 4: '#22C55E', 5: '#3B82F6' };
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap">
      <div style="text-align:center;min-width:120px">
        <div style="font-size:3rem;font-weight:800;color:${apColors[apScore]}">${apScore}</div>
        <div style="color:var(--text-muted)">Estimated AP Score</div>
      </div>
      <div style="flex:1;min-width:200px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span>MCQ Score</span><strong>${mcqCorrect} / ${mcqTotal} (${Math.round(mcqCorrect/mcqTotal*100)}%)</strong>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span>FRQ Score (self-graded)</span><strong id="frqTotalSummary">${frqTotal} / 28</strong>
        </div>
      </div>
    </div>`;
}

function renderMCQReview() {
  const container = document.getElementById('mcqReviewList');
  if (!container) return;
  const mcqIds = _testResult.mcqIds || (_testDef ? _testDef.mcqIds : []);
  const mcqAnswers = _testResult.mcqAnswers || {};
  const flagged = new Set(_testResult.flagged || []);
  const questions = mcqIds.map(id => _allQuestions.find(q => q.id === id)).filter(Boolean);
  container.innerHTML = questions.map((q, i) => renderMCQCard(q, mcqAnswers[q.id], flagged.has(q.id), i)).join('');
}

function renderMCQCard(q, studentAnswer, isFlagged, index) {
  const isAnswered = studentAnswer !== undefined && studentAnswer !== null;
  const isCorrect = isAnswered && studentAnswer === q.answer;
  const statusClass = !isAnswered ? 'unseen' : isCorrect ? 'correct' : 'incorrect';
  const statusLabel = !isAnswered ? 'Skipped' : isCorrect ? '✓ Correct' : '✗ Incorrect';
  const choicesHtml = (q.choices || []).map((c, ci) => {
    let cls = 'choice-item';
    if (ci === q.answer) cls += ' correct';
    else if (ci === studentAnswer && !isCorrect) cls += ' incorrect';
    return `<div class="${cls}">
      <span class="choice-label">${String.fromCharCode(65+ci)})</span>
      <span>${App.escapeHtml(String(c))}</span>
      ${ci === q.answer ? '<span style="margin-left:auto;color:var(--accent-green)">✓</span>' : ''}
      ${ci === studentAnswer && !isCorrect ? '<span style="margin-left:auto;color:var(--accent-red)">✗</span>' : ''}
    </div>`;
  }).join('');
  return `
    <div class="question-card card review-card" data-status="${statusClass}" data-flagged="${isFlagged}">
      <div class="question-card-header">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="badge badge-unit">Unit ${q.unit}</span>
          <span class="badge badge-${q.difficulty}">${q.difficulty}</span>
          <span class="badge badge-mcq">MCQ</span>
          ${isFlagged ? '<span class="badge" style="background:#FEF3C7;color:#92400E">⚑ Flagged</span>' : ''}
        </div>
        <span class="badge badge-${statusClass}">${statusLabel}</span>
      </div>
      <div class="question-text">
        <strong>Q${index+1}.</strong> ${App.escapeHtml(q.question)}
        ${q.isCode ? App.renderCode(q.code) : ''}
      </div>
      <div class="choices-list">${choicesHtml}</div>
      <div class="answer-feedback" style="margin-top:12px;padding:12px;background:var(--bg-secondary);border-radius:8px">
        <p class="explanation-text"><strong>Explanation:</strong> ${App.escapeHtml(q.explanation || '')}</p>
      </div>
    </div>`;
}

function renderFRQReview() {
  const container = document.getElementById('frqReviewList');
  if (!container) return;
  const frqIds = _testResult.frqIds || (_testDef ? _testDef.frqIds : []);
  const frqAnswers = _testResult.frqAnswers || {};
  const frqs = frqIds.map(id => _allQuestions.find(q => q.id === id) ||
    (typeof FRQ_BANK !== 'undefined' ? FRQ_BANK.find(f => f.id === id) : null)).filter(Boolean);

  Scoring.renderFrqGrading('frqReviewList', frqs, frqAnswers, (grades) => {
    _frqGrades = grades;
    saveFRQGrades(grades);
  });
}

function saveFRQGrades(grades) {
  if (!_testResult) return;
  const frqTotal = Object.values(grades).reduce((s, v) => s + (v || 0), 0);
  _testResult.frqSelfGrades = grades;
  _testResult.frqTotal = frqTotal;
  _testResult.estimatedScore = App.estimateAPScore(_testResult.mcqCorrect || 0, frqTotal);
  try { localStorage.setItem('apcsa_last_result', JSON.stringify(_testResult)); } catch(e) {}
  // Update displayed FRQ total
  const el = document.getElementById('frqTotalSummary');
  if (el) el.textContent = `${frqTotal} / 28`;
  // Update in test history
  App.saveTestResult(_testResult);
}

function updateTabCounts() {
  const cards = document.querySelectorAll('.review-card');
  let correct = 0, incorrect = 0, flagged = 0;
  cards.forEach(c => {
    const s = c.dataset.status;
    if (s === 'correct') correct++;
    if (s === 'incorrect') incorrect++;
    if (c.dataset.flagged === 'true') flagged++;
  });
  const tabs = document.querySelectorAll('.tab[data-filter]');
  tabs.forEach(tab => {
    const f = tab.dataset.filter;
    if (f === 'all') tab.textContent = `All (${cards.length})`;
    if (f === 'correct') tab.textContent = `Correct (${correct})`;
    if (f === 'incorrect') tab.textContent = `Incorrect (${incorrect})`;
    if (f === 'flagged') tab.textContent = `Flagged (${flagged})`;
  });
}

function filterReview(filter) {
  _currentFilter = filter;
  document.querySelectorAll('.tab[data-filter]').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  document.querySelectorAll('.review-card').forEach(card => {
    let show = true;
    if (filter === 'correct') show = card.dataset.status === 'correct';
    else if (filter === 'incorrect') show = card.dataset.status === 'incorrect';
    else if (filter === 'flagged') show = card.dataset.flagged === 'true';
    card.style.display = show ? '' : 'none';
  });
}

function wireTabButtons() {
  document.querySelectorAll('.tab[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => filterReview(tab.dataset.filter));
  });
}

document.addEventListener('DOMContentLoaded', initReview);
