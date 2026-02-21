// AP Practice — Question Bank (multi-subject)

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
        type: q.type || (isFRQ ? 'FRQ' : 'MCQ'),
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
function renderFilters() {
  const diffFilter = document.getElementById('diffChips');
  if (diffFilter) {
    [{ v: 'all', l: 'All' }, { v: 'easy', l: '🟢 Easy' }, { v: 'medium', l: '🟡 Medium' }, { v: 'hard', l: '🔴 Hard' }].forEach(o => {
      const btn = diffFilter.querySelector(`[data-value="${o.v}"]`);
      if (btn) btn.className = `filter-chip${currentFilters.difficulty === o.v ? ' active' : ''}`;
    });
  }
  const typeFilter = document.getElementById('typeChips');
  if (typeFilter) {
    [{ v: 'all', l: 'All' }, { v: 'MCQ', l: 'MCQ' }, { v: 'FRQ', l: 'FRQ' }].forEach(o => {
      const btn = typeFilter.querySelector(`[data-value="${o.v}"]`);
      if (btn) btn.className = `filter-chip${currentFilters.type === o.v ? ' active' : ''}`;
    });
  }
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
      } else {
        topics.forEach(t => currentFilters.topics.delete(t.value));
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
      html += `<p class="frq-prompt-text">${textBuffer.map(l => App.escapeHtml(l)).join('<br>')}</p>`;
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
  const isFRQ = q.type === 'FRQ';
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
    // MCQ: plain text, escape properly
    questionHtml = `<div class="session-question-text">${safeText(q.question || '')}</div>`;
  }

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
      // Choice text: may contain code snippets — render inline code with monospace
      const choiceText = String(c).replace(/\n/g, ' ');
      const isCodeChoice = /[{};=()]/.test(choiceText) && choiceText.length < 80;
      const renderedChoice = isCodeChoice
        ? `<code style="font-family:monospace;font-size:0.9em">${App.escapeHtml(choiceText)}</code>`
        : App.escapeHtml(choiceText);

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
        <p class="feedback-body">${App.escapeHtml(q.explanation || '')}</p>
      </div>` : '';

    bodyHtml = `<div class="choices-list" id="sessionChoices">${choicesHtml}</div>${submitBtn}${feedbackHtml}`;

  } else {
    // ── FRQ ──
    const totalPts = (q.rubric || []).reduce((s, r) => s + (r.points || 0), 0);

    const partsHtml = (q.parts || []).map(p =>
      `<div class="frq-part-card">
        <div class="frq-part-header">
          <span class="frq-part-label">Part (${p.label})</span>
          <span class="frq-part-pts">${p.points} pt${p.points !== 1 ? 's' : ''}</span>
        </div>
        <p class="frq-part-instruction">${App.escapeHtml(p.instruction)}</p>
      </div>`
    ).join('');

    if (!state) {
      // ── Not yet answered: show editor + "Check Answer" button ──
      bodyHtml = `
        ${partsHtml}

        <!-- Answer Editor -->
        <div class="frq-editor-section">
          <div class="frq-editor-header">
            <span class="frq-section-label">Your answer (Java code):</span>
            <span style="font-size:0.8rem;color:var(--text-muted)">${totalPts} points total</span>
          </div>
          <textarea id="frqAnswerEditor" class="frq-code-editor" placeholder="// Write your Java solution here..."></textarea>
          <div class="frq-editor-actions">
            <button class="btn btn-primary" id="frqCheckAnswer">
              Check My Answer
            </button>
          </div>
        </div>

        <!-- Rubric Grading (hidden until Check is clicked) -->
        <div id="frqGradingSection" class="hidden" style="margin-top:20px">
          <!-- Sample Solution -->
          ${q.sampleSolution ? `<div style="margin-bottom:20px">
            <p class="frq-section-label">Sample Solution:</p>
            ${App.renderCode(q.sampleSolution)}
          </div>` : ''}

          <!-- Rubric Checklist -->
          <div class="frq-rubric-grader">
            <div class="frq-rubric-grader-header">
              <p style="font-weight:700;font-size:1rem;margin:0">Grade Your Answer</p>
              <p style="color:var(--text-muted);font-size:0.85rem;margin:4px 0 0">Check each rubric point your answer earns:</p>
            </div>
            <div class="frq-rubric-checklist" id="rubricChecklist">
              ${(q.rubric || []).map((r, ri) => `
                <label class="rubric-check-row" data-idx="${ri}" data-pts="${r.points}">
                  <input type="checkbox" class="rubric-checkbox" data-pts="${r.points}">
                  <span class="rubric-check-desc">${App.escapeHtml(r.description)}</span>
                  <span class="rubric-check-pts">${r.points} pt</span>
                </label>
              `).join('')}
            </div>
            <div class="frq-rubric-score-bar">
              <span>Your score:</span>
              <span id="frqLiveScore" class="frq-live-score">0 / ${totalPts}</span>
            </div>
            <button class="btn btn-primary" id="frqSubmitScore" style="width:100%;margin-top:12px">
              Submit Score
            </button>
          </div>
        </div>`;
    } else {
      // ── Already answered: show result ──
      const score = state.frqScore != null ? state.frqScore : (state.correct ? totalPts : 0);
      const pct = totalPts > 0 ? Math.round((score / totalPts) * 100) : 0;
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
                <span>${App.escapeHtml(r.description)}</span>
                <span class="rubric-pts">${r.points} pt</span>
              </li>`).join('')}</ul>
          </div>
        </div>`;
    }
  }

  wrap.innerHTML = `
    <div class="session-question-card">
      ${headerHtml}
      ${questionHtml}
      ${codeHtml}
      ${starterHtml}
      <div class="session-answer-area">${bodyHtml}</div>
    </div>`;

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
    const totalPtsForWire = (q.rubric || []).reduce((s, r) => s + (r.points || 0), 0);

    // "Check My Answer" reveals rubric grader
    const checkBtn = document.getElementById('frqCheckAnswer');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        document.getElementById('frqGradingSection').classList.remove('hidden');
        checkBtn.style.display = 'none';
        // Make editor read-only
        const editor = document.getElementById('frqAnswerEditor');
        if (editor) { editor.readOnly = true; editor.style.opacity = '0.7'; }
      });
    }

    // Live score updating from rubric checkboxes
    const checklist = document.getElementById('rubricChecklist');
    const liveScore = document.getElementById('frqLiveScore');
    if (checklist && liveScore) {
      checklist.addEventListener('change', () => {
        let earned = 0;
        checklist.querySelectorAll('.rubric-checkbox:checked').forEach(cb => {
          earned += parseInt(cb.dataset.pts) || 0;
        });
        liveScore.textContent = `${earned} / ${totalPtsForWire}`;
        const pct = totalPtsForWire > 0 ? earned / totalPtsForWire : 0;
        liveScore.style.color = pct >= 0.6 ? 'var(--accent-green)' : pct >= 0.4 ? '#d97706' : 'var(--accent-red)';
      });
    }

    // Submit final score
    const submitScoreBtn = document.getElementById('frqSubmitScore');
    if (submitScoreBtn) {
      submitScoreBtn.addEventListener('click', () => {
        let earned = 0;
        (checklist || document).querySelectorAll('.rubric-checkbox:checked').forEach(cb => {
          earned += parseInt(cb.dataset.pts) || 0;
        });
        const isCorrect = earned >= Math.ceil(totalPtsForWire * 0.6);
        recordFRQResult(isCorrect, earned);
      });
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

function recordFRQResult(isCorrect, frqScore) {
  const q = sessionQuestions[sessionIndex];
  App.recordAnswer(q.id, isCorrect);
  sessionAnswerState[q.id] = { answered: true, correct: isCorrect, selectedIndex: -1, frqScore };
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
