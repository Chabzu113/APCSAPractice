// AP CS A Results / Analytics Page

function initResults() {
  const state = App.getState();
  const allQ = App.getAllQuestions();

  renderOverallStats(state, allQ);
  renderUnitMastery(state.questionHistory || {}, allQ);
  renderDifficultyBreakdown(state.questionHistory || {}, allQ);
  renderWeakTopics(state.questionHistory || {}, allQ);
  renderTestHistory(state.testHistory || []);

  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset ALL progress? This cannot be undone.')) {
        App.resetState();
        location.reload();
      }
    });
  }
}

function renderOverallStats(state, allQ) {
  const el = document.getElementById('overallStats');
  if (!el) return;
  const stats = App.getOverallStats();
  const lastTest = App.getLastTestScore();
  const apDisplay = lastTest ? `AP ${lastTest.estimatedScore}` : '—';
  el.innerHTML = `
    <div class="stat-card card"><div class="stat-num">${stats.totalAnswered}</div><div class="stat-lbl">Questions Answered</div></div>
    <div class="stat-card card"><div class="stat-num">${stats.accuracy}%</div><div class="stat-lbl">Accuracy</div></div>
    <div class="stat-card card"><div class="stat-num">${stats.testsTaken}</div><div class="stat-lbl">Tests Taken</div></div>
    <div class="stat-card card"><div class="stat-num">${apDisplay}</div><div class="stat-lbl">Last AP Estimate</div></div>`;
}

function renderUnitMastery(questionHistory, allQ) {
  const el = document.getElementById('unitMastery');
  if (!el) return;
  const breakdown = Scoring.calculateUnitBreakdown(questionHistory, allQ);
  Scoring.renderUnitBreakdown('unitMastery', breakdown);
}

function renderDifficultyBreakdown(questionHistory, allQ) {
  const breakdown = Scoring.calculateDifficultyBreakdown(questionHistory, allQ);
  Scoring.renderDifficultyBreakdown('difficultyBreakdown', breakdown);
}

function renderWeakTopics(questionHistory, allQ) {
  const topics = Scoring.getWeakestTopics(questionHistory, allQ, 5);
  Scoring.renderWeakTopics('weakTopics', topics);
}

function renderTestHistory(history) {
  Scoring.renderTestHistory('testHistory', history);
}

document.addEventListener('DOMContentLoaded', initResults);
