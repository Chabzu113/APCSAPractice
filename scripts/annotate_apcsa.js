#!/usr/bin/env node
/**
 * annotate_apcsa.js  (v2 — improved keyword extraction)
 *
 * Adds auto-grading metadata to every FRQ question in js/data/frq.js.
 * Keywords combine description pattern matching with sample solution analysis
 * to produce problem-specific identifiers (not just generic Java constructs).
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'js', 'data', 'frq.js');
const src = fs.readFileSync(FILE, 'utf8');

// ── Parse FRQ_BANK ───────────────────────────────────────────────────────────
const match = src.match(/^var FRQ_BANK\s*=\s*(\[[\s\S]*\])\s*;?\s*$/m);
if (!match) { console.error('Could not parse FRQ_BANK array'); process.exit(1); }
let bank;
try { bank = eval('(' + match[1] + ')'); }
catch(e) { console.error('Eval failed:', e.message); process.exit(1); }
console.log(`Loaded ${bank.length} questions`);

// ── Split sample solution by part ────────────────────────────────────────────
function splitSolutionByPart(solution, parts) {
  if (!solution) return { a: '' };
  if (!parts || parts.length <= 1) return { a: solution };
  const result = {};
  const partRegex = /\/\/\s*Part\s*\((\w)\)/gi;
  let matches = [], m;
  while ((m = partRegex.exec(solution)) !== null) {
    matches.push({ label: m[1].toLowerCase(), index: m.index });
  }
  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end = i + 1 < matches.length ? matches[i + 1].index : solution.length;
      result[matches[i].label] = solution.slice(start, end);
    }
  } else {
    // If no "// Part" markers, try to split by method definitions
    // Assign whole solution to each part as fallback
    parts.forEach(p => { result[p.label] = solution; });
  }
  return result;
}

// ── Extract identifiers from code snippet ────────────────────────────────────
function extractIdentifiers(code) {
  const ids = new Set();
  const javaKeywords = new Set(['public','private','static','void','int','double','boolean','String',
    'char','float','long','byte','short','class','interface','extends','implements','abstract',
    'final','new','return','if','else','for','while','do','switch','case','break','continue',
    'try','catch','throw','throws','import','package','true','false','null','this','super']);
  // Common noise words to exclude (from comments, method signatures, etc.)
  const noise = new Set(['Part','TODO','YOUR','CODE','HERE','Precondition','to','be','implemented','in','part','the']);

  // Strip comments before extracting identifiers
  const stripped = code.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

  const wordMatches = stripped.match(/\b[a-zA-Z_]\w*\b/g) || [];
  wordMatches.forEach(w => {
    if (!javaKeywords.has(w) && !noise.has(w) && w.length > 1) ids.add(w);
  });
  return ids;
}

// ── Extract method calls from code ───────────────────────────────────────────
function extractMethodCalls(code) {
  const calls = new Set();
  const regex = /\.(\w+)\s*\(/g;
  let m;
  while ((m = regex.exec(code)) !== null) {
    calls.add('.' + m[1] + '(');
  }
  // Also standalone function calls
  const regex2 = /\b(\w+)\s*\(/g;
  while ((m = regex2.exec(code)) !== null) {
    if (m[1].length > 2 && !['for', 'if', 'while', 'new', 'int', 'String', 'double', 'boolean', 'char'].includes(m[1])) {
      calls.add(m[1] + '(');
    }
  }
  return calls;
}

// ── Extract specific expressions from code ───────────────────────────────────
function extractExpressions(code) {
  const exprs = [];
  // Array access patterns like targets[i] or board[r][c]
  const arrAccess = code.match(/\w+\[\w+\]/g) || [];
  arrAccess.forEach(a => exprs.push(a.replace(/\s/g, '')));
  // Comparisons like val > 0, t > min, n <= 1
  const comparisons = code.match(/\w+\s*[><=!]+\s*\w+/g) || [];
  comparisons.forEach(c => exprs.push(c.trim()));
  // Accumulation patterns like sum += t
  const accum = code.match(/\w+\s*[+\-*\/]?=\s*\w+/g) || [];
  accum.forEach(a => exprs.push(a.trim()));
  // Return expressions like return sum, return true, return -1
  const returns = code.match(/return\s+[^;]+/g) || [];
  returns.forEach(r => exprs.push(r.trim()));
  return exprs;
}

// ── Generate keywords for a rubric item ──────────────────────────────────────
function generateKeywords(desc, partCode, fullCode, q) {
  const kw = [];
  const d = desc.toLowerCase();
  const code = partCode || fullCode;
  const partIds = extractIdentifiers(code);
  const partCalls = extractMethodCalls(code);
  const partExprs = extractExpressions(code);

  // ─── 1. Description-based generic keywords ───
  // Loops
  if (d.includes('accesses each element') || d.includes('iterates through') ||
      d.includes('iterates over') || d.includes('traverses all') ||
      d.includes('loops over') || d.includes('loops ') || d.includes('loop')) {
    kw.push('for');
    // Try to identify WHAT is being iterated — extract collection name from description
    const iterMatch = d.match(/(?:of|through|over)\s+(?:the\s+)?(?:all\s+)?(\w+)/);
    if (iterMatch) {
      const collName = iterMatch[1];
      // Find matching identifier in code
      for (const id of partIds) {
        if (id.toLowerCase() === collName.toLowerCase() ||
            id.toLowerCase().includes(collName.toLowerCase())) {
          kw.push(id);
          break;
        }
      }
    }
  }

  // Returns — extract what is returned from both description and code
  if (d.includes('returns ')) {
    kw.push('return');
    // Try to get the specific return value from description
    if (d.includes('returns correct sum') || d.includes('returns the sum') || d.includes('returns correct column sum')) {
      kw.push('sum');
    }
    if (d.includes('returns correct count') || d.includes('returns correct number') || d.includes('returns list size')) {
      kw.push('count');
    }
    if (d.includes('returns false')) kw.push('false');
    if (d.includes('returns true')) kw.push('true');
    if (d.includes('returns -1') || d.includes('or -1')) kw.push('-1');
    if (d.includes('returns correct average') || d.includes('returns correct format') || d.includes('returns the new') || d.includes('returns correct')) {
      // Find first return expression in code
      const retMatch = code.match(/return\s+([^;]+)/);
      if (retMatch) {
        const retExpr = retMatch[1].trim();
        // Use a short identifier from the return expression
        const retIds = retExpr.match(/\b[a-zA-Z_]\w*\b/g) || [];
        for (const rid of retIds) {
          if (rid.length > 2 && !['new', 'int', 'this', 'null', 'true', 'false'].includes(rid)) {
            kw.push(rid);
            break;
          }
        }
      }
    }
    if (d.includes('returns the array') || d.includes('returns the new array')) {
      // Find the result variable name
      for (const id of partIds) {
        if (id.toLowerCase().includes('result') || id.toLowerCase().includes('res') || id.toLowerCase() === 'path') {
          kw.push(id);
          break;
        }
      }
    }
  }

  // Comparisons
  if (d.includes('using >') || d.includes('> 0') || d.includes('strictly greater') ||
      d.includes('greater than') || d.includes('value > ')) {
    kw.push('>');
  }
  if (d.includes('>=') || d.includes('>= ')) kw.push('>=');
  if (d.includes('using <') || d.includes('row <') || d.includes('< ')) {
    if (!d.includes('>=')) kw.push('<');
  }
  if (d.includes('.equals(') || d.includes('using .equals')) kw.push('.equals(');

  // Accumulation
  if (d.includes('accumulates') || d.includes('accumulates sum') || d.includes('sums all') || d.includes('sum of')) {
    kw.push('+=');
  }

  // Array creation
  if (d.includes('creates new 2d array') || d.includes('creates result array') ||
      d.includes('creates new array') || d.includes('creates a new array') ||
      d.includes('creates 2d boolean') || d.includes('creates array')) {
    // Find the actual new expression from code
    const newMatch = code.match(/new\s+\w+\[/);
    if (newMatch) kw.push(newMatch[0].trim());
    else kw.push('new');
  }
  if (d.includes('new arraylist') || d.includes('creates a new arraylist')) {
    kw.push('new ArrayList');
  }

  // Private fields / constructor
  if (d.includes('private instance variables') || d.includes('declares appropriate private') || d.includes('declares private')) {
    kw.push('private');
    // Add specific field types/names
    const privFields = code.match(/private\s+\w+\s+(\w+)/g) || [];
    privFields.slice(0, 2).forEach(pf => {
      const nameMatch = pf.match(/private\s+\w+\s+(\w+)/);
      if (nameMatch) kw.push(nameMatch[1]);
    });
  }
  if (d.includes('constructor') && d.includes('initializes')) {
    kw.push('this.');
  }

  // Method names mentioned explicitly in description
  const methodCallMatch = d.match(/calls?\s+(\w+)\s*[\(\s]/i);
  if (methodCallMatch && methodCallMatch[1].length > 2) {
    kw.push(methodCallMatch[1] + '(');
  }
  const methodRefMatch = d.match(/(\w+)\(\)\s+(?:returns?|compares?|checks?|correctly|adds?|removes?|creates?)/i);
  if (methodRefMatch && methodRefMatch[1].length > 2) {
    const mName = methodRefMatch[1] + '(';
    if (!kw.includes(mName)) kw.push(mName);
  }
  const methodStartMatch = d.match(/^(?:\([a-z]\)\s*)?(\w+)\(\)\s+/i);
  if (methodStartMatch && methodStartMatch[1].length > 2) {
    const mName = methodStartMatch[1] + '(';
    if (!kw.includes(mName)) kw.push(mName);
  }

  // API calls
  if (d.includes('.add(') || d.includes('adds to') || d.includes('adds title')) {
    kw.push('.add(');
  }
  if (d.includes('.remove(') || d.includes('removes first') || d.includes('removes qualifying')) {
    kw.push('.remove(');
  }
  if (d.includes('.set(') || d.includes('replaces') || d.includes('using set()')) {
    kw.push('.set(');
  }
  if (d.includes('.size()') || d.includes('list size')) kw.push('.size()');
  if (d.includes('.length') || d.includes('correct length')) kw.push('.length');
  if (d.includes('.charat(') || d.includes('charat') || d.includes('first character')) kw.push('.charAt(');
  if (d.includes('.substring(') || d.includes('substring') || d.includes('extracts substrings')) kw.push('.substring(');
  if (d.includes('case-insensitiv') || d.includes('case insensitiv')) kw.push('toLowerCase');
  if (d.includes('uppercase') || d.includes('isuppercase')) kw.push('isUpperCase');
  if (d.includes('math.random') || d.includes('30% probability') || d.includes('random amount')) kw.push('Math.random');
  if (d.includes('math.sqrt') || d.includes('sqrt')) kw.push('Math.sqrt');
  if (d.includes('divisib') || d.includes('% ') || d.includes('modulo') || d.includes('divisor')) kw.push('%');
  if (d.includes('tostring()')) kw.push('toString');
  if (d.includes('contains()') || d.includes('using contains')) kw.push('.contains(');
  if (d.includes('implements') || d.includes('interface')) kw.push('implements');

  // if/else structure
  if (d.includes('if/else') || d.includes('if / else') || d.includes('else if')) {
    kw.push('if');
    kw.push('else');
  }

  // Multiplication
  if (d.includes('multiplying') || d.includes('multiply') || d.includes('* ') ||
      d.includes('numberOflines * linewidth') || d.includes('area')) {
    if (/\*/.test(code)) kw.push('*');
  }

  // Backward iteration
  if (d.includes('backward') || d.includes('index shifting') || d.includes('index correctly after removal') ||
      d.includes('handles index') || d.includes('without skipping')) {
    kw.push('i--');
  }

  // Specific string returns
  if (d.includes('"a"') || d.includes('"b"') || d.includes('"c"') || d.includes('"d"') || d.includes('"f"')) {
    const gradeMatch = d.match(/"([A-F])"/g);
    if (gradeMatch) gradeMatch.forEach(g => kw.push(g));
  }
  if (d.includes('"freezing"') || d.includes('"cold"') || d.includes('"warm"') || d.includes('"hot"')) {
    const tempMatch = d.match(/"(\w+)"/g);
    if (tempMatch) tempMatch.forEach(t => kw.push(t));
  }
  if (d.includes('returns -1')) kw.push('-1');
  if (d.includes('returns 0.0')) kw.push('0.0');

  // -- Celsius/Fahrenheit specific --
  if (d.includes('9.0/5.0') || d.includes('9.0 / 5.0') || d.includes('celsius * 9')) {
    kw.push('9.0');
    kw.push('5.0');
  }
  if (d.includes('5.0/9.0') || d.includes('(fahrenheit - 32)') || d.includes('- 32')) {
    kw.push('32');
    kw.push('5.0');
  }
  if (d.includes('<= 32') || d.includes('for tempf <= 32')) { kw.push('32'); kw.push('<='); }
  if (d.includes('<= 59')) { kw.push('59'); }
  if (d.includes('<= 85') || d.includes('> 85')) { kw.push('85'); }

  // ─── 2. Solution-based enrichment ───
  // For items with generic/few keywords, extract identifiers from the code
  if (kw.length <= 1) {
    // Find the most specific identifiers from the part's code
    const specificIds = [];
    for (const id of partIds) {
      // Skip very short or very common identifiers
      if (id.length <= 2 || ['int', 'row', 'col', 'val', 'sum'].includes(id)) continue;
      specificIds.push(id);
    }
    // Add up to 2 specific identifiers
    specificIds.slice(0, 2).forEach(id => {
      if (!kw.includes(id) && !kw.includes(id.toLowerCase())) kw.push(id);
    });
  }

  // ─── 3. Additional context-specific enrichment ───
  // "Tracks maximum" / "finds maximum" / "tracks the position"
  if (d.includes('maximum') || d.includes('maximum value') || d.includes('tracks') || d.includes('max')) {
    if (!kw.includes('>')) kw.push('>');
    // Find the max variable name
    for (const id of partIds) {
      if (id.toLowerCase().includes('max') || id.toLowerCase().includes('best')) {
        kw.push(id);
        break;
      }
    }
  }
  // "Counts" something
  if (d.includes('counts') || d.includes('correctly count')) {
    kw.push('count');
  }
  // "Resets count"
  if (d.includes('resets count') || d.includes('resets ')) {
    kw.push('= 0');
  }
  // "Seeds does not go below 0"
  if (d.includes('below 0') || d.includes('does not go below')) {
    kw.push('= 0');
  }
  // "Divides by"
  if (d.includes('divides by') || d.includes('divide')) {
    kw.push('/');
  }
  // "Copies correct rows" / "Copies elements"
  if (d.includes('copies')) {
    kw.push('[');
    kw.push('=');
  }
  // "Even or odd"
  if (d.includes('even or odd') || d.includes('even/odd')) {
    kw.push('% 2');
  }
  // "Applies correct rule"
  if (d.includes('applies correct rule') || d.includes('correct rule based on')) {
    kw.push('if');
    if (!kw.includes('%')) kw.push('% 2');
  }
  // "Handles up/down/left/right direction"
  if (d.includes('handles up') || d.includes('handles down') || d.includes('handles left/right')) {
    kw.push('if');
    if (d.includes('row > 0')) kw.push('> 0');
    if (d.includes('row <')) kw.push('< ');
  }
  // "Generates random"
  if (d.includes('generates random') || d.includes('random amount')) {
    kw.push('Math.random');
  }
  // "Subtracts"
  if (d.includes('subtracts') || d.includes('subtract')) {
    kw.push('-=');
  }
  // "Refills"
  if (d.includes('refills')) {
    kw.push('if');
  }
  // "Marks hours busy"
  if (d.includes('marks') && d.includes('busy')) {
    kw.push('true');
  }
  // "Compares from both ends"
  if (d.includes('from both ends') || d.includes('both ends')) {
    kw.push('left');
    kw.push('right');
  }
  // "Reverse order"
  if (d.includes('reverse') || d.includes('reversed')) {
    kw.push('.length');
    kw.push('- 1');
  }
  // "Initializes result to 1"
  if (d.includes('initializes result to 1') || d.includes('result to 1')) {
    kw.push('= 1');
  }
  // "Base case" for factorial/power
  if (d.includes('base case') && (d.includes('0!') || d.includes('1!'))) {
    kw.push('return');
    kw.push('1');
  }
  // "Factorial"
  if (d.includes('factorial')) {
    kw.push('*=');
  }
  // "Record play" / "points to correct team"
  if (d.includes('which team') || d.includes('correct team') || d.includes('recordplay')) {
    kw.push('.equals(');
  }
  if (d.includes('adds points')) kw.push('+=');
  // Score format
  if (d.includes('format with team names') || d.includes('getscore')) {
    kw.push('+');
    kw.push('return');
  }
  // "Strict inequality" / "isLeading"
  if (d.includes('strict inequality') || d.includes('isleading')) {
    kw.push('>');
  }
  // "Compares scores"
  if (d.includes('compares scores')) kw.push('>');
  // "Tied"
  if (d.includes('tied') || d.includes('false if tied')) kw.push('false');

  // "num >= min && num <= max" pattern
  if (d.includes('num >= min') || d.includes('hasnumber')) {
    kw.push('>=');
    kw.push('<=');
  }
  // "isOlderThan" / "compares this.age"
  if (d.includes('isolderthan') || d.includes('this.age')) {
    kw.push('>');
    kw.push('age');
  }
  // "Getter methods return"
  if (d.includes('getter methods') || d.includes('getter')) {
    kw.push('return');
    kw.push('get');
  }

  // "Result[0] = arr[0]"
  if (d.includes('result[0]') || d.includes('arr[0]')) {
    kw.push('[0]');
  }
  // "Previous total + arr[i]"
  if (d.includes('previous total') || d.includes('subsequent element as previous')) {
    kw.push('result[');
    kw.push('+');
  }
  // "Compares adjacent"
  if (d.includes('adjacent')) {
    kw.push('[i]');
    kw.push('[i+1]');
  }
  // "result[c][r] = matrix[r][c]" transposition
  if (d.includes('result[c][r]') || d.includes('assigns result[c][r]') || d.includes('transposed')) {
    kw.push('[c][r]');
    kw.push('[r][c]');
  }
  if (d.includes('matrix[r][c] with matrix[c][r]') || d.includes('compares matrix')) {
    kw.push('[r][c]');
    kw.push('[c][r]');
  }
  // "Swapped dimensions"
  if (d.includes('swapped dimensions')) {
    kw.push('new int[');
  }
  // "Correct number of passing scores (>= 60)"
  if (d.includes('>= 60') || d.includes('passing')) {
    kw.push('>= 60');
  }
  // "n <= 1" (isPrime)
  if (d.includes('n <= 1')) {
    kw.push('<= 1');
  }
  // "Checks divisibility from 2"
  if (d.includes('divisibility from 2') || d.includes('checks divisibility')) {
    kw.push('% ');
    kw.push('== 0');
  }
  // "Sums and returns primes" / "calls isPrime"
  if (d.includes('isprime')) {
    kw.push('isPrime(');
  }
  // "Empty strings" for splitIntoLines
  if (d.includes('empty strings') || d.includes('message shorter')) {
    kw.push('""');
  }
  // "word.length() < minLength"
  if (d.includes('word.length()') || d.includes('.length() <') || d.includes('minlength')) {
    kw.push('.length()');
  }
  // "Negative values"
  if (d.includes('negative value') || d.includes('identifies negative')) {
    kw.push('< 0');
  }

  // ─── 4. Final dedup and cleanup ───
  const seen = new Set();
  const result = [];
  for (const k of kw) {
    const low = k.toLowerCase();
    if (!seen.has(low) && k.length > 0) {
      seen.add(low);
      result.push(k);
    }
  }

  // If still very few keywords, add constructs from the solution
  if (result.length < 2 && code) {
    if (/\bfor\s*\(/.test(code) && !result.includes('for')) result.push('for');
    if (/\breturn\b/.test(code) && !result.includes('return')) result.push('return');
    if (/\bif\s*\(/.test(code) && !result.includes('if')) result.push('if');
  }

  return result;
}

// ── Main annotation loop ─────────────────────────────────────────────────────
bank.forEach((q, qi) => {
  q.autoGraded = true;

  const partSolutions = splitSolutionByPart(q.sampleSolution, q.parts);

  q.rubric.forEach((item, ri) => {
    item.index = ri + 1;
    item.skill = 'code';

    // Extract partLabel from "(a) ..." prefix
    const partMatch = item.description.match(/^\(([a-z])\)\s*/);
    if (partMatch) {
      item.partLabel = partMatch[1];
    } else if (q.parts.length === 1) {
      item.partLabel = q.parts[0].label;
    } else {
      item.partLabel = 'a';
    }

    // Generate keywords
    const partCode = partSolutions[item.partLabel] || q.sampleSolution || '';
    item.keywords = generateKeywords(item.description, partCode, q.sampleSolution || '', q);
  });

  // Add cpeSource for multi-part questions where part b calls part a's method
  if (q.parts.length >= 2) {
    const partAMethods = [];
    const solA = partSolutions['a'] || '';
    const methodDefs = solA.match(/(?:public|private)\s+(?:static\s+)?(?:\w+\s+)(\w+)\s*\(/g);
    if (methodDefs) {
      methodDefs.forEach(md => {
        const nameMatch = md.match(/(\w+)\s*\($/);
        if (nameMatch) partAMethods.push(nameMatch[1]);
      });
    }
    if (partAMethods.length > 0) {
      const solB = partSolutions['b'] || '';
      const callsPartA = partAMethods.some(m => new RegExp('\\b' + m + '\\s*\\(').test(solB));
      if (callsPartA) {
        q.rubric.forEach(item => {
          if (item.partLabel === 'b') item.cpeSource = 'a';
        });
      }
    }
  }
});

// ── Serialize back to file ───────────────────────────────────────────────────
function serializeValue(val, indent) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val.toString();
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'string') {
    if (val.includes('\n')) return '`' + val.replace(/`/g, '\\`') + '`';
    return "'" + val.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const allSimple = val.every(v => typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean');
    if (allSimple && JSON.stringify(val).length < 120) {
      return '[' + val.map(v => serializeValue(v, '')).join(', ') + ']';
    }
    const items = val.map(v => indent + '  ' + serializeValue(v, indent + '  '));
    return '[\n' + items.join(',\n') + '\n' + indent + ']';
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    const shortRepr = '{ ' + entries.map(([k,v]) => k + ': ' + serializeValue(v, '')).join(', ') + ' }';
    if (shortRepr.length < 200 && !shortRepr.includes('\n')) return shortRepr;
    const items = entries.map(([k, v]) => indent + '  ' + k + ': ' + serializeValue(v, indent + '  '));
    return '{\n' + items.join(',\n') + '\n' + indent + '}';
  }
  return String(val);
}

function serializeQuestion(q, indent) {
  const lines = [];
  const keyOrder = ['id', 'year', 'type', 'title', 'units', 'difficulty', 'source', 'autoGraded', 'prompt', 'starterCode', 'parts', 'rubric', 'sampleSolution'];
  for (const key of keyOrder) {
    if (q[key] !== undefined) lines.push(indent + '  ' + key + ': ' + serializeValue(q[key], indent + '  '));
  }
  for (const key of Object.keys(q)) {
    if (!keyOrder.includes(key) && q[key] !== undefined) lines.push(indent + '  ' + key + ': ' + serializeValue(q[key], indent + '  '));
  }
  return indent + '{\n' + lines.join(',\n') + '\n' + indent + '}';
}

let output = 'var FRQ_BANK = [\n';
let first = true, lastYear = null;
for (const q of bank) {
  if (q.year !== lastYear) {
    if (lastYear !== null) output += '\n';
    output += '  // ─── CB ' + q.year + ' FRQs ──────────────────────────────────────────────────────────\n\n';
    lastYear = q.year;
  }
  if (!first) output += ',\n\n';
  output += serializeQuestion(q, '  ');
  first = false;
}
output += '\n];\n';

fs.writeFileSync(FILE, output, 'utf8');

// Stats
let totalRubric = 0, totalKeywords = 0, weakCount = 0;
bank.forEach(q => {
  q.rubric.forEach(r => {
    totalRubric++;
    totalKeywords += r.keywords.length;
    const generic = r.keywords.every(k => ['for', 'return', 'if', 'else', 'true', 'false'].includes(k));
    if (generic) weakCount++;
  });
});

console.log(`\nAnnotated ${bank.length} questions (${totalRubric} rubric items)`);
console.log(`Average keywords per item: ${(totalKeywords / totalRubric).toFixed(1)}`);
console.log(`Weak items (generic-only keywords): ${weakCount} / ${totalRubric}`);
