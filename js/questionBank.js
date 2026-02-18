// AP CS A Question Bank — Filter, Sort, Render

const UNIT_TOPICS = {
  1: [
    { value: '1.1', label: '1.1 Introduction to Algorithms' },
    { value: '1.2', label: '1.2 Variables and Data Types' },
    { value: '1.3', label: '1.3 Expressions and Output' },
    { value: '1.4', label: '1.4 Assignment Statements and Input' },
    { value: '1.5', label: '1.5 Casting and Range of Variables' },
    { value: '1.6', label: '1.6 Compound Assignment Operators' },
    { value: '1.7', label: '1.7 API and Libraries' },
    { value: '1.8', label: '1.8 Documentation with Comments' },
    { value: '1.9', label: '1.9 Method Signatures' },
    { value: '1.10', label: '1.10 Calling Class Methods' },
    { value: '1.11', label: '1.11 Math Class' },
    { value: '1.12', label: '1.12 Objects: Instances of Classes' },
    { value: '1.13', label: '1.13 Object Creation and Storage' },
    { value: '1.14', label: '1.14 Calling Instance Methods' },
    { value: '1.15', label: '1.15 String Manipulation' }
  ],
  2: [
    { value: '2.1', label: '2.1 Algorithms with Selection and Repetition' },
    { value: '2.2', label: '2.2 Boolean Expressions' },
    { value: '2.3', label: '2.3 if Statements' },
    { value: '2.4', label: '2.4 Nested if Statements' },
    { value: '2.5', label: '2.5 Compound Boolean Expressions' },
    { value: '2.6', label: '2.6 Comparing Boolean Expressions' },
    { value: '2.7', label: '2.7 while Loops' },
    { value: '2.8', label: '2.8 for Loops' },
    { value: '2.9', label: '2.9 Implementing Selection and Iteration Algorithms' },
    { value: '2.10', label: '2.10 Implementing String Algorithms' },
    { value: '2.11', label: '2.11 Nested Iteration' },
    { value: '2.12', label: '2.12 Informal Run-Time Analysis' }
  ],
  3: [
    { value: '3.1', label: '3.1 Abstraction and Program Design' },
    { value: '3.2', label: '3.2 Impact of Program Design' },
    { value: '3.3', label: '3.3 Anatomy of a Class' },
    { value: '3.4', label: '3.4 Constructors' },
    { value: '3.5', label: '3.5 Methods: How to Write Them' },
    { value: '3.6', label: '3.6 Methods: Passing and Returning References' },
    { value: '3.7', label: '3.7 Class Variables and Methods' },
    { value: '3.8', label: '3.8 Scope and Access' },
    { value: '3.9', label: '3.9 this Keyword' }
  ],
  4: [
    { value: '4.1', label: '4.1 Ethical and Social Issues Around Data Collection' },
    { value: '4.2', label: '4.2 Introduction to Using Data Sets' },
    { value: '4.3', label: '4.3 Array Creation and Access' },
    { value: '4.4', label: '4.4 Array Traversals' },
    { value: '4.5', label: '4.5 Implementing Array Algorithms' },
    { value: '4.6', label: '4.6 Using Text Files' },
    { value: '4.7', label: '4.7 Wrapper Classes' },
    { value: '4.8', label: '4.8 ArrayList Methods' },
    { value: '4.9', label: '4.9 ArrayList Traversals' },
    { value: '4.10', label: '4.10 Implementing ArrayList Algorithms' },
    { value: '4.11', label: '4.11 2D Array Creation and Access' },
    { value: '4.12', label: '4.12 2D Array Traversals' },
    { value: '4.13', label: '4.13 Implementing 2D Array Algorithms' },
    { value: '4.14', label: '4.14 Searching Algorithms' },
    { value: '4.15', label: '4.15 Sorting Algorithms' },
    { value: '4.16', label: '4.16 Recursion' },
    { value: '4.17', label: '4.17 Recursive Searching and Sorting' }
  ]
};

const UNIT_NAMES = {
  1: 'Using Objects and Methods',
  2: 'Selection and Iteration',
  3: 'Class Creation',
  4: 'Data Collections'
};

// ─── State ────────────────────────────────────────────────────────────────────
let currentFilters = { unit: 'all', topic: 'all', difficulty: 'all', type: 'all', status: 'all' };
let currentSort = 'unit-order';
let currentPage = 1;
const QUESTIONS_PER_PAGE = 15;
let allQuestions = [];
let filteredQuestions = [];

// ─── Init ─────────────────────────────────────────────────────────────────────
function initQuestionBank() {
  // Merge all question arrays
  allQuestions = [
    ...(typeof MCQ_U1U2 !== 'undefined' ? MCQ_U1U2 : []),
    ...(typeof MCQ_U3U4 !== 'undefined' ? MCQ_U3U4 : []),
    ...(typeof FRQ_BANK !== 'undefined' ? FRQ_BANK.map(f => ({ ...f, type: 'FRQ' })) : [])
  ];

  // Pre-set filters from URL params
  const urlUnit = App.getUrlParam('unit');
  const urlTopic = App.getUrlParam('topic');
  const urlDiff = App.getUrlParam('difficulty');
  if (urlUnit && urlUnit !== 'all') currentFilters.unit = parseInt(urlUnit);
  if (urlTopic) currentFilters.topic = urlTopic;
  if (urlDiff) currentFilters.difficulty = urlDiff;

  renderFilters();
  applyFilters();
  wireEventListeners();
}

// ─── Filter Logic ─────────────────────────────────────────────────────────────
function applyFilters() {
  filteredQuestions = allQuestions.filter(q => {
    if (currentFilters.unit !== 'all' && q.unit !== parseInt(currentFilters.unit)) return false;
    if (currentFilters.topic !== 'all' && q.topic !== currentFilters.topic) return false;
    if (currentFilters.difficulty !== 'all' && q.difficulty !== currentFilters.difficulty) return false;
    if (currentFilters.type !== 'all' && q.type !== currentFilters.type) return false;
    if (currentFilters.status !== 'all') {
      const status = App.getQuestionStatus(q.id);
      if (status !== currentFilters.status) return false;
    }
    return true;
  });

  // Sort
  if (currentSort === 'difficulty-asc') {
    const order = { easy: 0, medium: 1, hard: 2 };
    filteredQuestions.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
  } else if (currentSort === 'difficulty-desc') {
    const order = { easy: 0, medium: 1, hard: 2 };
    filteredQuestions.sort((a, b) => (order[b.difficulty] || 0) - (order[a.difficulty] || 0));
  } else if (currentSort === 'random') {
    filteredQuestions = App.shuffle(filteredQuestions);
  }
  // default: unit-order (already in order by id)

  currentPage = 1;
  renderQuestions();
}

// ─── Render Filters ───────────────────────────────────────────────────────────
function renderFilters() {
  // Unit chips
  const unitFilter = document.getElementById('unitChips');
  if (unitFilter) {
    const unitOptions = [{ value: 'all', label: 'All Units' },
      { value: 1, label: 'Unit 1' }, { value: 2, label: 'Unit 2' },
      { value: 3, label: 'Unit 3' }, { value: 4, label: 'Unit 4' }];
    unitFilter.innerHTML = unitOptions.map(o =>
      `<button class="filter-chip${currentFilters.unit == o.value ? ' active' : ''}" data-filter="unit" data-value="${o.value}">${o.label}</button>`
    ).join('');
  }

  // Topic dropdown
  updateTopicDropdown(currentFilters.unit);

  // Difficulty chips
  const diffFilter = document.getElementById('diffChips');
  if (diffFilter) {
    [{ v: 'all', l: 'All' }, { v: 'easy', l: 'Easy' }, { v: 'medium', l: 'Medium' }, { v: 'hard', l: 'Hard' }].forEach(o => {
      const btn = diffFilter.querySelector(`[data-value="${o.v}"]`);
      if (btn) btn.className = `filter-chip${currentFilters.difficulty === o.v ? ' active' : ''}`;
    });
    if (!diffFilter.children.length) {
      diffFilter.innerHTML = [{ v: 'all', l: 'All' }, { v: 'easy', l: 'Easy' }, { v: 'medium', l: 'Medium' }, { v: 'hard', l: 'Hard' }]
        .map(o => `<button class="filter-chip${currentFilters.difficulty === o.v ? ' active' : ''}" data-filter="difficulty" data-value="${o.v}">${o.l}</button>`).join('');
    }
  }

  // Type chips
  const typeFilter = document.getElementById('typeChips');
  if (typeFilter && !typeFilter.children.length) {
    typeFilter.innerHTML = [{ v: 'all', l: 'All' }, { v: 'MCQ', l: 'MCQ' }, { v: 'FRQ', l: 'FRQ' }]
      .map(o => `<button class="filter-chip${currentFilters.type === o.v ? ' active' : ''}" data-filter="type" data-value="${o.v}">${o.l}</button>`).join('');
  }

  // Status chips
  const statusFilter = document.getElementById('statusChips');
  if (statusFilter && !statusFilter.children.length) {
    statusFilter.innerHTML = [{ v: 'all', l: 'All' }, { v: 'unseen', l: 'Unseen' }, { v: 'correct', l: 'Correct' }, { v: 'incorrect', l: 'Incorrect' }]
      .map(o => `<button class="filter-chip${currentFilters.status === o.v ? ' active' : ''}" data-filter="status" data-value="${o.v}">${o.l}</button>`).join('');
  }
}

function updateTopicDropdown(unit) {
  const topicSelect = document.getElementById('topicSelect');
  if (!topicSelect) return;
  const topics = unit !== 'all' ? (UNIT_TOPICS[parseInt(unit)] || []) : [];
  topicSelect.innerHTML = '<option value="all">All Topics</option>' +
    topics.map(t => `<option value="${t.value}"${currentFilters.topic === t.value ? ' selected' : ''}>${t.label}</option>`).join('');
  topicSelect.disabled = unit === 'all';
}

function updateFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(btn => {
    const filter = btn.dataset.filter;
    const val = btn.dataset.value;
    if (!filter) return;
    const cur = String(currentFilters[filter]);
    btn.classList.toggle('active', cur === String(val));
  });
}

// ─── Render Questions ─────────────────────────────────────────────────────────
function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  const countEl = document.getElementById('resultsCount');
  if (!container) return;

  const start = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const pageQ = filteredQuestions.slice(start, end);

  if (countEl) countEl.textContent = `Showing ${filteredQuestions.length} question${filteredQuestions.length !== 1 ? 's' : ''}`;

  if (filteredQuestions.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center;padding:48px;color:var(--text-muted)">
      <div style="font-size:2rem;margin-bottom:12px">🔍</div>
      <p>No questions match your filters.</p>
      <button class="btn btn-secondary" onclick="clearFilters()" style="margin-top:12px">Clear Filters</button>
    </div>`;
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  container.innerHTML = pageQ.map(q => renderQuestionCard(q)).join('');
  renderPagination();

  // Wire submit buttons
  container.querySelectorAll('.mcq-submit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const selected = container.querySelector(`input[name="choice_${qid}"]:checked`);
      if (!selected) { alert('Please select an answer.'); return; }
      handleMCQSubmit(qid, parseInt(selected.value), btn);
    });
  });

  container.querySelectorAll('.frq-show-rubric-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const rubricEl = document.getElementById(`frqRubric_${qid}`);
      if (rubricEl) rubricEl.classList.toggle('hidden');
      btn.textContent = rubricEl && rubricEl.classList.contains('hidden') ? 'Show Answer & Rubric' : 'Hide Rubric';
    });
  });
}

function renderQuestionCard(q) {
  const status = App.getQuestionStatus(q.id);
  const isFRQ = q.type === 'FRQ';
  const statusDot = { unseen: '⬜', correct: '✅', incorrect: '❌' }[status] || '⬜';

  const choicesHtml = !isFRQ ? (q.choices || []).map((c, ci) =>
    `<label class="choice-item" style="cursor:pointer">
      <input type="radio" name="choice_${q.id}" value="${ci}" style="display:none">
      <span class="choice-label">${String.fromCharCode(65+ci)})</span>
      <span>${App.escapeHtml(String(c))}</span>
    </label>`).join('') : '';

  const frqPartsHtml = isFRQ ? `
    <div class="answer-feedback" id="frqRubric_${q.id}" style="display:none">
      <p><strong>FRQ Type:</strong> ${q.type || ''}</p>
      ${(q.parts || []).map(p => `<p><strong>Part (${p.label}):</strong> ${App.escapeHtml(p.instruction)} <em>(${p.points} pts)</em></p>`).join('')}
      <details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600">Scoring Rubric</summary>
        <ul style="margin-top:8px;padding-left:20px">${(q.rubric || []).map(r => `<li>${App.escapeHtml(r.description)} (${r.points} pt)</li>`).join('')}</ul>
      </details>
      ${q.sampleSolution ? `<details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600">Sample Solution</summary>${App.renderCode(q.sampleSolution)}</details>` : ''}
    </div>` : '';

  return `
    <div class="card question-card" id="qcard_${q.id}">
      <div class="question-card-header">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <span class="badge badge-unit">Unit ${q.unit}${q.topic ? ' · ' + q.topic : ''}</span>
          <span class="badge badge-${q.difficulty || 'medium'}">${q.difficulty || 'medium'}</span>
          <span class="badge badge-${q.type === 'FRQ' ? 'frq' : 'mcq'}">${q.type || 'MCQ'}</span>
          ${q.source && q.source !== 'original' ? `<span class="badge" style="background:var(--bg-secondary);color:var(--text-muted)">${q.source}</span>` : ''}
        </div>
        <span title="${status}">${statusDot}</span>
      </div>
      <div class="question-text">${App.escapeHtml(q.question || q.prompt || '')}</div>
      ${q.isCode && q.code ? App.renderCode(q.code) : ''}
      ${q.starterCode ? `<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">Given code:</p>${App.renderCode(q.starterCode)}` : ''}
      ${!isFRQ ? `<div class="choices-list" id="choices_${q.id}">${choicesHtml}</div>
        <div style="margin-top:14px"><button class="btn btn-primary btn-sm mcq-submit-btn" data-qid="${q.id}">Submit</button></div>
        <div class="answer-feedback hidden" id="feedback_${q.id}"></div>`
      : `<button class="btn btn-secondary btn-sm frq-show-rubric-btn" data-qid="${q.id}" style="margin-top:8px">Show Answer & Rubric</button>
        ${frqPartsHtml}`}
    </div>`;
}

// ─── Answer Handling ──────────────────────────────────────────────────────────
function handleMCQSubmit(questionId, selectedIndex, btn) {
  const q = allQuestions.find(q => q.id === questionId);
  if (!q) return;
  const isCorrect = selectedIndex === q.answer;
  App.recordAnswer(questionId, isCorrect);

  // Style choices
  const choicesEl = document.getElementById(`choices_${questionId}`);
  if (choicesEl) {
    choicesEl.querySelectorAll('.choice-item').forEach((item, ci) => {
      if (ci === q.answer) item.classList.add('correct');
      else if (ci === selectedIndex) item.classList.add('incorrect');
      // Disable inputs
      const inp = item.querySelector('input');
      if (inp) inp.disabled = true;
    });
  }

  // Show feedback
  const feedbackEl = document.getElementById(`feedback_${questionId}`);
  if (feedbackEl) {
    feedbackEl.classList.remove('hidden');
    feedbackEl.style.display = '';
    feedbackEl.innerHTML = `
      <p style="font-weight:700;color:${isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'};margin-bottom:8px">
        ${isCorrect ? '✓ Correct!' : '✗ Incorrect — The correct answer was ' + String.fromCharCode(65 + q.answer) + ')'}
      </p>
      <p class="explanation-text"><strong>Explanation:</strong> ${App.escapeHtml(q.explanation || '')}</p>`;
  }

  // Update status dot
  const card = document.getElementById(`qcard_${questionId}`);
  if (card) {
    const dot = card.querySelector('.question-card-header span:last-child');
    if (dot) dot.textContent = isCorrect ? '✅' : '❌';
  }

  // Disable submit button
  btn.disabled = true;
  btn.textContent = isCorrect ? '✓ Correct' : '✗ Incorrect';
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function renderPagination() {
  const el = document.getElementById('pagination');
  if (!el) return;
  const total = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  if (total <= 1) { el.innerHTML = ''; return; }

  let html = '';
  if (currentPage > 1) html += `<button class="page-btn" onclick="goToPage(${currentPage-1})">‹</button>`;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - currentPage) <= 2) {
      html += `<button class="page-btn${i === currentPage ? ' active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 3) {
      html += `<span style="padding:0 4px;color:var(--text-muted)">…</span>`;
    }
  }
  if (currentPage < total) html += `<button class="page-btn" onclick="goToPage(${currentPage+1})">›</button>`;
  el.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderQuestions();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
function wireEventListeners() {
  // Filter chips (delegated)
  document.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip || !chip.dataset.filter) return;
    const filter = chip.dataset.filter;
    const val = chip.dataset.value;
    currentFilters[filter] = isNaN(val) || val === 'all' ? val : parseInt(val);
    if (filter === 'unit') {
      currentFilters.topic = 'all';
      updateTopicDropdown(val);
    }
    updateFilterChips();
    applyFilters();
  });

  // Topic dropdown
  const topicSel = document.getElementById('topicSelect');
  if (topicSel) topicSel.addEventListener('change', e => {
    currentFilters.topic = e.target.value;
    applyFilters();
  });

  // Sort dropdown
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.addEventListener('change', e => {
    currentSort = e.target.value;
    applyFilters();
  });

  // Clear all filters
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);

  // Mobile filter toggle
  const mobileToggle = document.getElementById('mobileFilterToggle');
  const sidebar = document.getElementById('filtersSidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

function clearFilters() {
  currentFilters = { unit: 'all', topic: 'all', difficulty: 'all', type: 'all', status: 'all' };
  currentSort = 'unit-order';
  renderFilters();
  applyFilters();
}

document.addEventListener('DOMContentLoaded', initQuestionBank);
