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

function calculateUnitBreakdown(questionHistory, allQuestions, subjectUnits) {
  // If subjectUnits is provided (from SubjectRegistry), use it; otherwise fall back to CS A hardcoded units
  const units = subjectUnits
    ? subjectUnits.map(u => ({ num: u.num, title: u.title }))
    : [1, 2, 3, 4].map(n => ({ num: n, title: UNIT_TITLES[n] }));

  return units.map(({ num, title }) => {
    const unitQ = allQuestions.filter(q => q.unit === num);
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
    return { unit: num, unitTitle: title, total: unitQ.length, seen, correct, accuracy, masteryLevel };
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
          <span>FRQ Score</span>
          <strong>${frqTotal} / ${frqMax}</strong>
        </div>
      </div>
    </div>`;
}

function renderUnitBreakdown(containerId, breakdown) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const colors = { 1: '#3B82F6', 2: '#10B981', 3: '#8B5CF6', 4: '#F59E0B', 5: '#EF4444', 6: '#06B6D4', 7: '#F97316', 8: '#84CC16' };
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

// ─── FRQ Grading ─────────────────────────────────────────────────────────────
function renderFrqGrading(containerId, frqQuestions, frqAnswers, onGradeChange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const grades = {};
  el.innerHTML = frqQuestions.map((frq, idx) => {
    grades[frq.id] = 0;
    const isAutoGraded = frq.autoGraded === true
      || (frq.subject && typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[frq.subject] && FRQ_CONFIGS[frq.subject].autoGradeAll);
    const studentAnswer = frqAnswers[frq.id] || {};
    const partsHtml = (frq.parts || []).map(part => {
      const ans = studentAnswer[part.label] || '(no answer)';
      return `<div class="frq-part-review">
        <strong>Part (${part.label}):</strong>
        <pre class="code-block"><code>${escapeHtml(ans)}</code></pre>
      </div>`;
    }).join('');
    const maxPts = (frq.rubric || []).reduce((s, r) => s + (r.points || 0), 0) || frq.points || 7;

    // DBQ: build document block for review
    const frqTypeLower = (frq.frqType || frq.type || '').toLowerCase();
    const reviewRawDocs = frq.documents || frq.stimulus || [];
    const reviewDocsHtml = (frqTypeLower === 'dbq' && reviewRawDocs.length > 0)
      ? `<div class="dbq-stimulus-container" style="margin:12px 0">
           <div class="dbq-stimulus-header">📄 Documents (${reviewRawDocs.length})</div>
           <div class="dbq-documents-scroll">
             ${reviewRawDocs.map(function(doc, i) {
               const num      = doc.id || doc.docNum || (i + 1);
               const source   = doc.source || doc.attribution || '';
               const text     = doc.content || doc.excerpt || '';
               const docType  = doc.docType || 'text';
               const typeIcon = {
                 data_table: '📊 Data Table', map: '🗺️ Map', diagram: '📐 Diagram',
                 political_cartoon: '🖼️ Political Cartoon', advertisement: '📰 Advertisement',
                 photo: '📷 Photograph', poster: '🪧 Poster', chart: '📈 Chart'
               }[docType] || '';
               const typeBadge  = typeIcon ? '<span class="dbq-doc-type-badge">' + typeIcon + '</span>' : '';
               const contentCls = docType !== 'text' ? ' dbq-visual-desc' : '';
               const imgUrl     = doc.imageUrl || '';
               if (imgUrl) {
                 return '<div class="dbq-document-card">' +
                   '<div class="dbq-document-source">Document ' + num + ' — ' + escapeHtml(source) + typeBadge + '</div>' +
                   '<img class="dbq-visual-image" src="' + imgUrl + '" alt="' + escapeHtml(source) + '" loading="lazy" onclick="this.classList.toggle(\'zoomed\')">' +
                   '<div class="dbq-visual-caption">' + escapeHtml(text) + '</div>' +
                   '</div>';
               }
               return '<div class="dbq-document-card">' +
                 '<div class="dbq-document-source">Document ' + num + ' — ' + escapeHtml(source) + typeBadge + '</div>' +
                 '<div class="dbq-document-content' + contentCls + '">' + escapeHtml(text) + '</div>' +
                 '</div>';
             }).join('')}
           </div>
         </div>`
      : '';

    if (isAutoGraded) {
      // Auto-graded: show analysis panel only, no manual rubric
      return `
        <div class="frq-grade-card card" id="frqGradeCard_${frq.id}">
          <div class="frq-grade-header">
            <h3>${idx + 1}. ${frq.title}</h3>
            <span class="badge badge-frq">${frq.type}</span>
          </div>
          ${reviewDocsHtml}
          <div class="frq-student-answer">${partsHtml}</div>
          <div id="apushAnalysis_${frq.id}" class="frq-analysis-placeholder"></div>
        </div>`;
    }

    // Manual rubric (non-auto-graded subjects, e.g. APCSA)
    const rubricHtml = (frq.rubric || []).map((point, pi) => `
      <div class="rubric-row" data-frq="${frq.id}" data-point="${pi}">
        <div class="rubric-desc">${point.description} <em>(${point.points} pt)</em></div>
        <div class="rubric-controls">
          <button class="btn btn-sm btn-secondary rubric-btn" data-frq="${frq.id}" data-val="0" data-pi="${pi}">✗ 0</button>
          <button class="btn btn-sm btn-success rubric-btn" data-frq="${frq.id}" data-val="${point.points}" data-pi="${pi}">✓ +${point.points}</button>
        </div>
      </div>`).join('');
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
          <div class="frq-total">Total: <strong id="frqTotal_${frq.id}">0</strong> / ${maxPts} pts</div>
        </div>
      </div>`;
  }).join('');

  // Wire up manual rubric buttons (non-auto-graded only)
  el.querySelectorAll('.rubric-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const frqId = btn.dataset.frq;
      const val = parseFloat(btn.dataset.val);
      const pi = btn.dataset.pi;
      if (!grades[frqId]) grades[frqId] = 0;
      const key = `${frqId}_${pi}`;
      const current = el.dataset[key] || '0';
      const newVal = current === String(val) ? 0 : val;
      el.dataset[key] = String(newVal);
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

  // ── Auto-Grading Panels ───────────────────────────────────────────────────
  frqQuestions.forEach(frq => {
    if (!frq.subject || typeof FRQ_CONFIGS === 'undefined' || !FRQ_CONFIGS[frq.subject]) return;
    if (typeof APUSHGrader === 'undefined') return;

    const panel = document.getElementById(`apushAnalysis_${frq.id}`);
    if (!panel) return;

    const studentAnswer = frqAnswers[frq.id] || {};
    const fullText = Object.values(studentAnswer).join('\n\n').trim();
    if (!fullText) {
      panel.innerHTML = '<p class="frq-analysis-empty">No answer submitted.</p>';
      return;
    }

    try {
      const unitNum = (frq.units && frq.units[0]) || 1;
      let result;
      if (frq.subject === 'apush' && typeof APUSHGrader !== 'undefined') {
        result = APUSHGrader.grade(studentAnswer, frq.frqType, unitNum, frq.subject || 'apush', frq);
        renderAnalysisPanel(panel, result, fullText);
      } else if (typeof GenericFRQGrader !== 'undefined') {
        const subjectCfg = (typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[frq.subject]) || {};
        result = GenericFRQGrader.grade(studentAnswer, frq.frqType, unitNum, frq, subjectCfg);
        renderAutoFRQPanel(panel, result, fullText);
      }
      // Feed automated score into grades and notify
      if (result) {
        grades[frq.id] = result.score.total;
        if (onGradeChange) onGradeChange({ ...grades });
      }
    } catch (e) {
      panel.innerHTML = '<p class="frq-analysis-empty text-muted">Analysis unavailable.</p>';
    }
  });
}

// ─── APUSH Analysis Panel Renderer ───────────────────────────────────────────
function renderAnalysisPanel(el, gradeResult, rawAnswer) {
  if (!el || !gradeResult) return;

  const bd = gradeResult.score.breakdown || {};
  const fb = gradeResult.feedback || {};
  const frqType = (gradeResult._raw && gradeResult._raw.type) || 'leq';
  const isDBQ   = frqType === 'dbq';
  const isSAQ   = frqType === 'saq';

  // Build score chip row
  function chip(label, earned, max) {
    const dots = Array.from({ length: max }, (_, i) =>
      `<span class="score-dot ${i < earned ? 'earned' : 'empty'}">●</span>`
    ).join('');
    return `<span class="analysis-chip ${earned > 0 ? 'earned' : 'missing'}">
      ${label} ${dots}
    </span>`;
  }

  let chips = '';
  if (!isSAQ) {
    chips += chip('Thesis', bd.thesis || 0, 1);
    chips += chip('Context', bd.context || 0, 1);
    if (isDBQ) {
      chips += chip('Outside Ev', bd.outsideEvidence || 0, 1); // 2026 CB: outside evidence point
      chips += chip('Doc Use', bd.docUse || 0, 2);
      chips += chip('Sourcing', bd.sourcing || 0, 1);
    } else {
      chips += chip('Evidence', bd.evidence || 0, 2);
      chips += chip('Analysis', bd.analysis || 0, 2);
    }
  } else {
    // SAQ: show per-part results
    const parts = (gradeResult._raw && gradeResult._raw.parts) || {};
    for (const [lbl, pr] of Object.entries(parts)) {
      chips += chip('Part ' + lbl.toUpperCase(), pr.earned || 0, 1);
    }
  }

  // Build highlighted answer — SAQ: split by part, LEQ/DBQ: single block
  let highlightedAnswerHtml = '';
  if (isSAQ) {
    const saqParts = (gradeResult._raw && gradeResult._raw.parts) || {};
    const rawParts = rawAnswer ? rawAnswer.split(/\n\n/) : [];
    const partLabels = Object.keys(saqParts);
    highlightedAnswerHtml = partLabels.map((lbl, idx) => {
      const partText = rawParts[idx] || '';
      const partResult = saqParts[lbl] || {};
      // Build a synthetic gradeResult scoped to this part's text/highlights
      const partHL = APUSHGrader.buildHighlightedHtml(partText, gradeResult);
      const earnedIcon = partResult.earned ? '✓' : '✗';
      const earnedCls  = partResult.earned ? 'part-earned' : 'part-missing';
      return `<div class="saq-part-block">
        <div class="saq-part-header ${earnedCls}">
          <strong>Part ${lbl.toUpperCase()}</strong>
          <span class="saq-part-score">${earnedIcon} ${partResult.earned || 0}/1</span>
        </div>
        <div class="frq-highlighted-answer">${partHL || escapeHtml(partText)}</div>
      </div>`;
    }).join('');
  } else {
    const fullHL = APUSHGrader.buildHighlightedHtml(rawAnswer, gradeResult);
    highlightedAnswerHtml = `<div class="frq-highlighted-answer">${fullHL}</div>`;
  }

  // Build feedback lists
  const missingHtml = (fb.missing || []).map(m =>
    `<li class="feedback-missing">⚠ ${escapeHtml(m)}</li>`
  ).join('');
  const foundHtml = (fb.found || []).map(f =>
    `<li class="feedback-found">✓ ${escapeHtml(f)}</li>`
  ).join('');
  const anachronismHtml = (fb.anachronisms || []).length > 0
    ? `<li class="feedback-warning">🚫 Anachronism: ${escapeHtml(fb.anachronisms.join(', '))}</li>`
    : '';

  // Build point breakdown table
  function breakdownRow(label, earned, max, manual) {
    const cls = manual ? 'manual' : earned === max ? 'full' : earned > 0 ? 'partial' : 'zero';
    const icon = manual ? '—' : earned === max ? '✓' : earned > 0 ? '½' : '✗';
    const pts  = manual ? '?/1' : `${earned}/${max}`;
    return `<tr class="breakdown-row ${cls}">
      <td class="breakdown-icon">${icon}</td>
      <td class="breakdown-label">${label}${manual ? ' <em style="opacity:.6">(manual)</em>' : ''}</td>
      <td class="breakdown-pts">${pts}</td>
    </tr>`;
  }

  let breakdownRows = '';
  if (isSAQ) {
    const parts = (gradeResult._raw && gradeResult._raw.parts) || {};
    breakdownRows = Object.entries(parts).map(([lbl, pr]) =>
      breakdownRow('Part ' + lbl.toUpperCase() + (pr.reason ? ' — ' + pr.reason : ''), pr.earned || 0, 1, false)
    ).join('');
  } else if (isDBQ) {
    const complexityEarned = bd.complexity || 0;
    const complexityManual = complexityEarned === 0; // manual only if not auto-awarded
    const complexityLabel  = complexityEarned
      ? 'Complexity (bonus: all docs cited)'
      : 'Complexity';
    breakdownRows = [
      breakdownRow('Thesis',             bd.thesis || 0,          1, false),
      breakdownRow('Historical Context', bd.context || 0,         1, false),
      breakdownRow('Outside Evidence',   bd.outsideEvidence || 0, 1, false),
      breakdownRow('Document Use',       bd.docUse || 0,          2, false),
      breakdownRow('Sourcing (HAPP)',    bd.sourcing || 0,        1, false),
      breakdownRow(complexityLabel,      complexityEarned,        1, complexityManual),
    ].join('');
  } else {
    breakdownRows = [
      breakdownRow('Thesis',             bd.thesis || 0,   1, false),
      breakdownRow('Historical Context', bd.context || 0,  1, false),
      breakdownRow('Evidence',           bd.evidence || 0, 2, false),
      breakdownRow('Analysis',           bd.analysis || 0, 2, false),
    ].join('');
  }

  // Build Scoring Logic section — raw counts for each grading criterion
  const details = (gradeResult._raw && gradeResult._raw.details) || {};
  let scoringLogicHtml = '';

  if (isDBQ) {
    const docsCited    = (details.citations || []);
    const sourcingExs  = (details.sourcingExamples || []);
    const uniqueHAPP   = [...new Set(sourcingExs.map(e => e.docNum))];
    const outsideTerm  = details.outsideTerm || null;
    const docsIcon     = docsCited.length >= 4 ? '✓' : docsCited.length >= 2 ? '½' : '✗';
    const happIcon     = uniqueHAPP.length  >= 2 ? '✓' : uniqueHAPP.length >= 1 ? '½' : '✗';
    const outsideIcon  = outsideTerm ? '✓' : '✗';

    scoringLogicHtml = `
      <div class="scoring-logic-row">
        <span class="sl-icon ${docsCited.length >= 4 ? 'full' : docsCited.length >= 2 ? 'partial' : 'zero'}">${docsIcon}</span>
        <span class="sl-label">Docs Found:</span>
        <span class="sl-value">${docsCited.length > 0 ? docsCited.map(n => 'Doc ' + n).join(', ') : 'none'}</span>
        <span class="sl-req">(need 2 for 1pt, 4 for 2pts)</span>
      </div>
      <div class="scoring-logic-row">
        <span class="sl-icon ${uniqueHAPP.length >= 2 ? 'full' : uniqueHAPP.length >= 1 ? 'partial' : 'zero'}">${happIcon}</span>
        <span class="sl-label">Docs Sourced (HAPP):</span>
        <span class="sl-value">${uniqueHAPP.length > 0 ? uniqueHAPP.map(n => 'Doc ' + n).join(', ') : 'none'}</span>
        <span class="sl-req">(need 2 for 1pt)</span>
      </div>
      <div class="scoring-logic-row">
        <span class="sl-icon ${outsideTerm ? 'full' : 'zero'}">${outsideIcon}</span>
        <span class="sl-label">Outside Evidence:</span>
        <span class="sl-value">${outsideTerm ? '"' + escapeHtml(outsideTerm) + '"' : 'none found'}</span>
        <span class="sl-req">(1 term not from docs = 1pt)</span>
      </div>`;
  } else if (!isSAQ) {
    // LEQ
    const evFound   = details.evidenceFound || [];
    const links15   = details.links15 || [];
    const linked    = [...new Set(links15.map(l => l.evidence))];
    const connUsed  = [...new Set(links15.map(l => l.connector))];
    const evIcon    = evFound.length >= 2 ? (linked.length >= 2 ? '✓' : '½') : '✗';
    scoringLogicHtml = `
      <div class="scoring-logic-row">
        <span class="sl-icon ${evFound.length >= 2 ? 'full' : 'zero'}">${evFound.length >= 2 ? '✓' : '✗'}</span>
        <span class="sl-label">Evidence Terms Found:</span>
        <span class="sl-value">${evFound.length > 0 ? evFound.map(t => '"' + escapeHtml(t) + '"').join(', ') : 'none'}</span>
        <span class="sl-req">(need 2 for 1pt)</span>
      </div>
      <div class="scoring-logic-row">
        <span class="sl-icon ${linked.length >= 2 ? 'full' : linked.length >= 1 ? 'partial' : 'zero'}">${linked.length >= 2 ? '✓' : linked.length >= 1 ? '½' : '✗'}</span>
        <span class="sl-label">Linked to Connector (≤15 words):</span>
        <span class="sl-value">${linked.length > 0 ? linked.map(t => '"' + escapeHtml(t) + '"').join(', ') : 'none'}</span>
        <span class="sl-req">(need 2 linked for 2pts)</span>
      </div>
      <div class="scoring-logic-row">
        <span class="sl-icon ${connUsed.length > 0 ? 'full' : 'zero'}">${connUsed.length > 0 ? '✓' : '✗'}</span>
        <span class="sl-label">Causal Connectors Found:</span>
        <span class="sl-value">${connUsed.length > 0 ? connUsed.map(c => '"' + escapeHtml(c) + '"').join(', ') : 'none'}</span>
        <span class="sl-req">(${connUsed.length} connector${connUsed.length !== 1 ? 's' : ''} used)</span>
      </div>`;
  } else {
    // SAQ — per-part detail rows
    const saqParts = (gradeResult._raw && gradeResult._raw.parts) || {};
    scoringLogicHtml = Object.entries(saqParts).map(([lbl, pr]) => {
      const ev   = (pr.evFound   || []).slice(0, 3).map(t => '"' + escapeHtml(t) + '"').join(', ') || 'none';
      const conn = (pr.connFound || []).slice(0, 3).map(c => '"' + escapeHtml(c) + '"').join(', ') || 'none';
      return `<div class="scoring-logic-row">
        <span class="sl-icon ${pr.earned ? 'full' : 'zero'}">${pr.earned ? '✓' : '✗'}</span>
        <span class="sl-label">Part ${lbl.toUpperCase()}:</span>
        <span class="sl-value">Evidence: ${ev} &nbsp;|&nbsp; Connector: ${conn}</span>
        <span class="sl-req">(ACE: both needed for 1pt)</span>
      </div>`;
    }).join('');
  }

  const scoreDisplay = `${gradeResult.score.total}/${gradeResult.score.max}`;

  el.innerHTML = `
    <div class="frq-analysis-panel expanded">
      <div class="frq-analysis-header" onclick="this.parentElement.classList.toggle('expanded')">
        <span>📊 Auto-Graded Score</span>
        <span class="analysis-toggle">▼</span>
      </div>
      <div class="frq-analysis-body">
        <div class="frq-analysis-scores">
          ${chips}
          <span class="analysis-suggestion">Suggested: ${scoreDisplay} pts</span>
        </div>
        <div class="frq-analysis-section">
          <h5>Point Breakdown</h5>
          <table class="score-breakdown-table">
            ${breakdownRows}
          </table>
        </div>
        <div class="frq-analysis-section">
          <h5>Your Essay (Highlighted)</h5>
          ${highlightedAnswerHtml}
          <div class="hl-legend">
            <span class="hl-evidence">■</span> Evidence &nbsp;
            <span class="hl-logic">■</span> Logic/Connector &nbsp;
            <span class="hl-niche">■</span> Niche &nbsp;
            <span class="hl-warning">■</span> Warning &nbsp;
            <span class="hl-anachronism">■</span> Anachronism &nbsp;
            <span class="hl-copy-warning">■</span> Copy
          </div>
        </div>
        <div class="frq-analysis-section">
          <h5>Detailed Feedback</h5>
          <ul class="feedback-list">
            ${foundHtml}
            ${anachronismHtml}
            ${missingHtml}
          </ul>
        </div>
        <div class="frq-analysis-section">
          <h5>Scoring Logic</h5>
          <div class="scoring-logic-grid">
            ${scoringLogicHtml}
          </div>
        </div>
      </div>
    </div>`;
}

// ─── Generic FRQ Analysis Panel Renderer (all auto-graded subjects) ──────────
function renderAutoFRQPanel(el, gradeResult, rawAnswer) {
  if (!el || !gradeResult) return;

  var pts   = gradeResult.points_earned  || [];
  var prox  = gradeResult.proximity_hits || [];
  var miss  = gradeResult.missing_logic  || [];
  var parts = (gradeResult.total_score || '0/0').split('/');
  var earned = parseInt(parts[0], 10) || 0;
  var max    = parseInt(parts[1], 10) || 0;
  var pct    = max > 0 ? Math.round((earned / max) * 100) : 0;
  var cpe    = gradeResult.cpe_triggered;

  // ── Score chips (one per rubric item) ──
  var chipsHtml = pts.map(function(p, i) {
    var cls   = p.awarded ? 'earned' : 'missing';
    var icon  = p.awarded ? '✓' : '✗';
    var label = (p.index !== undefined && p.index !== null) ? p.index : (i + 1);
    return '<span class="analysis-chip ' + cls + '" title="' + escapeHtml(p.reason || '') + '">' +
             label + '. ' + icon +
           '</span>';
  }).join('');

  // ── Breakdown table rows ──
  var rowsHtml = pts.map(function(p) {
    var cls  = p.awarded ? 'full' : 'zero';
    var icon = p.awarded ? '✓' : '✗';
    return '<tr class="breakdown-row ' + cls + '">' +
             '<td class="breakdown-icon">' + icon + '</td>' +
             '<td class="breakdown-label">' + renderFRQPromptText(p.description) + '</td>' +
             '<td class="breakdown-pts" style="font-size:0.8rem;color:var(--text-muted);min-width:180px">' + escapeHtml(p.reason || '') + '</td>' +
           '</tr>';
  }).join('');

  // ── Proximity hits ──
  var proxHtml = prox.length
    ? '<div class="frq-analysis-section" style="margin-top:12px">' +
        '<h5>⚡ Proximity Links Found</h5>' +
        '<ul>' + prox.map(function(h) {
          return '<li class="feedback-found">⚡ ' + renderFRQPromptText(h) + '</li>';
        }).join('') + '</ul>' +
      '</div>'
    : '';

  // ── Missing logic ──
  var missHtml = miss.length
    ? '<div class="frq-analysis-section" style="margin-top:12px">' +
        '<h5>⚠ Logic Gaps</h5>' +
        '<ul>' + miss.map(function(m) {
          return '<li class="feedback-missing">⚠ ' + renderFRQPromptText(m) + '</li>';
        }).join('') + '</ul>' +
      '</div>'
    : '';

  // ── CPE banner ──
  var cpeBanner = cpe
    ? '<div class="scoring-logic-row" style="background:var(--badge-bg);margin-bottom:8px;border-radius:6px;padding:6px 10px">' +
        '<span class="sl-icon partial" style="margin-right:6px">ℹ</span>' +
        '<span class="sl-label">CPE Protection applied — consistent carry-forward error credited</span>' +
      '</div>'
    : '';

  // ── Ideal response (KaTeX rendered via data-latex span) ──
  var idealHtml = gradeResult.ideal_response_latex
    ? '<div style="margin-top:16px">' +
        '<p style="font-weight:700;margin-bottom:6px">Ideal Response</p>' +
        '<div class="frq-highlighted-answer" style="padding:12px;overflow-x:auto">' +
          '<span data-latex="' + escapeHtml(gradeResult.ideal_response_latex) + '" data-display="true"></span>' +
          (gradeResult.ideal_response_prose
            ? '<p style="margin-top:8px;font-size:0.9rem;color:var(--text-secondary)">' + escapeHtml(gradeResult.ideal_response_prose) + '</p>'
            : '') +
        '</div>' +
      '</div>'
    : '';

  el.innerHTML =
    '<div class="frq-analysis-panel">' +
      '<div class="analysis-score-header">' +
        '<span class="analysis-total">' + earned + '/' + max + '</span>' +
        '<span class="analysis-pct" style="margin-left:10px">' + pct + '%</span>' +
        '<div class="analysis-chips" style="margin-top:8px">' + chipsHtml + '</div>' +
      '</div>' +
      cpeBanner +
      '<div style="margin-top:12px;overflow-x:auto">' +
        '<table class="breakdown-table" style="width:100%">' +
          '<thead><tr>' +
            '<th style="width:28px"></th>' +
            '<th>Rubric Criterion</th>' +
            '<th style="min-width:180px">Reason</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
      '</div>' +
      proxHtml +
      missHtml +
      idealHtml +
    '</div>';

  // Render any KaTeX spans (ideal response)
  if (typeof renderMath !== 'undefined') renderMath(el);
}

// ─── Exports ─────────────────────────────────────────────────────────────────
window.Scoring = {
  calculateTestScore, calculateUnitBreakdown, calculateDifficultyBreakdown,
  getWeakestTopics, renderScoreSummary, renderUnitBreakdown,
  renderDifficultyBreakdown, renderWeakTopics, renderTestHistory,
  renderFrqGrading, renderAnalysisPanel, renderAutoFRQPanel,
  // Backward-compat alias
  renderPhysicsPanel: renderAutoFRQPanel,
  UNIT_TITLES
};
