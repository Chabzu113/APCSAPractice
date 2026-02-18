// AP CS A Scoring & Analytics

const UNIT_TITLES = {
  1: 'Using Objects and Methods',
  2: 'Selection and Iteration',
  3: 'Class Creation',
  4: 'Data Collections'
};

// ─── Score Calculation ───────────────────────────────────────────────────────
function calculateTestScore(testResult, questions) {
  const { mcqAnswers = {}, frqSelfGrades = {}, flagged = [] } = testResult;

  const mcqQuestions = questions.filter(q => q.type === 'MCQ');
  let mcqCorrect = 0;
  const mcqByUnit = {};
  const mcqByDifficulty = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };

  mcqQuestions.forEach(q => {
    const isCorrect = mcqAnswers[q.id] === q.answer;
    if (isCorrect) mcqCorrect++;

    const unit = q.unit;
    if (!mcqByUnit[unit]) mcqByUnit[unit] = { correct: 0, total: 0 };
    mcqByUnit[unit].total++;
    if (isCorrect) mcqByUnit[unit].correct++;

    const diff = q.difficulty || 'medium';
    if (mcqByDifficulty[diff]) {
      mcqByDifficulty[diff].total++;
      if (isCorrect) mcqByDifficulty[diff].correct++;
    }
  });

  const frqTotal = Object.values(frqSelfGrades).reduce((sum, pts) => sum + (pts || 0), 0);
  const apScore = App.estimateAPScore(mcqCorrect, frqTotal);

  return {
    mcqCorrect,
    mcqTotal: mcqQuestions.length,
    mcqByUnit,
    mcqByDifficulty,
    frqTotal,
    frqMax: 28,
    apScore,
    flagged
  };
}

function calculateUnitBreakdown(questionHistory, allQuestions) {
  return [1, 2, 3, 4].map(unit => {
    const unitQ = allQuestions.filter(q => q.unit === unit);
    let seen = 0, correct = 0;
    unitQ.forEach(q => {
      const h = questionHistory[q.id];
      if (h && h.seen) { seen++; if (h.correct) correct++; }
    });
    const accuracy = seen > 0 ? Math.round((correct / seen) * 100) : 0;
    let masteryLevel = 'not-started';
    if (seen > 0) {
      if (accuracy >= 80) masteryLevel = 'mastered';
      else if (accuracy >= 60) masteryLevel = 'practicing';
      else masteryLevel = 'learning';
    }
    return { unit, unitTitle: UNIT_TITLES[unit], total: unitQ.length, seen, correct, accuracy, masteryLevel };
  });
}

function calculateDifficultyBreakdown(questionHistory, allQuestions) {
  const result = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };
  allQuestions.forEach(q => {
    const diff = q.difficulty || 'medium';
    if (!result[diff]) return;
    const h = questionHistory[q.id];
    if (h && h.seen) {
      result[diff].total++;
      if (h.correct) result[diff].correct++;
    }
  });
  return result;
}

function getWeakestTopics(questionHistory, allQuestions, limit = 5) {
  const topicMap = {};
  allQuestions.forEach(q => {
    const key = q.topic || 'unknown';
    if (!topicMap[key]) topicMap[key] = { topic: key, topicLabel: q.topicLabel || key, unit: q.unit, correct: 0, total: 0 };
    const h = questionHistory[q.id];
    if (h && h.seen) {
      topicMap[key].total++;
      if (h.correct) topicMap[key].correct++;
    }
  });
  return Object.values(topicMap)
    .filter(t => t.total >= 2)
    .map(t => ({ ...t, accuracy: Math.round((t.correct / t.total) * 100) }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}

// ─── Results Rendering ───────────────────────────────────────────────────────
function renderScoreSummary(containerId, testResult) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { mcqCorrect, mcqTotal, frqTotal, frqMax, apScore } = testResult;
  const mcqPct = mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;
  const apColors = { 1: '#EF4444', 2: '#F97316', 3: '#EAB308', 4: '#22C55E', 5: '#3B82F6' };
  el.innerHTML = `
    <div class="score-summary-grid">
      <div class="score-big" style="border-color:${apColors[apScore] || '#3B82F6'}">
        <div class="score-number" style="color:${apColors[apScore]}">${apScore}</div>
        <div class="score-label">Estimated AP Score</div>
      </div>
      <div class="score-details">
        <div class="score-row">
          <span>MCQ Score</span>
          <strong>${mcqCorrect} / ${mcqTotal} (${mcqPct}%)</strong>
        </div>
        <div class="score-row">
          <span>FRQ Score (self-graded)</span>
          <strong>${frqTotal} / ${frqMax}</strong>
        </div>
      </div>
    </div>`;
}

function renderUnitBreakdown(containerId, breakdown) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const colors = { 1: '#3B82F6', 2: '#10B981', 3: '#8B5CF6', 4: '#F59E0B' };
  el.innerHTML = breakdown.map(u => `
    <div class="unit-breakdown-row">
      <div class="unit-breakdown-label">
        <span>Unit ${u.unit}: ${u.unitTitle}</span>
        <span class="badge badge-${u.masteryLevel === 'mastered' ? 'correct' : u.masteryLevel === 'not-started' ? 'unseen' : 'medium'}">${u.masteryLevel}</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width:${u.accuracy}%;background:${colors[u.unit]}"></div>
      </div>
      <div class="unit-breakdown-stats">
        <span>${u.correct}/${u.seen} correct</span>
        <span>${u.accuracy}%</span>
      </div>
    </div>`).join('');
}

function renderDifficultyBreakdown(containerId, breakdown) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const labels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  const colors = { easy: '#22C55E', medium: '#EAB308', hard: '#EF4444' };
  el.innerHTML = Object.entries(breakdown).map(([diff, data]) => {
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    return `
      <div class="diff-breakdown-row">
        <span class="badge badge-${diff}" style="min-width:80px">${labels[diff]}</span>
        <div class="progress-bar-container" style="flex:1;margin:0 16px">
          <div class="progress-bar-fill" style="width:${pct}%;background:${colors[diff]}"></div>
        </div>
        <span style="min-width:120px;text-align:right">${data.correct}/${data.total} (${pct}%)</span>
      </div>`;
  }).join('');
}

function renderWeakTopics(containerId, topics) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (topics.length === 0) {
    el.innerHTML = '<p class="text-muted">Answer more questions to see your weak areas.</p>';
    return;
  }
  el.innerHTML = topics.map(t => `
    <div class="weak-topic-row">
      <div>
        <span class="badge badge-unit" style="margin-right:8px">Unit ${t.unit}</span>
        <strong>${t.topicLabel}</strong>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <span style="color:var(--accent-red)">${t.accuracy}% accuracy (${t.correct}/${t.total})</span>
        <a href="question-bank.html?unit=${t.unit}&topic=${t.topic}" class="btn btn-sm btn-secondary">Practice →</a>
      </div>
    </div>`).join('');
}

function renderTestHistory(containerId, history) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!history || history.length === 0) {
    el.innerHTML = '<p class="text-muted">No tests taken yet. <a href="practice-test.html">Take a practice test →</a></p>';
    return;
  }
  el.innerHTML = `
    <table class="history-table">
      <thead><tr><th>Date</th><th>Test</th><th>MCQ</th><th>FRQ</th><th>AP Score</th><th></th></tr></thead>
      <tbody>${history.map(h => `
        <tr>
          <td>${App.formatDate(h.date)}</td>
          <td>${h.testTitle || h.testId}</td>
          <td>${h.mcqScore}/${h.mcqTotal || 42}</td>
          <td>${h.frqTotal || '—'}/${h.frqMax || 28}</td>
          <td><span class="badge badge-unit">AP ${h.estimatedScore}</span></td>
          <td><a href="review.html?testId=${h.testId}" class="btn btn-sm btn-secondary">Review</a></td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

// ─── FRQ Self-Grading ────────────────────────────────────────────────────────
function renderFrqGrading(containerId, frqQuestions, frqAnswers, onGradeChange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const grades = {};
  el.innerHTML = frqQuestions.map((frq, idx) => {
    grades[frq.id] = 0;
    const studentAnswer = frqAnswers[frq.id] || {};
    const rubricHtml = (frq.rubric || []).map((point, pi) => `
      <div class="rubric-row" data-frq="${frq.id}" data-point="${pi}">
        <div class="rubric-desc">${point.description} <em>(${point.points} pt)</em></div>
        <div class="rubric-controls">
          <button class="btn btn-sm btn-secondary rubric-btn" data-frq="${frq.id}" data-val="0" data-pi="${pi}">✗ 0</button>
          <button class="btn btn-sm btn-success rubric-btn" data-frq="${frq.id}" data-val="${point.points}" data-pi="${pi}">✓ +${point.points}</button>
        </div>
      </div>`).join('');
    const partsHtml = (frq.parts || []).map(part => {
      const ans = studentAnswer[part.label] || '(no answer)';
      return `<div class="frq-part-review">
        <strong>Part (${part.label}):</strong>
        <pre class="code-block"><code>${escapeHtml(ans)}</code></pre>
      </div>`;
    }).join('');
    return `
      <div class="frq-grade-card card" id="frqGradeCard_${frq.id}">
        <div class="frq-grade-header">
          <h3>${idx + 1}. ${frq.title}</h3>
          <span class="badge badge-frq">${frq.type}</span>
        </div>
        <div class="frq-student-answer">${partsHtml}</div>
        <div class="frq-rubric">
          <h4>Scoring Rubric</h4>
          ${rubricHtml}
          <div class="frq-total">Total: <strong id="frqTotal_${frq.id}">0</strong> / 7 pts</div>
        </div>
      </div>`;
  }).join('');

  // Wire up rubric buttons
  el.querySelectorAll('.rubric-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const frqId = btn.dataset.frq;
      const val = parseFloat(btn.dataset.val);
      const pi = btn.dataset.pi;
      // Store grade per rubric point
      if (!grades[frqId]) grades[frqId] = 0;
      // Toggle
      const key = `${frqId}_${pi}`;
      const current = el.dataset[key] || '0';
      const newVal = current === String(val) ? 0 : val;
      el.dataset[key] = String(newVal);
      // Recalculate total for this FRQ
      let total = 0;
      (frqQuestions.find(f => f.id === frqId)?.rubric || []).forEach((_, i) => {
        total += parseFloat(el.dataset[`${frqId}_${i}`] || 0);
      });
      grades[frqId] = total;
      const totalEl = document.getElementById(`frqTotal_${frqId}`);
      if (totalEl) totalEl.textContent = total;
      if (onGradeChange) onGradeChange({ ...grades });
    });
  });
}

// ─── Exports ─────────────────────────────────────────────────────────────────
window.Scoring = {
  calculateTestScore, calculateUnitBreakdown, calculateDifficultyBreakdown,
  getWeakestTopics, renderScoreSummary, renderUnitBreakdown,
  renderDifficultyBreakdown, renderWeakTopics, renderTestHistory,
  renderFrqGrading, UNIT_TITLES
};
