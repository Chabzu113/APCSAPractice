// AP CS A Practice Test Runner

// ─── State ────────────────────────────────────────────────────────────────────
let currentTest = null;
let currentSection = 'intro';
let currentQuestion = 0;
let mcqAnswers = {};
let frqAnswers = {};
let flagged = new Set();
let timer = null;
let timeRemaining = 5400;
let autoSaveInterval = null;
let mcqQuestions = [];
let frqQuestions = [];

// ─── Init ─────────────────────────────────────────────────────────────────────
function initTestRunner() {
  const testId = App.getUrlParam('testId') || 'test_1';
  const tests = typeof PRACTICE_TESTS !== 'undefined' ? PRACTICE_TESTS : [];
  currentTest = tests.find(t => t.id === testId);

  if (!currentTest) {
    document.getElementById('introScreen').innerHTML =
      `<div style="text-align:center;padding:60px"><h2>Test not found</h2><a href="index.html" class="btn btn-primary" style="margin-top:16px">Back to Dashboard</a></div>`;
    showScreen('introScreen');
    return;
  }

  const allMCQ = [
    ...(typeof MCQ_U1U2 !== 'undefined' ? MCQ_U1U2 : []),
    ...(typeof MCQ_U3U4 !== 'undefined' ? MCQ_U3U4 : [])
  ];
  const frqBank = typeof FRQ_BANK !== 'undefined' ? FRQ_BANK : [];

  mcqQuestions = (currentTest.mcqIds || []).map(id => allMCQ.find(q => q.id === id)).filter(Boolean);
  frqQuestions = (currentTest.frqIds || []).map(id => frqBank.find(f => f.id === id)).filter(Boolean);

  try {
    const saved = localStorage.getItem('apcsa_active_test');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.testId === testId && confirm('Resume your in-progress test?')) {
        mcqAnswers = data.mcqAnswers || {};
        frqAnswers = data.frqAnswers || {};
        flagged = new Set(data.flagged || []);
        timeRemaining = data.timeRemaining || 5400;
        if (data.section === 'mcq') { startSection('mcq'); return; }
        if (data.section === 'frq') { startSection('frq'); return; }
      } else {
        localStorage.removeItem('apcsa_active_test');
      }
    }
  } catch(e) {}

  renderIntroScreen();
  showScreen('introScreen');
  wireButtons();
}

function showScreen(screenId) {
  ['introScreen','mcqScreen','breakScreen','frqScreen','doneScreen'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== screenId);
  });
}

function renderIntroScreen() {
  const el = document.getElementById('introScreen');
  if (!el || !currentTest) return;
  el.innerHTML = `
    <div style="max-width:600px;margin:60px auto;padding:0 20px;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:16px">📝</div>
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:8px">${currentTest.title}</h1>
      <p style="color:var(--text-muted);margin-bottom:32px">${currentTest.description}</p>
      <div class="card" style="text-align:left;margin-bottom:28px">
        <div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border-color)">
          <span><strong>Section I</strong> — Multiple Choice</span>
          <span style="color:var(--text-muted)">${mcqQuestions.length} questions · 90 min</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border-color)">
          <span><strong>Section II</strong> — Free Response</span>
          <span style="color:var(--text-muted)">${frqQuestions.length} questions · 90 min</span>
        </div>
        <div style="padding:14px 0;color:var(--text-muted);font-size:0.9rem;line-height:1.8">
          No feedback during the test · Flag questions to revisit · FRQs self-graded after · Progress auto-saved
        </div>
      </div>
      <button class="btn btn-primary btn-lg" id="startTestBtn">Start Test →</button>
      <br><a href="index.html" style="display:inline-block;margin-top:16px;color:var(--text-muted);font-size:0.9rem">← Back</a>
    </div>`;
}

function wireButtons() {
  document.addEventListener('click', e => {
    if (e.target.id === 'startTestBtn') startSection('mcq');
    if (e.target.id === 'startFRQBtn') startSection('frq');
    if (e.target.id === 'submitSectionBtn') {
      if (currentSection === 'mcq') confirmSubmit('mcq');
      else if (currentSection === 'frq') confirmSubmit('frq');
    }
    if (e.target.id === 'confirmSubmit') { hideModal(); currentSection === 'mcq' ? finishMCQ() : finishFRQ(); }
    if (e.target.id === 'cancelSubmit') hideModal();
    if (e.target.id === 'prevMCQ') goPrevMCQ();
    if (e.target.id === 'nextMCQ') goNextMCQ();
    if (e.target.id === 'prevFRQ') goPrevFRQ();
    if (e.target.id === 'nextFRQ') goNextFRQ();
  });
}

// ─── Section Start ────────────────────────────────────────────────────────────
function startSection(section) {
  currentSection = section;
  currentQuestion = 0;
  stopTimer();

  if (section === 'mcq') {
    showScreen('mcqScreen');
    updateTimerDisplay();
    startTimer();
    renderMCQQuestion(0);
    renderQuestionNav();
    autoSaveInterval = setInterval(saveActiveTest, 30000);
  } else if (section === 'break') {
    showScreen('breakScreen');
    renderBreakScreen();
  } else if (section === 'frq') {
    timeRemaining = 5400;
    showScreen('frqScreen');
    updateTimerDisplay();
    startTimer();
    renderFRQQuestion(0);
    renderFRQNav();
    autoSaveInterval = setInterval(saveActiveTest, 30000);
  }
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function startTimer() {
  stopTimer();
  timer = setInterval(() => {
    timeRemaining = Math.max(0, timeRemaining - 1);
    updateTimerDisplay();
    if (timeRemaining === 0) { stopTimer(); currentSection === 'mcq' ? finishMCQ() : finishFRQ(); }
  }, 1000);
}

function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  if (!el) return;
  const h = Math.floor(timeRemaining / 3600);
  const m = Math.floor((timeRemaining % 3600) / 60);
  const s = timeRemaining % 60;
  el.textContent = `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.className = 'timer';
  if (timeRemaining <= 600) el.classList.add('warning');
  if (timeRemaining <= 60) el.classList.add('danger');
}

// ─── MCQ ──────────────────────────────────────────────────────────────────────
function renderMCQQuestion(index) {
  currentQuestion = index;
  const q = mcqQuestions[index];
  if (!q) return;

  const answered = Object.values(mcqAnswers).filter(v => v !== undefined).length;
  const pct = Math.round((answered / mcqQuestions.length) * 100);
  const fillEl = document.getElementById('mcqProgressFill');
  if (fillEl) fillEl.style.width = pct + '%';

  const numEl = document.getElementById('mcqQuestionNum');
  if (numEl) numEl.textContent = `Question ${index + 1} of ${mcqQuestions.length}`;

  const flagBtn = document.getElementById('flagBtn');
  if (flagBtn) {
    const isFlagged = flagged.has(q.id);
    flagBtn.textContent = isFlagged ? '⚑ Flagged' : '⚑ Flag';
    flagBtn.className = 'flag-btn' + (isFlagged ? ' flagged' : '');
    flagBtn.onclick = () => { isFlagged ? flagged.delete(q.id) : flagged.add(q.id); renderMCQQuestion(index); };
  }

  const content = document.getElementById('mcqQuestionContent');
  if (!content) return;
  const sel = mcqAnswers[q.id];
  content.innerHTML = `
    <div class="question-text">${App.escapeHtml(q.question)}</div>
    ${q.isCode && q.code ? App.renderCode(q.code) : ''}
    <div class="choices-list">
      ${(q.choices || []).map((c, ci) => `
        <div class="choice-item${sel === ci ? ' selected' : ''}" onclick="selectAnswer('${q.id}',${ci},${index})">
          <span class="choice-label">${String.fromCharCode(65+ci)})</span>
          <span>${App.escapeHtml(String(c))}</span>
        </div>`).join('')}
    </div>`;

  const prevBtn = document.getElementById('prevMCQ');
  const nextBtn = document.getElementById('nextMCQ');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.textContent = index === mcqQuestions.length - 1 ? 'Submit Section' : 'Next →';
  renderQuestionNav();
}

function selectAnswer(questionId, choiceIndex, qIndex) {
  mcqAnswers[questionId] = choiceIndex;
  renderMCQQuestion(qIndex);
}

function renderQuestionNav() {
  const grid = document.getElementById('navGrid');
  if (!grid) return;
  grid.innerHTML = mcqQuestions.map((q, i) => {
    let cls = 'q-num';
    if (mcqAnswers[q.id] !== undefined) cls += ' answered';
    if (flagged.has(q.id)) cls += ' flagged';
    if (i === currentQuestion && currentSection === 'mcq') cls += ' current';
    return `<button class="${cls}" onclick="renderMCQQuestion(${i})">${i+1}</button>`;
  }).join('');
}

function goNextMCQ() {
  if (currentQuestion < mcqQuestions.length - 1) renderMCQQuestion(currentQuestion + 1);
  else confirmSubmit('mcq');
}
function goPrevMCQ() { if (currentQuestion > 0) renderMCQQuestion(currentQuestion - 1); }

function finishMCQ() {
  stopTimer(); clearInterval(autoSaveInterval);
  localStorage.removeItem('apcsa_active_test');
  renderBreakScreen(); showScreen('breakScreen');
}

// ─── Break ────────────────────────────────────────────────────────────────────
function renderBreakScreen() {
  const el = document.getElementById('breakScreen');
  if (!el) return;
  const answered = Object.keys(mcqAnswers).length;
  el.innerHTML = `
    <div style="max-width:520px;margin:80px auto;text-align:center;padding:0 20px">
      <div style="font-size:2.5rem;margin-bottom:16px">✅</div>
      <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:8px">Section I Complete!</h2>
      <p style="color:var(--text-muted);margin-bottom:8px">You answered ${answered} of ${mcqQuestions.length} MCQ questions.</p>
      <p style="color:var(--text-muted);margin-bottom:32px">Take a short break, then start Section II.</p>
      <button class="btn btn-primary btn-lg" id="startFRQBtn">Start Section II →</button>
    </div>`;
}

// ─── FRQ ──────────────────────────────────────────────────────────────────────
function renderFRQQuestion(index) {
  currentQuestion = index;
  const frq = frqQuestions[index];
  if (!frq) return;

  const numEl = document.getElementById('frqQuestionNum');
  if (numEl) numEl.textContent = `FRQ ${index + 1} of ${frqQuestions.length}`;

  const flagBtn = document.getElementById('frqFlagBtn');
  if (flagBtn) {
    const isFlagged = flagged.has(frq.id);
    flagBtn.textContent = isFlagged ? '⚑ Flagged' : '⚑ Flag';
    flagBtn.className = 'flag-btn' + (isFlagged ? ' flagged' : '');
    flagBtn.onclick = () => { isFlagged ? flagged.delete(frq.id) : flagged.add(frq.id); renderFRQQuestion(index); };
  }

  if (!frqAnswers[frq.id]) frqAnswers[frq.id] = {};
  const saved = frqAnswers[frq.id];

  const content = document.getElementById('frqQuestionContent');
  if (!content) return;
  content.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <span class="badge badge-frq">${frq.type}</span>
        <span class="badge badge-unit">${frq.source || 'Original'}</span>
      </div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:12px">${frq.title}</h3>
      <div style="white-space:pre-wrap;line-height:1.7;color:var(--text-primary);margin-bottom:16px">${App.escapeHtml(frq.prompt || '')}</div>
      ${frq.starterCode ? `<p style="font-weight:600;margin-bottom:6px">Given code:</p>${App.renderCode(frq.starterCode)}` : ''}
    </div>
    ${(frq.parts || []).map(p => `
      <div class="frq-part">
        <div class="frq-part-label">Part (${p.label}) <span class="frq-points">· ${p.points} pt${p.points!==1?'s':''}</span></div>
        <div class="frq-part-instruction">${App.escapeHtml(p.instruction)}</div>
        <textarea class="frq-textarea" placeholder="Write your Java code here..."
          onchange="saveFRQInput('${frq.id}','${p.label}',this.value)"
          oninput="saveFRQInput('${frq.id}','${p.label}',this.value)">${App.escapeHtml(saved[p.label] || '')}</textarea>
      </div>`).join('')}`;

  const prevBtn = document.getElementById('prevFRQ');
  const nextBtn = document.getElementById('nextFRQ');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.textContent = index === frqQuestions.length - 1 ? 'Submit Test' : 'Next →';
  renderFRQNav();
}

function saveFRQInput(frqId, part, text) {
  if (!frqAnswers[frqId]) frqAnswers[frqId] = {};
  frqAnswers[frqId][part] = text;
}

function renderFRQNav() {
  const grid = document.getElementById('frqNavGrid');
  if (!grid) return;
  grid.innerHTML = frqQuestions.map((f, i) => {
    const hasAny = frqAnswers[f.id] && Object.values(frqAnswers[f.id]).some(v => v && v.trim());
    let cls = 'q-num';
    if (hasAny) cls += ' answered';
    if (flagged.has(f.id)) cls += ' flagged';
    if (i === currentQuestion) cls += ' current';
    return `<button class="${cls}" onclick="renderFRQQuestion(${i})">FRQ ${i+1}</button>`;
  }).join('');
}

function goNextFRQ() { if (currentQuestion < frqQuestions.length - 1) renderFRQQuestion(currentQuestion + 1); else confirmSubmit('frq'); }
function goPrevFRQ() { if (currentQuestion > 0) renderFRQQuestion(currentQuestion - 1); }

function finishFRQ() {
  stopTimer(); clearInterval(autoSaveInterval);
  mcqQuestions.forEach(q => { if (mcqAnswers[q.id] !== undefined) App.recordAnswer(q.id, mcqAnswers[q.id] === q.answer); });
  const mcqCorrect = mcqQuestions.filter(q => mcqAnswers[q.id] === q.answer).length;
  const result = {
    testId: currentTest.id, testTitle: currentTest.title, date: Date.now(),
    mcqIds: currentTest.mcqIds, frqIds: currentTest.frqIds,
    mcqAnswers, frqAnswers, flagged: [...flagged],
    mcqCorrect, mcqTotal: mcqQuestions.length,
    frqSelfGrades: {}, frqTotal: 0, frqMax: 28,
    estimatedScore: App.estimateAPScore(mcqCorrect, 0)
  };
  App.saveTestResult(result);
  localStorage.removeItem('apcsa_active_test');
  showScreen('doneScreen');
  document.getElementById('doneScreen').innerHTML = `
    <div style="max-width:480px;margin:100px auto;text-align:center;padding:0 20px">
      <div style="font-size:3rem;margin-bottom:16px">🎉</div>
      <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:8px">Test Complete!</h2>
      <p style="color:var(--text-muted);margin-bottom:8px">MCQ: ${mcqCorrect}/${mcqQuestions.length} answered correctly</p>
      <p style="color:var(--text-muted);margin-bottom:32px">Grade your FRQs to get your estimated AP score.</p>
      <a href="review.html" class="btn btn-primary btn-lg">Review & Grade FRQs →</a>
    </div>`;
}

// ─── Auto Save ────────────────────────────────────────────────────────────────
function saveActiveTest() {
  try {
    localStorage.setItem('apcsa_active_test', JSON.stringify({
      testId: currentTest?.id, section: currentSection,
      mcqAnswers, frqAnswers, flagged: [...flagged], timeRemaining
    }));
  } catch(e) {}
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function confirmSubmit(section) {
  const unanswered = section === 'mcq'
    ? mcqQuestions.length - Object.keys(mcqAnswers).filter(id => mcqAnswers[id] !== undefined).length
    : 0;
  const msg = section === 'mcq'
    ? `You answered ${mcqQuestions.length - unanswered}/${mcqQuestions.length} questions.${unanswered > 0 ? ` <strong>${unanswered} unanswered.</strong>` : ''}`
    : 'This will end the test. You can review and self-grade FRQs after.';
  showModal(section === 'mcq' ? 'Submit Section I?' : 'Submit Test?', msg);
}

function showModal(title, body) {
  const m = document.getElementById('submitModal');
  const t = document.getElementById('submitModalTitle');
  const b = document.getElementById('submitModalBody');
  if (t) t.textContent = title;
  if (b) b.innerHTML = body;
  if (m) m.classList.remove('hidden');
}
function hideModal() { const m = document.getElementById('submitModal'); if (m) m.classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', initTestRunner);
