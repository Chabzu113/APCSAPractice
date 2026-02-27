#!/usr/bin/env node
/**
 * Convert AP Macro PDF JSON into apmacro_mcq.js and apmacro_frq.js
 * matching the AP Micro schema exactly.
 *
 * Usage: node scripts/convert_apmacro.js /tmp/apmacro_raw.txt
 */

const fs = require('fs');
const path = require('path');

const rawPath = process.argv[2] || '/tmp/apmacro_raw.txt';
const outDir = path.join(__dirname, '..', 'js', 'data');

// ── 1. Read and clean the raw text ──────────────────────────────
let raw = fs.readFileSync(rawPath, 'utf8');

// Remove ALL non-ASCII chars (invisible Unicode, zero-width spaces, etc.)
raw = raw.replace(/[^\x20-\x7E\n\r\t]/g, '');

// Trim every line and remove blanks
let lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

// Remove stray lone quotes (PDF artifacts)
lines = lines.filter(l => l !== '"');

raw = lines.join('\n');

// Remove truncated objects: find { "id": ... that aren't closed before next { "id":
// Strategy: split on object boundaries using regex, parse each individually

// First, merge all arrays: replace ]...[ with ,
raw = raw.replace(/\]\s*\[/g, ',');

// Wrap in array if not already
if (!raw.trim().startsWith('[')) raw = '[' + raw + ']';

// Fix invalid escape sequences
raw = raw.replace(/\\(?!["\\\/bfnrtu])/g, '\\\\');

// Remove trailing commas before ] or }
raw = raw.replace(/,\s*([}\]])/g, '$1');

// Try to parse; if it fails, use object-by-object extraction
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.warn('Direct parse failed, extracting objects individually...');

  // Split into potential objects by finding top-level { ... } pairs
  data = [];
  const objPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
  let match;
  while ((match = objPattern.exec(raw)) !== null) {
    let objStr = match[0];
    // Fix escapes within this object
    objStr = objStr.replace(/\\(?!["\\\/bfnrtu])/g, '\\\\');
    objStr = objStr.replace(/,\s*([}\]])/g, '$1');
    try {
      const obj = JSON.parse(objStr);
      if (obj.id) data.push(obj);
    } catch (err) {
      // Try harder: the object might have arrays inside (options, grading_checklist)
      // Use brace/bracket matching for deeper nesting
    }
  }

  // Second pass: extract objects with nested arrays using balanced matching
  if (data.length < 100) {
    console.warn(`  First pass got ${data.length} objects, trying deeper extraction...`);
    data = [];
    let depth = 0;
    let start = -1;
    let inStr = false;
    let prev = '';

    for (let i = 0; i < raw.length; i++) {
      const c = raw[i];
      if (c === '"' && prev !== '\\') inStr = !inStr;

      if (!inStr) {
        if (c === '{') {
          if (depth === 0) start = i;
          depth++;
        } else if (c === '}') {
          depth--;
          if (depth === 0 && start >= 0) {
            let objStr = raw.substring(start, i + 1);
            objStr = objStr.replace(/,\s*([}\]])/g, '$1');
            try {
              const obj = JSON.parse(objStr);
              if (obj.id) data.push(obj);
            } catch (err) {
              // Skip malformed
            }
            start = -1;
          }
          // Safety: if depth goes negative, something was truncated — reset
          if (depth < 0) depth = 0;
        }
      }
      prev = c;
    }
  }
}

// Deduplicate by id
const seen = new Set();
data = data.filter(q => {
  if (seen.has(q.id)) return false;
  seen.add(q.id);
  return true;
});

console.log(`Parsed ${data.length} total items`);

// ── 2. Split into MCQ and FRQ ───────────────────────────────────
const mcqRaw = data.filter(q => q.options && !q.grading_checklist);
const frqRaw = data.filter(q => q.grading_checklist);

console.log(`MCQ: ${mcqRaw.length}, FRQ: ${frqRaw.length}`);

// ── 3. Transform MCQ ────────────────────────────────────────────
const letterToIndex = { A: 0, B: 1, C: 2, D: 3, E: 4 };

const mcqs = mcqRaw.map(q => {
  // Extract choices: options is {"A": "...", "B": "...", ...}
  const choices = ['A', 'B', 'C', 'D', 'E'].map(letter => {
    let text = (q.options[letter] || '').trim();
    // Strip "A. " prefix if present
    text = text.replace(/^[A-E]\.\s*/, '');
    return text;
  });

  // Convert letter answer to index
  const answerStr = (q.answer || '').trim().toUpperCase();
  const answerIdx = letterToIndex[answerStr];
  if (answerIdx === undefined) {
    console.warn(`  Warning: question ${q.id} has invalid answer "${q.answer}"`);
  }

  return {
    id: q.id,
    subject: 'apmacro',
    unit: q.unit,
    topic: q.topic,
    topicLabel: q.topic,
    difficulty: (q.difficulty || 'medium').toLowerCase(),
    source: 'Generated',
    question: q.prompt,
    choices: choices,
    answer: answerIdx !== undefined ? answerIdx : 0,
    explanation: q.explanation || ''
  };
});

// ── 4. Transform FRQ ────────────────────────────────────────────

// Keyword extraction from grading checklist items
function extractKeywords(desc) {
  // Strip leading "Npt: " prefix
  let text = desc.replace(/^\d+pt:\s*/i, '').trim();

  const kws = [];

  // AP Macro vocabulary (sorted longest-first for greedy matching)
  const vocab = [
    'aggregate demand', 'aggregate supply', 'short-run aggregate supply', 'long-run aggregate supply',
    'production possibilities curve', 'comparative advantage', 'absolute advantage',
    'opportunity cost', 'marginal benefit', 'marginal cost',
    'gross domestic product', 'gdp', 'nominal gdp', 'real gdp', 'gdp deflator',
    'consumer price index', 'cpi', 'inflation rate', 'deflation', 'disinflation',
    'unemployment rate', 'natural rate of unemployment', 'frictional unemployment',
    'structural unemployment', 'cyclical unemployment', 'full employment',
    'business cycle', 'recession', 'expansion', 'peak', 'trough',
    'fiscal policy', 'expansionary fiscal policy', 'contractionary fiscal policy',
    'government spending', 'taxation', 'budget deficit', 'budget surplus', 'national debt',
    'spending multiplier', 'tax multiplier', 'balanced budget multiplier',
    'marginal propensity to consume', 'mpc', 'marginal propensity to save', 'mps',
    'money supply', 'money demand', 'money market', 'nominal interest rate', 'real interest rate',
    'federal funds rate', 'discount rate', 'reserve requirement', 'required reserve ratio',
    'open market operations', 'federal reserve', 'monetary policy',
    'expansionary monetary policy', 'contractionary monetary policy',
    'money multiplier', 'excess reserves', 'required reserves',
    'loanable funds', 'loanable funds market',
    'phillips curve', 'short-run phillips curve', 'long-run phillips curve',
    'stagflation', 'supply shock', 'demand shock',
    'crowding out', 'crowding-out effect',
    'balance of payments', 'current account', 'financial account', 'capital account',
    'exchange rate', 'appreciation', 'depreciation',
    'trade deficit', 'trade surplus', 'net exports',
    'capital inflow', 'capital outflow',
    'tariff', 'quota', 'trade barrier',
    'quantity theory of money',
    'velocity of money',
    'long run', 'short run',
    'price level', 'output', 'real output',
    'inflationary gap', 'recessionary gap',
    'self-correction', 'self-correcting',
    'wages', 'nominal wages', 'real wages',
    'interest rate', 'investment',
    'consumer spending', 'consumption',
    'bond prices', 'bonds',
    'bank balance sheet',
    'demand-pull inflation', 'cost-push inflation'
  ];

  const lower = text.toLowerCase();
  for (const term of vocab) {
    if (lower.includes(term) && !kws.includes(term)) {
      kws.push(term);
    }
  }

  // Extract quoted terms
  const quoted = text.match(/'([^']+)'/g);
  if (quoted) {
    quoted.forEach(m => {
      const t = m.replace(/'/g, '').toLowerCase().trim();
      if (t.length > 1 && !kws.includes(t)) kws.push(t);
    });
  }

  // Extract key noun phrases from "State that X" / "Explain that X"
  const stateMatch = text.match(/(?:State|Explain|Define|Identify)\s+(?:that\s+)?(.+)/i);
  if (stateMatch) {
    const phrase = stateMatch[1].toLowerCase()
      .replace(/[.!?]+$/, '')
      .replace(/\s+/g, ' ')
      .trim();
    // Extract significant words (3+ chars, not articles/prepositions)
    const stopWords = new Set(['the','and','for','are','but','not','you','all','can','has','her','was','one','our','out','its','with','that','this','from','they','been','have','will','each','make','like','into','over','such','than','them','then','more','some','what','when','also','after','how','who','may']);
    const words = phrase.split(/\s+/).filter(w => w.length >= 3 && !stopWords.has(w));
    // Take key 2-3 word phrases
    if (words.length >= 2) {
      const shortPhrase = words.slice(0, 4).join(' ');
      if (!kws.includes(shortPhrase) && shortPhrase.length > 5) {
        kws.push(shortPhrase);
      }
    }
  }

  // Fallback: if no keywords found, extract significant words
  if (kws.length === 0) {
    const words = lower.split(/\s+/).filter(w => w.length >= 4);
    kws.push(...words.slice(0, 3));
  }

  return kws.slice(0, 8);
}

function deriveSkill(desc) {
  const lower = desc.toLowerCase();
  if (/\b(graph|draw|label|axes|curve|shift|diagram|plot|show.*curve)\b/.test(lower)) return 'graph';
  if (/\b(calculate|compute|find the value|determine the number|how much|what is the value)\b/.test(lower)) return 'calculate';
  if (/\b(explain|why|because|reason|justify)\b/.test(lower)) return 'explain';
  return 'describe';
}

const frqs = frqRaw.map(q => {
  const rubric = (q.grading_checklist || []).map((desc, i) => {
    // Extract points from "Npt:" prefix
    const ptMatch = desc.match(/^(\d+)pt:/i);
    const points = ptMatch ? parseInt(ptMatch[1]) : 1;

    return {
      points: points,
      description: desc.trim(),
      skill: deriveSkill(desc),
      keywords: extractKeywords(desc),
      partLabel: derivePartLabel(desc, i, q.grading_checklist)
    };
  });

  return {
    id: q.id,
    subject: 'apmacro',
    units: [q.unit],
    topic: q.topic,
    topicLabel: q.topic,
    title: q.topic,
    difficulty: (q.difficulty || 'medium').toLowerCase(),
    source: 'Generated',
    frqType: 'short',
    prompt: q.prompt,
    parts: [],
    rubric: rubric,
    autoGraded: true
  };
});

function derivePartLabel(desc, index, allChecklist) {
  const lower = desc.toLowerCase();
  // Graph items
  if (/\b(graph|draw|label|axes|curve|diagram|plot)\b/.test(lower) && /correct/i.test(lower)) {
    return 'graph';
  }

  // Try to extract (a), (b), (c) from the prompt
  // Map by index: first few items go to 'a', then 'b', etc.
  // For macro FRQs with (a)(b)(c) structure, use the part letter
  const partMatch = desc.match(/\(([a-z])\)/);
  if (partMatch) return partMatch[1];

  // Default alphabetical assignment based on position
  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  return letters[Math.min(index, letters.length - 1)];
}

// ── 5. Write MCQ file ───────────────────────────────────────────
const mcqContent = 'var APMACRO_MCQ = ' + JSON.stringify(mcqs, null, 2) + ';\n';
const mcqPath = path.join(outDir, 'apmacro_mcq.js');
fs.writeFileSync(mcqPath, mcqContent);
console.log(`Wrote ${mcqs.length} MCQs to ${mcqPath}`);

// ── 6. Write FRQ file ───────────────────────────────────────────
const frqContent = 'var APMACRO_FRQ = ' + JSON.stringify(frqs, null, 2) + ';\n';
const frqPath = path.join(outDir, 'apmacro_frq.js');
fs.writeFileSync(frqPath, frqContent);
console.log(`Wrote ${frqs.length} FRQs to ${frqPath}`);

// ── 7. Stats ────────────────────────────────────────────────────
const unitCounts = {};
mcqs.forEach(q => { unitCounts[q.unit] = (unitCounts[q.unit] || 0) + 1; });
console.log('\nMCQ per unit:', unitCounts);

const frqUnitCounts = {};
frqs.forEach(q => { frqUnitCounts[q.units[0]] = (frqUnitCounts[q.units[0]] || 0) + 1; });
console.log('FRQ per unit:', frqUnitCounts);

// Keywords stats
let totalKw = 0, weakCount = 0;
frqs.forEach(q => {
  q.rubric.forEach(r => {
    totalKw += r.keywords.length;
    if (r.keywords.length < 2) weakCount++;
  });
});
const totalRubric = frqs.reduce((s, q) => s + q.rubric.length, 0);
console.log(`\nFRQ rubric items: ${totalRubric}`);
console.log(`Avg keywords/item: ${(totalKw / totalRubric).toFixed(1)}`);
console.log(`Weak items (<2 keywords): ${weakCount}/${totalRubric}`);
