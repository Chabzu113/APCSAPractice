// AP Practice — Question Bank (multi-subject)

// ─── FRQ Grader Dispatcher ────────────────────────────────────────────────────
// Routes to APUSHGrader (apush) or GenericFRQGrader (all other auto-graded subjects).
// Returns the gradeResult or a minimal fallback object.
function dispatchFRQGrade(answerObj, frqType, unitNum, question, analysisEl, rawText) {
  var result;
  try {
    if (question.subject === 'apush' && typeof APUSHGrader !== 'undefined') {
      result = APUSHGrader.grade(answerObj, frqType, unitNum, question.subject, question);
      if (typeof Scoring !== 'undefined') Scoring.renderAnalysisPanel(analysisEl, result, rawText);
    } else if (typeof GenericFRQGrader !== 'undefined') {
      var subjectCfg = (typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[question.subject]) || {};
      result = GenericFRQGrader.grade(answerObj, frqType, unitNum, question, subjectCfg);
      var renderFn = (typeof renderAutoFRQPanel !== 'undefined') ? renderAutoFRQPanel
                   : (typeof Scoring !== 'undefined' && Scoring.renderAutoFRQPanel) ? Scoring.renderAutoFRQPanel
                   : null;
      if (renderFn) renderFn(analysisEl, result, rawText);
    }
  } catch (e) {
    console.error('FRQ Grader Error:', e.message, e);
    if (analysisEl) analysisEl.innerHTML = '<p class="frq-analysis-empty text-muted">Analysis unavailable — check console for details.</p>';
  }
  return result || { score: { total: 0, max: question.points || 7 } };
}

// Build a UNIT_TOPICS lookup from the active subject's unit definitions.
// Falls back to an empty object if SubjectRegistry isn't loaded yet.
function getActiveSubjectTopics() {
  if (typeof SubjectRegistry === 'undefined' || typeof App === 'undefined') return {};
  const subject = SubjectRegistry.getSubjectById(App.getActiveSubject());
  if (!subject || !subject.units) return {};
  const map = {};
  subject.units.forEach(u => { map[u.num] = u.topics || []; });
  return map;
}

// ─── State ────────────────────────────────────────────────────────────────────
let currentFilters = { topics: new Set(), difficulty: 'all', type: 'all', status: 'all' };
let currentSort = 'unit-order';
let allQuestions = [];
let filteredQuestions = [];

// Session state
let sessionQuestions = [];
let sessionIndex = 0;
let sessionCorrect = 0;
let sessionAnswered = 0;
let sessionAnswerState = {}; // qid -> { answered, correct, selectedIndex }

// ─── Unit Tab Bar ─────────────────────────────────────────────────────────────
let _activeUnitTab = 'all'; // 'all' or unit number as string

function renderUnitTabs() {
  const bar = document.getElementById('unitTabBar');
  if (!bar) return;

  const subject = typeof SubjectRegistry !== 'undefined' && typeof App !== 'undefined'
    ? SubjectRegistry.getSubjectById(App.getActiveSubject()) : null;
  const units = subject ? (subject.units || []) : [];

  if (units.length === 0) { bar.innerHTML = ''; return; }

  const subjectColor = subject ? subject.color : 'var(--accent-blue)';

  bar.innerHTML = [
    `<button class="unit-tab ${_activeUnitTab === 'all' ? 'active' : ''}"
             data-unit="all"
             style="--unit-tab-color:${subjectColor}">
       All Units
     </button>`,
    ...units.map(u =>
      `<button class="unit-tab ${_activeUnitTab === String(u.num) ? 'active' : ''}"
               data-unit="${u.num}"
               style="--unit-tab-color:${subjectColor}">
         Unit ${u.num}${u.title ? ' · ' + u.title : ''}
       </button>`
    )
  ].join('');

  bar.querySelectorAll('.unit-tab').forEach(btn => {
    btn.addEventListener('click', () => setActiveUnitTab(btn.dataset.unit));
  });
}

function setActiveUnitTab(unitKey) {
  _activeUnitTab = unitKey;

  // Update active state visually
  document.querySelectorAll('.unit-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.unit === unitKey);
  });

  // Apply filter: clear topics then select the chosen unit (or none for 'all')
  currentFilters.topics.clear();
  if (unitKey !== 'all') {
    const topics = getActiveSubjectTopics()[unitKey] || [];
    topics.forEach(t => currentFilters.topics.add(t.value));
    // Also add the unit-level key so questions with no topic still match
    currentFilters.topics.add('unit:' + unitKey);
  }

  // Sync the accordion checkboxes to reflect new filter state
  syncAccordionState();
  applyFilters();
}

// ─── Subject Context Bar ───────────────────────────────────────────────────────
function renderSubjectContext() {
  if (typeof SubjectRegistry === 'undefined') return;
  const subject = SubjectRegistry.getSubjectById(App.getActiveSubject());
  if (!subject) return;
  const bar = document.getElementById('subjectContextBar');
  if (bar) bar.style.background = subject.color;
  const emojiEl = document.getElementById('subjectContextEmoji');
  if (emojiEl) emojiEl.textContent = subject.emoji;
  const nameEl = document.getElementById('subjectContextName');
  if (nameEl) nameEl.textContent = subject.name + ' — Question Bank';
  const examEl = document.getElementById('subjectContextExam');
  if (examEl) {
    const days = SubjectRegistry.daysUntilExam(subject);
    examEl.textContent = days > 0 ? `Exam in ${days} days` : 'Exam passed';
  }
}

// ─── Question Type Label ───────────────────────────────────────────────────────
// Returns the fine-grained type label used for filtering. Called at load time so
// that the per-subject questionTypes chips always match normalised question types.
function getQuestionTypeLabel(q, subjId) {
  const isFRQ = Array.isArray(q.units) && q.units.length > 0 && !q.choices;
  if (isFRQ) {
    const ft = q.frqType;
    if (ft === 'saq') return 'SAQ';
    if (ft === 'leq') return 'LEQ';
    if (ft === 'dbq') return 'DBQ';
    return ft === 'short' ? 'Short FRQ' : ft === 'long' ? 'Long FRQ' : 'FRQ';
  }
  // MCQ
  if (subjId === 'apcalcab') {
    return q.calculator ? 'Calc MCQ' : 'Non-Calc MCQ';
  }
  return 'MCQ';
}

// ─── Load questions for the active subject ────────────────────────────────────
function loadQuestionsForActiveSubject() {
  if (typeof SubjectRegistry === 'undefined' || typeof App === 'undefined') {
    // Fallback: legacy globals for AP CS A
    return [
      ...(typeof MCQ_U1U2 !== 'undefined' ? MCQ_U1U2.map(q => ({ ...q, type: q.type || 'MCQ' })) : []),
      ...(typeof MCQ_U3U4 !== 'undefined' ? MCQ_U3U4.map(q => ({ ...q, type: q.type || 'MCQ' })) : []),
      ...(typeof FRQ_BANK !== 'undefined' ? FRQ_BANK.map(f => ({ ...f, type: 'FRQ', unit: f.units ? f.units[0] : 1 })) : [])
    ];
  }

  const subjectId = App.getActiveSubject();
  const subject = SubjectRegistry.getSubjectById(subjectId);
  const questions = [];

  (subject && subject.dataFiles ? subject.dataFiles : []).forEach(varName => {
    const arr = window[varName];
    if (!Array.isArray(arr)) return;
    arr.forEach(q => {
      // Normalise: FRQs use a `units` array; MCQs use a `unit` number
      const isFRQ = Array.isArray(q.units) && q.units.length > 0 && !q.choices;
      questions.push({
        ...q,
        subject: subjectId,
        type: getQuestionTypeLabel(q, subjectId),
        unit: isFRQ ? q.units[0] : q.unit
      });
    });
  });

  return questions;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function initQuestionBank() {
  allQuestions = loadQuestionsForActiveSubject();

  const urlDiff = App.getUrlParam('difficulty');
  if (urlDiff) currentFilters.difficulty = urlDiff;

  renderSubjectContext();
  renderUnitTabs();
  renderAccordion();
  renderFilters();

  // If a unit was passed in the URL (e.g. ?unit=2 from the dashboard unit cards),
  // pre-filter to that unit. setActiveUnitTab calls applyFilters internally.
  const urlUnit = App.getUrlParam('unit');
  if (urlUnit) {
    setActiveUnitTab(String(urlUnit));
  } else {
    applyFilters();
  }

  wireSetupListeners();
}

// ─── Filter Logic ─────────────────────────────────────────────────────────────
function applyFilters() {
  filteredQuestions = allQuestions.filter(q => {
    // Topic filter — if any topics selected, question must match one
    if (currentFilters.topics.size > 0) {
      const qTopics = Array.isArray(q.topics) ? q.topics : (q.topic ? [q.topic] : []);
      const unitKey = String(q.unit);
      const hasTopicMatch = qTopics.some(t => currentFilters.topics.has(t));
      const hasUnitMatch = currentFilters.topics.has('unit:' + unitKey);
      if (!hasTopicMatch && !hasUnitMatch) return false;
    }
    if (currentFilters.difficulty !== 'all' && q.difficulty !== currentFilters.difficulty) return false;
    if (currentFilters.type !== 'all' && q.type !== currentFilters.type) return false;
    if (currentFilters.status !== 'all') {
      const status = App.getQuestionStatus(q.id);
      if (status !== currentFilters.status) return false;
    }
    return true;
  });

  if (currentSort === 'difficulty-asc') {
    const order = { easy: 0, medium: 1, hard: 2 };
    filteredQuestions.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
  } else if (currentSort === 'difficulty-desc') {
    const order = { easy: 0, medium: 1, hard: 2 };
    filteredQuestions.sort((a, b) => (order[b.difficulty] || 0) - (order[a.difficulty] || 0));
  } else if (currentSort === 'random') {
    filteredQuestions = App.shuffle(filteredQuestions);
  }

  renderPreview();
}

// ─── Render Filters ───────────────────────────────────────────────────────────

// Builds type filter chips from the active subject's questionTypes definition.
// Falls back to All / MCQ / FRQ for subjects that don't define questionTypes.
function renderTypeFilterChips() {
  const subj = typeof SubjectRegistry !== 'undefined'
    ? SubjectRegistry.getSubjectById(App.getActiveSubject())
    : null;
  const types = (subj && subj.questionTypes)
    ? subj.questionTypes
    : [{ value: 'all', label: 'All' }, { value: 'MCQ', label: 'MCQ' }, { value: 'FRQ', label: 'FRQ' }];
  const container = document.getElementById('typeChips');
  if (!container) return;
  // Render chips with active state — click handling is done by the global
  // document listener in wireSetupListeners() which calls applyFilters().
  container.innerHTML = types.map(t =>
    `<button class="filter-chip${currentFilters.type === t.value ? ' active' : ''}" data-filter="type" data-value="${t.value}">${t.label}</button>`
  ).join('');
}

function renderFilters() {
  const diffFilter = document.getElementById('diffChips');
  if (diffFilter) {
    [{ v: 'all', l: 'All' }, { v: 'easy', l: '🟢 Easy' }, { v: 'medium', l: '🟡 Medium' }, { v: 'hard', l: '🔴 Hard' }].forEach(o => {
      const btn = diffFilter.querySelector(`[data-value="${o.v}"]`);
      if (btn) btn.className = `filter-chip${currentFilters.difficulty === o.v ? ' active' : ''}`;
    });
  }
  // Type chips are fully dynamic — rebuilt from subject's questionTypes
  renderTypeFilterChips();
  const statusFilter = document.getElementById('statusChips');
  if (statusFilter) {
    [{ v: 'all' }, { v: 'unseen' }, { v: 'correct' }, { v: 'incorrect' }].forEach(o => {
      const btn = statusFilter.querySelector(`[data-value="${o.v}"]`);
      if (btn) btn.className = `filter-chip${currentFilters.status === o.v ? ' active' : ''}`;
    });
  }
}

function updateFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(btn => {
    const filter = btn.dataset.filter;
    const val = btn.dataset.value;
    if (!filter || filter === 'unit') return;
    const cur = String(currentFilters[filter]);
    btn.classList.toggle('active', cur === String(val));
  });
}

// ─── Accordion Topic Picker ───────────────────────────────────────────────────
function renderAccordion() {
  const container = document.getElementById('topicAccordion');
  if (!container) return;

  const UNIT_TOPICS = getActiveSubjectTopics();

  container.innerHTML = Object.entries(UNIT_TOPICS).map(([unitNum, topics]) => {
    const unitKey = 'unit:' + unitNum;
    const allChecked = topics.every(t => currentFilters.topics.has(t.value));
    const someChecked = topics.some(t => currentFilters.topics.has(t.value));
    return `
      <div class="accordion-unit" id="accordion-unit-${unitNum}">
        <div class="accordion-unit-header" data-unit="${unitNum}">
          <input type="checkbox" class="unit-checkbox" data-unit="${unitNum}"
            ${allChecked ? 'checked' : ''}
            ${someChecked && !allChecked ? 'data-indeterminate="true"' : ''}
            title="Select all Unit ${unitNum} topics">
          <span class="accordion-unit-label">Unit ${unitNum}</span>
          <span class="accordion-unit-count">${topics.length} topics</span>
          <span class="accordion-chevron">▶</span>
        </div>
        <div class="accordion-topics">
          ${topics.map(t => `
            <div class="topic-row">
              <input type="checkbox" class="topic-checkbox" id="topic-${t.value}" data-topic="${t.value}" data-unit="${unitNum}"
                ${currentFilters.topics.has(t.value) ? 'checked' : ''}>
              <label for="topic-${t.value}">${t.label}</label>
            </div>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  // Set indeterminate state
  container.querySelectorAll('.unit-checkbox[data-indeterminate="true"]').forEach(cb => {
    cb.indeterminate = true;
  });

  wireAccordion(container);
}

function wireAccordion(container) {
  // Toggle open/close on header click (not on checkbox)
  container.querySelectorAll('.accordion-unit-header').forEach(header => {
    header.addEventListener('click', e => {
      if (e.target.classList.contains('unit-checkbox')) return;
      const unit = header.closest('.accordion-unit');
      unit.classList.toggle('open');
    });
  });

  // Unit checkbox — select/deselect all topics in unit
  container.querySelectorAll('.unit-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
      const unitNum = cb.dataset.unit;
      const topics = getActiveSubjectTopics()[unitNum] || [];
      if (cb.checked) {
        topics.forEach(t => currentFilters.topics.add(t.value));
        currentFilters.topics.add('unit:' + unitNum); // fallback for free-text topic subjects
      } else {
        topics.forEach(t => currentFilters.topics.delete(t.value));
        currentFilters.topics.delete('unit:' + unitNum);
      }
      syncAccordionState();
      applyFilters();
    });
  });

  // Individual topic checkbox
  container.querySelectorAll('.topic-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
      if (cb.checked) {
        currentFilters.topics.add(cb.dataset.topic);
      } else {
        currentFilters.topics.delete(cb.dataset.topic);
      }
      syncAccordionState();
      applyFilters();
    });
  });
}

function syncAccordionState() {
  Object.entries(getActiveSubjectTopics()).forEach(([unitNum, topics]) => {
    const unitCb = document.querySelector(`.unit-checkbox[data-unit="${unitNum}"]`);
    if (!unitCb) return;
    const allChecked = topics.every(t => currentFilters.topics.has(t.value));
    const someChecked = topics.some(t => currentFilters.topics.has(t.value));
    unitCb.checked = allChecked;
    unitCb.indeterminate = someChecked && !allChecked;
  });
}

// ─── Setup Screen Preview ─────────────────────────────────────────────────────
function getQuestionLimit() {
  const input = document.getElementById('questionLimitInput');
  if (!input || !input.value) return null;
  const val = parseInt(input.value);
  return (isNaN(val) || val < 1) ? null : val;
}

function renderPreview() {
  const container = document.getElementById('previewContainer');
  const countEl = document.getElementById('resultsCount');
  const countLabel = document.getElementById('sessionCountLabel');
  const startBtn = document.getElementById('startSessionBtn');
  const limitLabel = document.getElementById('limitAvailLabel');

  const total = filteredQuestions.length;
  const limit = getQuestionLimit();
  const sessionCount = limit ? Math.min(limit, total) : total;

  if (countEl) countEl.textContent = `${total} question${total !== 1 ? 's' : ''} match your filters`;
  if (limitLabel) limitLabel.textContent = total > 0 ? `of ${total} available` : '';
  if (countLabel) countLabel.textContent = total > 0 ? `${sessionCount} question${sessionCount !== 1 ? 's' : ''} ready` : 'No questions match';
  if (startBtn) startBtn.disabled = total === 0;

  if (!container) return;

  if (total === 0) {
    // Check if active subject has no content at all
    const activeSubj = typeof SubjectRegistry !== 'undefined'
      ? SubjectRegistry.getSubjectById(App.getActiveSubject()) : null;
    if (activeSubj && !activeSubj.hasContent && allQuestions.length === 0) {
      container.innerHTML = `<div class="card" style="text-align:center;padding:48px">
        <div style="font-size:2.5rem;margin-bottom:12px">${activeSubj.emoji}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:8px">${activeSubj.name} questions coming soon!</p>
        <p style="color:var(--text-muted);margin-bottom:20px">Question bank content for this subject is under development. Use the Study Planner to stay organized in the meantime.</p>
        <a href="planner.html" class="btn btn-primary">📅 Open Study Planner</a>
      </div>`;
    } else {
      container.innerHTML = `<div class="card" style="text-align:center;padding:48px;color:var(--text-muted)">
        <div style="font-size:2rem;margin-bottom:12px">🔍</div>
        <p>No questions match your filters.</p>
        <button class="btn btn-secondary" onclick="clearFilters()" style="margin-top:12px">Clear Filters</button>
      </div>`;
    }
    return;
  }

  // Show a preview list (non-interactive, just shows what's coming)
  const preview = filteredQuestions.slice(0, 8);
  const diffColor = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };
  const statusIcon = { unseen: '⬜', correct: '✅', incorrect: '❌' };

  container.innerHTML = `
    <div class="card" style="margin-bottom:16px;padding:16px 20px;background:var(--bg-secondary);border:none">
      <p style="color:var(--text-muted);font-size:0.9rem;margin:0">
        Select your filters on the left, then click <strong>▶ Start Practice</strong> to begin a focused one-question-at-a-time session.
      </p>
    </div>
    ${preview.map((q, i) => {
      const status = App.getQuestionStatus(q.id);
      return `<div class="card preview-row" style="margin-bottom:10px;padding:14px 18px;display:flex;align-items:center;gap:12px;cursor:default">
        <span style="color:var(--text-muted);font-size:0.85rem;min-width:24px;font-weight:600">${i + 1}</span>
        <span style="flex:1;font-size:0.95rem;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${App.escapeHtml(q.question || q.prompt || '')}</span>
        <span class="badge ${diffColor[q.difficulty] || 'badge-medium'}" style="flex-shrink:0">${q.difficulty || 'medium'}</span>
        <span class="badge badge-unit" style="flex-shrink:0">U${q.unit}</span>
        <span style="flex-shrink:0">${statusIcon[status] || '⬜'}</span>
      </div>`;
    }).join('')}
    ${total > 8 ? `<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:0.9rem">+ ${total - 8} more questions</div>` : ''}
  `;
}

// ─── Session: Start ───────────────────────────────────────────────────────────
function startSession() {
  if (filteredQuestions.length === 0) return;

  const limit = getQuestionLimit();
  sessionQuestions = limit ? filteredQuestions.slice(0, limit) : [...filteredQuestions];
  sessionIndex = 0;
  sessionCorrect = 0;
  sessionAnswered = 0;
  sessionAnswerState = {};

  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('sessionScreen').classList.remove('hidden');

  renderSessionQuestion();
  updateSessionNav();
}

function endSession() {
  document.getElementById('sessionScreen').classList.add('hidden');
  document.getElementById('setupScreen').classList.remove('hidden');
  applyFilters(); // refresh status dots
}

// ─── Session: Render Question ─────────────────────────────────────────────────
// ─── Helpers ──────────────────────────────────────────────────────────────────
// Safely render text: escape HTML but preserve newlines as <br>
function safeText(str) {
  if (!str) return '';
  return App.escapeHtml(str).replace(/\n/g, '<br>');
}

// Render FRQ prompt: prose lines stay as text, code blocks get syntax highlighted
function renderFRQPrompt(prompt) {
  if (!prompt) return '';
  const lines = prompt.split('\n');
  let html = '';
  let codeBuffer = [];
  let textBuffer = [];

  // Heuristic: a line is "code" if it starts with Java syntax or is indented 4+ spaces with content
  const looksLikeCode = line => {
    const t = line.trimStart();
    if (!t) return codeBuffer.length > 0; // blank line inside code block stays in code
    return /^(public|private|protected|static|void|int|double|boolean|String|char|class|if|else|for|while|return|new|\/\/|\*|@|\{|\})/.test(t)
      || (/^(    |\t)/.test(line) && t.length > 0);
  };

  const flushCode = () => {
    if (codeBuffer.length) {
      // Trim trailing blank lines from code block
      while (codeBuffer.length && !codeBuffer[codeBuffer.length - 1].trim()) codeBuffer.pop();
      if (codeBuffer.length) html += App.renderCode(codeBuffer.join('\n'));
      codeBuffer = [];
    }
  };
  const flushText = () => {
    if (textBuffer.length) {
      html += `<p class="frq-prompt-text">${textBuffer.map(l => renderFRQPromptText(l)).join('<br>')}</p>`;
      textBuffer = [];
    }
  };

  for (const line of lines) {
    if (looksLikeCode(line)) {
      flushText();
      codeBuffer.push(line);
    } else {
      flushCode();
      if (line.trim() === '' && textBuffer.length) {
        flushText();
      } else if (line.trim() !== '') {
        textBuffer.push(line);
      }
    }
  }
  flushCode();
  flushText();
  return html;
}

function renderSessionQuestion() {
  const q = sessionQuestions[sessionIndex];
  if (!q) return;

  const wrap = document.getElementById('sessionQuestionWrap');
  const isFRQ = q.type && (q.type.includes('FRQ') || q.type === 'SAQ' || q.type === 'LEQ' || q.type === 'DBQ');
  const state = sessionAnswerState[q.id];
  const diffColor = { easy: '#16a34a', medium: '#d97706', hard: '#dc2626' };
  const diffBg = { easy: '#dcfce7', medium: '#fef9c3', hard: '#fee2e2' };

  // Header badges
  const headerHtml = `
    <div class="session-q-meta">
      <span class="badge badge-unit">Unit ${q.unit}${q.topic ? ' · ' + q.topic : ''}</span>
      <span class="badge" style="background:${diffBg[q.difficulty]||'#fef9c3'};color:${diffColor[q.difficulty]||'#d97706'}">${q.difficulty || 'medium'}</span>
      <span class="badge ${isFRQ ? 'badge-frq' : 'badge-mcq'}">${q.type || 'MCQ'}</span>
    </div>`;

  // Question / prompt text
  let questionHtml = '';
  if (isFRQ) {
    // FRQ: smart rendering — split prose from embedded code
    questionHtml = `<div class="session-question-text frq-prompt">${renderFRQPrompt(q.prompt || '')}</div>`;
  } else {
    // MCQ: renderFRQPromptText handles plain text, bare LaTeX, and $…$/$$…$$ delimiters
    questionHtml = `<div class="session-question-text">${renderFRQPromptText(q.question || '')}</div>`;
  }

  // MCQ table (for format:"table" questions using tableData)
  const tableHtml = (!isFRQ && q.format === 'table' && q.tableData) ? buildTableHtml(q.tableData) : '';

  // MCQ code block (separate field)
  const codeHtml = (!isFRQ && q.isCode && q.code) ? App.renderCode(q.code) : '';
  // FRQ starter code
  const starterHtml = q.starterCode
    ? `<div style="margin-top:16px"><p class="frq-section-label">Starter code:</p>${App.renderCode(q.starterCode)}</div>`
    : '';

  let bodyHtml = '';

  if (!isFRQ) {
    // ── MCQ ──
    const choicesHtml = (q.choices || []).map((c, ci) => {
      let cls = 'choice-item';
      let icon = '';
      if (state) {
        if (ci === q.answer) { cls += ' correct'; icon = '<span class="choice-icon correct-icon">✓</span>'; }
        else if (ci === state.selectedIndex) { cls += ' incorrect'; icon = '<span class="choice-icon wrong-icon">✗</span>'; }
      }
      // Choice text: code → monospace, everything else → renderFRQPromptText
      // (handles plain text, bare LaTeX like \frac{}, and $…$-delimited Physics/Calc choices)
      // isCodeChoice guard: requires no $ delimiter AND not bare LaTeX (avoids tagging Physics
      // choices like "$v = 12 m/s$" as code because they contain '=')
      const choiceText = String(c).replace(/\n/g, ' ');
      const isCodeChoice = !choiceText.includes('$')
        && !isLatexString(choiceText)
        && /[{};=()]/.test(choiceText)
        && choiceText.length < 80;
      const renderedChoice = isCodeChoice
        ? `<code style="font-family:monospace;font-size:0.9em">${App.escapeHtml(choiceText)}</code>`
        : renderFRQPromptText(choiceText);

      return `<label class="${cls}" style="cursor:${state ? 'default' : 'pointer'}" data-ci="${ci}">
        <input type="radio" name="session_choice" value="${ci}" style="display:none" ${state ? 'disabled' : ''} ${state && ci === state.selectedIndex ? 'checked' : ''}>
        <span class="choice-label">${String.fromCharCode(65 + ci)})</span>
        <span class="choice-text">${renderedChoice}</span>
        ${icon}
      </label>`;
    }).join('');

    const submitBtn = state ? '' : `<button class="btn btn-primary session-submit-btn" id="sessionSubmitBtn" style="margin-top:24px">Submit Answer</button>`;

    const feedbackHtml = state ? `
      <div class="session-feedback ${state.correct ? 'session-feedback-correct' : 'session-feedback-wrong'}">
        <p class="feedback-title">${state.correct ? '✓ Correct!' : '✗ Incorrect — Correct answer: ' + String.fromCharCode(65 + q.answer) + ')'}</p>
        <p class="feedback-body">${renderFRQPromptText(q.explanation || '')}</p>
      </div>` : '';

    bodyHtml = `<div class="choices-list" id="sessionChoices">${choicesHtml}</div>${submitBtn}${feedbackHtml}`;

  } else {
    // ── FRQ ──
    const totalPts = (q.rubric || []).reduce((s, r) => s + (r.points || 0), 0);

    // Synthesize parts[] for auto-graded questions with empty parts[] (e.g. AP Micro).
    // Graph rubric items → one shared diagram self-check part.
    // Each non-graph rubric item → its own labelled textarea.
    if (q.autoGraded && (!q.parts || q.parts.length === 0) && (q.rubric || []).length > 0) {
      const syntheticParts = [];
      if (q.rubric.some(r => r.skill === 'graph')) {
        syntheticParts.push({ label: 'graph', skill: 'diagram', synthetic: true });
      }
      q.rubric.filter(r => r.skill !== 'graph').forEach(item => {
        syntheticParts.push({
          label:    item.partLabel || 'a',
          skill:    item.skill,
          synthetic: true
          // no 'question' — rubric description would give away the answer
        });
      });
      q.parts = syntheticParts;  // mutate parts in-place (q is const — can't reassign)
    }

    // Synthetic parts carry their own question prompt inside the editor — skip them in partsHtml
    const partsHtml = (q.parts || []).filter(p => !p.synthetic).map(p => {
      const ptsHtml = p.points !== undefined ? `<span class="frq-part-pts">${p.points} pt${p.points !== 1 ? 's' : ''}</span>` : '';
      const text = p.instruction || p.question || '';
      return `<div class="frq-part-card">
        <div class="frq-part-header">
          <span class="frq-part-label">Part (${p.label})</span>
          ${ptsHtml}
        </div>
        <p class="frq-part-instruction">${renderFRQPromptText(text)}</p>
      </div>`;
    }).join('');

    const isAutoGraded = q.autoGraded === true || (q.subject && typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[q.subject] && FRQ_CONFIGS[q.subject].autoGradeAll);
    const displayPts = isAutoGraded ? (q.points || 7) : totalPts;

    // DBQ: render stimulus documents above the editor
    // Supports both q.documents {id,source,content} and q.stimulus {docNum,attribution,excerpt}
    const frqTypeForDocs = (q.frqType || q.type || '').toLowerCase();
    const rawDocs = q.documents || q.stimulus || [];
    const stimulusHtml = (frqTypeForDocs === 'dbq' && rawDocs.length > 0)
      ? `<div class="dbq-stimulus-container">
           <div class="dbq-stimulus-header">📄 Documents (${rawDocs.length})</div>
           <div class="dbq-documents-scroll">
             ${rawDocs.map(function(doc, i) {
               const num    = doc.id    || doc.docNum || (i + 1);
               const source = doc.source || doc.attribution || '';
               const text   = doc.content || doc.excerpt || '';
               return '<div class="dbq-document-card">' +
                 '<div class="dbq-document-source">Document ' + num + ' — ' + App.escapeHtml(source) + '</div>' +
                 '<div class="dbq-document-content">' + App.escapeHtml(text) + '</div>' +
                 '</div>';
             }).join('')}
           </div>
         </div>`
      : '';

    if (!state) {
      // ── Not yet answered: show editor + action button ──
      const gradingSectionHtml = isAutoGraded
        ? `<div id="frqGradingSection" class="hidden" style="margin-top:20px">
             <div id="frqAutoAnalysis" class="frq-analysis-placeholder"></div>
           </div>`
        : `<div id="frqGradingSection" class="hidden" style="margin-top:20px"></div>`;

      const frqTypeForEditor = (q.frqType || q.type || '').toLowerCase();
      // Show per-part editors for ANY question that has a parts[] array
      // (covers saq, frq, short, long — regardless of whether it is auto-graded)
      const isSAQEditor = q.parts && q.parts.length > 0;
      const editorHtml = isSAQEditor
        ? (q.parts || [{label:'a'},{label:'b'},{label:'c'}]).map(p => {
            const ptsLabel = p.points ? `${p.points} pt${p.points !== 1 ? 's' : ''}` : '';
            const skillLabel = p.skill ? ` — ${p.skill.charAt(0).toUpperCase() + p.skill.slice(1)}` : '';
            const minH = (p.skill === 'paragraph' || p.skill === 'derivation') ? '120px' : '72px';

            // ── Diagram parts: draw-first, then reveal rubric for honest self-grade
            if (p.skill === 'diagram') {
              const diagRubric = (q.rubric || []).filter(r => r.skill === 'diagram' || r.skill === 'graph');
              const criteriaHtml = diagRubric.map(r =>
                `<li style="margin-bottom:8px">${r.description}</li>`
              ).join('');
              const drawId   = `diagramDraw_${p.label}`;
              const rubricId = `diagramRubric_${p.label}`;
              return `
              <div class="frq-editor-section" style="margin-bottom:14px;border:1px solid var(--border-color);border-radius:8px;overflow:hidden">
                <div class="frq-editor-header" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--card-header-bg,var(--bg-secondary));border-bottom:1px solid var(--border-color)">
                  <span class="frq-section-label" style="font-weight:700;font-size:0.85rem;letter-spacing:0.04em">
                    PART (${p.label.toUpperCase()}) — Diagram
                  </span>
                  ${ptsLabel ? `<span style="font-size:0.78rem;color:var(--text-muted);font-weight:600">${ptsLabel}</span>` : ''}
                </div>

                <!-- Step 1: Draw prompt -->
                <div id="${drawId}" style="padding:16px 18px;text-align:center">
                  <p style="margin:0 0 14px;font-size:0.92rem;color:var(--text-primary)">
                    ✏️ <strong>Grab a pencil and draw your diagram on paper.</strong><br>
                    <span style="font-size:0.84rem;color:var(--text-muted)">Don't peek at the rubric — draw what you think is correct first.</span>
                  </p>
                  <button
                    class="diagram-reveal-btn"
                    data-draw-id="${drawId}"
                    data-rubric-id="${rubricId}"
                    style="padding:9px 22px;border-radius:6px;border:none;background:var(--accent-color,#3b82f6);color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer">
                    I've finished drawing →
                  </button>
                </div>

                <!-- Step 2: Rubric reveal + self-grade checkbox (hidden until Step 1 done) -->
                <div id="${rubricId}" style="display:none;padding:14px 18px">
                  <p style="margin:0 0 10px;font-size:0.88rem;color:var(--text-secondary);font-weight:600">
                    Now compare your diagram to the rubric criteria below:
                  </p>
                  <ul style="margin:0 0 16px;padding-left:20px;font-size:0.86rem;line-height:1.7;color:var(--text-primary)">
                    ${criteriaHtml}
                  </ul>
                  <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:0.9rem;font-weight:600;padding:10px 12px;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-secondary)">
                    <input type="checkbox" id="frqPartEditor_${p.label}"
                      style="margin-top:2px;width:17px;height:17px;flex-shrink:0;cursor:pointer;accent-color:#4ade80">
                    <span>Yes — my diagram correctly satisfies all of the criteria above <span style="font-weight:400;color:var(--text-muted)">(awards 1 pt)</span></span>
                  </label>
                </div>
              </div>`;
            }

            // ── All other parts: standard textarea ──────────────────────────────
            // Only show inline prompt for synthetic parts — real parts show their question in the cards above
            const questionPromptHtml = (p.synthetic && p.question)
              ? `<div style="padding:8px 12px 10px;font-size:0.84rem;color:var(--text-secondary);border-bottom:1px solid var(--border-color)">${p.question}</div>`
              : '';
            return `
            <div class="frq-editor-section" style="margin-bottom:14px;border:1px solid var(--border-color);border-radius:8px;overflow:hidden">
              <div class="frq-editor-header" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--card-header-bg,var(--bg-secondary));border-bottom:1px solid var(--border-color)">
                <span class="frq-section-label" style="font-weight:700;font-size:0.85rem;letter-spacing:0.04em">
                  PART (${p.label.toUpperCase()})${skillLabel}
                </span>
                ${ptsLabel ? `<span style="font-size:0.78rem;color:var(--text-muted);font-weight:600">${ptsLabel}</span>` : ''}
              </div>
              ${questionPromptHtml}
              <textarea id="frqPartEditor_${p.label}" class="frq-code-editor"
                style="min-height:${minH};border:none;border-radius:0;resize:vertical"
                placeholder="Write your response for Part (${p.label.toUpperCase()})..."></textarea>
            </div>`;
          }).join('')
        : `<div class="frq-editor-section">
             <div class="frq-editor-header">
               <span class="frq-section-label">${isFRQ ? 'ESSAY RESPONSE:' : 'Your answer (Java code):'}</span>
               <span style="font-size:0.8rem;color:var(--text-muted)">${displayPts} points total</span>
             </div>
             <textarea id="frqAnswerEditor" class="frq-code-editor" placeholder="${isFRQ ? 'Write your essay response here...' : '// Write your Java solution here...'}"></textarea>
           </div>`;

      bodyHtml = `
        ${partsHtml}
        ${stimulusHtml}
        ${editorHtml}
        <div class="frq-editor-actions" style="margin-top:4px">
          <button class="btn btn-primary" id="frqCheckAnswer">
            ${isAutoGraded ? 'Grade My Response' : 'Check My Answer'}
          </button>
        </div>
        ${gradingSectionHtml}`;
    } else {
      // ── Already answered: show result ──
      const maxPts = isAutoGraded ? (state.frqScoreMax || q.points || 7) : totalPts;
      const score = state.frqScore != null ? state.frqScore : (state.correct ? maxPts : 0);
      const pct = maxPts > 0 ? Math.round((score / maxPts) * 100) : 0;
      if (isAutoGraded) {
        bodyHtml = `
          ${partsHtml}
          ${stimulusHtml}
          <div class="session-feedback ${state.correct ? 'session-feedback-correct' : 'session-feedback-wrong'}" style="margin-top:16px">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <span style="font-size:1.6rem;font-weight:800">${score}/${maxPts}</span>
              <span style="font-weight:600">${pct}% — ${state.correct ? '✓ Passing' : '✗ Needs work'}</span>
            </div>
          </div>
          <div id="frqAutoAnalysisResult" class="frq-analysis-placeholder" style="margin-top:16px"></div>`;
      } else {
        bodyHtml = `
          ${partsHtml}
          <div class="session-feedback ${state.correct ? 'session-feedback-correct' : 'session-feedback-wrong'}" style="margin-top:16px">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <span style="font-size:1.6rem;font-weight:800">${score}/${totalPts}</span>
              <span style="font-weight:600">${pct}% — ${state.correct ? '✓ Passing' : '✗ Needs work'}</span>
            </div>
          </div>
          ${q.sampleSolution ? `<div style="margin-top:16px">
            <p class="frq-section-label">Sample Solution:</p>
            ${App.renderCode(q.sampleSolution)}
          </div>` : ''}
          <div style="margin-top:16px">
            <div class="session-feedback session-feedback-info">
              <p style="font-weight:700;margin-bottom:8px">Rubric (${totalPts} pts)</p>
              <ul class="rubric-list">${(q.rubric || []).map(r =>
                `<li class="rubric-item">
                  <span>${renderFRQPromptText(r.description)}</span>
                  <span class="rubric-pts">${r.points} pt</span>
                </li>`).join('')}</ul>
            </div>
          </div>`;
      }
    }
  }

  wrap.innerHTML = `
    <div class="session-question-card">
      ${headerHtml}
      ${questionHtml}
      ${tableHtml}
      ${codeHtml}
      ${starterHtml}
      <div class="session-answer-area">${bodyHtml}</div>
    </div>`;

  // Render any LaTeX embedded as data-latex spans (AP Calc AB, etc.)
  renderMath(wrap);

  // Re-render auto-analysis panel for already-answered auto-graded FRQs
  if (isFRQ && state) {
    const isAutoGradedRerender = q.autoGraded === true || (q.subject && typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[q.subject] && FRQ_CONFIGS[q.subject].autoGradeAll);
    if (isAutoGradedRerender && state.frqAnswerObj) {
      const analysisEl = document.getElementById('frqAutoAnalysisResult');
      if (analysisEl) {
        const frqType = (q.frqType || q.type || 'leq').toLowerCase();
        const unitNum = (q.units && q.units[0]) || q.unit || 1;
        const rawText = Object.values(state.frqAnswerObj).join('\n\n');
        dispatchFRQGrade(state.frqAnswerObj, frqType, unitNum, q, analysisEl, rawText);
      }
    }
  }

  // Wire MCQ choices
  if (!isFRQ && !state) {
    wrap.querySelectorAll('.choice-item').forEach(item => {
      item.addEventListener('click', () => {
        const radio = item.querySelector('input[type="radio"]');
        if (!radio || radio.disabled) return;
        radio.checked = true;
        wrap.querySelectorAll('.choice-item').forEach(ci => ci.classList.remove('selected'));
        item.classList.add('selected');
      });
    });

    const submitBtn = document.getElementById('sessionSubmitBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const selected = wrap.querySelector('input[name="session_choice"]:checked');
        if (!selected) {
          submitBtn.classList.add('shake');
          submitBtn.textContent = 'Pick an answer first!';
          setTimeout(() => { submitBtn.classList.remove('shake'); submitBtn.textContent = 'Submit Answer'; }, 1500);
          return;
        }
        submitMCQ(q, parseInt(selected.value));
      });
    }
  }

  // Wire FRQ buttons
  if (isFRQ && !state) {
    // Wire diagram "I've finished drawing" reveal buttons (CSP-safe — no inline onclick)
    wrap.querySelectorAll('.diagram-reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawEl   = document.getElementById(btn.dataset.drawId);
        const rubricEl = document.getElementById(btn.dataset.rubricId);
        if (drawEl)   drawEl.style.display   = 'none';
        if (rubricEl) rubricEl.style.display = 'block';
      });
    });

    const isAutoGradedWire = q.autoGraded === true || (q.subject && typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[q.subject] && FRQ_CONFIGS[q.subject].autoGradeAll);
    const totalPtsForWire = (q.rubric || []).reduce((s, r) => s + (r.points || 0), 0);
    const checkBtn = document.getElementById('frqCheckAnswer');

    if (checkBtn) {
      if (isAutoGradedWire) {
        // Auto-graded: run engine, show analysis, record result
        checkBtn.addEventListener('click', () => {
          const frqType = (q.frqType || q.type || 'leq').toLowerCase();
          const isSAQWire = q.parts && q.parts.length > 0;

          // Step 1: Collect answers only (do NOT lock yet)
          let answerObj = {};
          if (isSAQWire) {
            (q.parts || [{label:'a'},{label:'b'},{label:'c'}]).forEach(p => {
              const el = document.getElementById('frqPartEditor_' + p.label);
              if (!el) { answerObj[p.label] = ''; return; }
              answerObj[p.label] = (el.type === 'checkbox') ? (el.checked ? 'yes' : '') : el.value.trim();
            });
          } else {
            const editor = document.getElementById('frqAnswerEditor');
            answerObj = { essay: (editor ? editor.value : '').trim() };
          }

          // Step 2: Guard — must have content before locking/grading
          const hasAnyText = Object.values(answerObj).some(v => v && v.trim());
          if (!hasAnyText) {
            checkBtn.classList.add('shake');
            const orig = checkBtn.textContent.trim();
            checkBtn.textContent = 'Write something first!';
            setTimeout(() => { checkBtn.classList.remove('shake'); checkBtn.textContent = orig; }, 1500);
            return;
          }

          // Step 3: Lock editors (only after we know there's content)
          checkBtn.disabled = true;
          if (isSAQWire) {
            (q.parts || [{label:'a'},{label:'b'},{label:'c'}]).forEach(p => {
              const el = document.getElementById('frqPartEditor_' + p.label);
              if (!el) return;
              if (el.type === 'checkbox') { el.disabled = true; el.style.opacity = '0.6'; }
              else { el.readOnly = true; el.style.opacity = '0.7'; }
            });
          } else {
            const editor = document.getElementById('frqAnswerEditor');
            if (editor) { editor.readOnly = true; editor.style.opacity = '0.7'; }
          }

          // ── Direct DOM injection (no hidden-div toggling) ─────────────────
          const rawText = Object.values(answerObj).join('\n\n');
          const unitNum = (q.units && q.units[0]) || q.unit || 1;

          // Grade into a temp off-DOM element so we get the HTML without any
          // dependency on a pre-existing hidden div in the live page.
          const tempAnalysisDiv = document.createElement('div');
          const result = dispatchFRQGrade(answerObj, frqType, unitNum, q, tempAnalysisDiv, rawText);
          const earned = result.score.total;
          const isCorrect = earned >= Math.ceil(result.score.max * 0.6);
          const pct = result.score.max > 0 ? Math.round((earned / result.score.max) * 100) : 0;

          // Build score badge + inject analysis, replacing the button container
          const scoreBadge = `<div class="session-feedback ${isCorrect ? 'session-feedback-correct' : 'session-feedback-wrong'}" style="margin-top:12px">
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <span style="font-size:1.6rem;font-weight:800">${earned}/${result.score.max}</span>
              <span style="font-weight:600">${pct}% — ${isCorrect ? '✓ Passing' : '✗ Needs work'}</span>
            </div>
          </div>`;
          const actionsDiv = document.querySelector('.frq-editor-actions');
          if (actionsDiv) {
            const insertEl = document.createElement('div');
            insertEl.innerHTML = scoreBadge + tempAnalysisDiv.innerHTML;
            actionsDiv.replaceWith(insertEl);
            insertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            const wrapEl = document.getElementById('sessionQuestionWrap');
            if (typeof renderMath !== 'undefined' && wrapEl) renderMath(wrapEl);
          }

          // Save state (no full re-render — grade is now live in the DOM)
          if (typeof App !== 'undefined' && App.recordAnswer) App.recordAnswer(q.id, isCorrect);
          sessionAnswerState[q.id] = { answered: true, correct: isCorrect, selectedIndex: -1,
            frqScore: earned, frqAnswerObj: answerObj, frqScoreMax: result.score.max };
          sessionAnswered++;
          if (isCorrect) sessionCorrect++;
          updateSessionHeader();
        });
      } else {
        // Non-auto-graded: lock editors only (no scoring, no panel)
        checkBtn.addEventListener('click', () => {
          checkBtn.style.display = 'none';
          if (q.parts && q.parts.length > 0) {
            (q.parts || []).forEach(p => {
              const el = document.getElementById('frqPartEditor_' + p.label);
              if (!el) return;
              if (el.type === 'checkbox') { el.disabled = true; el.style.opacity = '0.6'; }
              else { el.readOnly = true; el.style.opacity = '0.7'; }
            });
          } else {
            const editor = document.getElementById('frqAnswerEditor');
            if (editor) { editor.readOnly = true; editor.style.opacity = '0.7'; }
          }
          // Do NOT record score — non-auto FRQ questions are unscored
        });
      }
    }

  }

  updateSessionHeader();
}

function submitMCQ(q, selectedIndex) {
  const isCorrect = selectedIndex === q.answer;
  App.recordAnswer(q.id, isCorrect);
  sessionAnswerState[q.id] = { answered: true, correct: isCorrect, selectedIndex };
  sessionAnswered++;
  if (isCorrect) sessionCorrect++;
  renderSessionQuestion();
  updateSessionHeader();
}

function recordFRQResult(isCorrect, frqScore, frqAnswerObj, frqScoreMax) {
  const q = sessionQuestions[sessionIndex];
  App.recordAnswer(q.id, isCorrect);
  sessionAnswerState[q.id] = { answered: true, correct: isCorrect, selectedIndex: -1, frqScore, frqAnswerObj, frqScoreMax };
  sessionAnswered++;
  if (isCorrect) sessionCorrect++;
  renderSessionQuestion();
  updateSessionHeader();
}

// ─── Session: Header & Nav ────────────────────────────────────────────────────
function updateSessionHeader() {
  const total = sessionQuestions.length;
  const num = sessionIndex + 1;

  const counter = document.getElementById('sessionCounter');
  if (counter) counter.textContent = `${num} / ${total}`;

  const footer = document.getElementById('sessionFooterCounter');
  if (footer) footer.textContent = `Question ${num} of ${total}`;

  const bar = document.getElementById('sessionProgressBar');
  if (bar) bar.style.width = `${(num / total) * 100}%`;

  const score = document.getElementById('sessionScore');
  if (score) {
    if (sessionAnswered > 0) {
      const pct = Math.round((sessionCorrect / sessionAnswered) * 100);
      score.textContent = `${sessionCorrect}/${sessionAnswered} · ${pct}%`;
      score.style.color = pct >= 70 ? 'var(--accent-green)' : pct >= 50 ? '#d97706' : 'var(--accent-red)';
    } else {
      score.textContent = '';
    }
  }

  updateSessionNav();
}

function updateSessionNav() {
  const total = sessionQuestions.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = sessionIndex === 0;
  if (nextBtn) {
    if (sessionIndex === total - 1) {
      nextBtn.textContent = 'Finish ✓';
      nextBtn.className = 'btn btn-success session-nav-btn';
    } else {
      nextBtn.textContent = 'Next →';
      nextBtn.className = 'btn btn-primary session-nav-btn';
    }
  }
}

// ─── Setup Listeners ──────────────────────────────────────────────────────────
function wireSetupListeners() {
  // Filter chips
  document.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip || !chip.dataset.filter) return;
    const filter = chip.dataset.filter;
    const val = chip.dataset.value;
    currentFilters[filter] = isNaN(val) || val === 'all' ? val : parseInt(val);
    updateFilterChips();
    applyFilters();
  });

  // Clear topics button
  const clearTopicsBtn = document.getElementById('clearTopics');
  if (clearTopicsBtn) clearTopicsBtn.addEventListener('click', () => {
    currentFilters.topics.clear();
    renderAccordion();
    applyFilters();
  });

  // Sort dropdown
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.addEventListener('change', e => {
    currentSort = e.target.value;
    applyFilters();
  });

  // Clear filters
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);

  // Mobile filter toggle
  const mobileToggle = document.getElementById('mobileFilterToggle');
  const sidebar = document.getElementById('filtersSidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Filter overlay (mobile) — close sidebar when overlay is clicked
  const filterOverlay = document.getElementById('filterOverlay');
  if (filterOverlay && sidebar) {
    filterOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      filterOverlay.classList.add('hidden');
    });
  }

  // Desmos calculator button (can't use inline onclick due to CSP)
  const desmosBtn = document.getElementById('desmosBtn');
  if (desmosBtn) desmosBtn.addEventListener('click', toggleDesmos);
  const desmosClose = document.getElementById('desmos-close');
  if (desmosClose) desmosClose.addEventListener('click', toggleDesmos);

  // Question limit input — update the "ready" count live
  const limitInput = document.getElementById('questionLimitInput');
  if (limitInput) {
    limitInput.addEventListener('input', () => renderPreview());
  }

  // Start session
  const startBtn = document.getElementById('startSessionBtn');
  if (startBtn) startBtn.addEventListener('click', startSession);

  // End session
  const endBtn = document.getElementById('endSessionBtn');
  if (endBtn) endBtn.addEventListener('click', endSession);

  // Prev / Next
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (sessionIndex > 0) { sessionIndex--; renderSessionQuestion(); updateSessionNav(); }
  });

  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (sessionIndex < sessionQuestions.length - 1) {
      sessionIndex++;
      renderSessionQuestion();
      updateSessionNav();
    } else {
      endSession(); // finished last question
    }
  });
}

function clearFilters() {
  currentFilters = { topics: new Set(), difficulty: 'all', type: 'all', status: 'all' };
  currentSort = 'unit-order';
  _activeUnitTab = 'all';
  renderUnitTabs();
  const limitInput = document.getElementById('questionLimitInput');
  if (limitInput) limitInput.value = '';
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.value = 'unit-order';
  renderAccordion();
  renderFilters();
  applyFilters();
}

document.addEventListener('DOMContentLoaded', initQuestionBank);
