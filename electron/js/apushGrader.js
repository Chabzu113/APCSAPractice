// ═══════════════════════════════════════════════════════════════════════════
//  APUSHGrader — Deterministic Local FRQ Grading Engine  v1.6.0
//
//  All 5 Refinements implemented:
//   R1  Negative Evidence Guard (Qualifier Check)
//   R2  Anti-Plagiarism / Quote Ratio (DBQ copy detection)
//   R3  Run-on Fix (tokenizeSentences with virtual breaks & decimal protection)
//   R4  Era-Overlap Buffer (15-year grace period for forbidden terms)
//   R5  Multi-Word Term Priority (longest match first, consumed-range tracking)
//
//  v1.6.0 fixes:
//   FIX1  links15 block-scope crash in gradeLEQ (ReferenceError → 0/6 bug)
//   FIX2  config.evidenceBuckets → config.units in gradeOutsideEvidence
//   FIX3  LEQ/SAQ shield in grade() — frqStimulus only set for DBQ
//   FIX4  SAQ calibration — fallback: >20 words + reasoning keyword = 1pt
//   FIX5  2026 DBQ confirmed: 2-3 docs=1pt, 4+docs=2pts
//
//  Exposed as: window.APUSHGrader = { grade, buildHighlightedHtml }
// ═══════════════════════════════════════════════════════════════════════════

window.APUSHGrader = (function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  //  UTILITY: Levenshtein distance (capped at max 60 chars for perf)
  // ─────────────────────────────────────────────────────────────────────────
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (a.length > 60 || b.length > 60) return Math.abs(a.length - b.length);
    const m = a.length, n = b.length;
    const dp = [];
    for (let i = 0; i <= m; i++) { dp[i] = [i]; }
    for (let j = 0; j <= n; j++) { dp[0][j] = j; }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  UTILITY: Fuzzy term presence check
  //  Returns true if 'term' appears in 'text' within edit-distance threshold.
  //  threshold: fraction of term length allowed as edit distance (0.2 = 20%)
  // ─────────────────────────────────────────────────────────────────────────
  function fuzzyContains(term, text, threshold) {
    threshold = threshold !== undefined ? threshold : 0.2;
    const maxDist = Math.floor(term.length * threshold);
    const words = text.split(/\s+/);
    const termWords = term.split(/\s+/);
    const tLen = termWords.length;

    for (let i = 0; i <= words.length - tLen; i++) {
      const chunk = words.slice(i, i + tLen).join(' ');
      if (levenshtein(term, chunk) <= maxDist) return true;
    }
    return false;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  UTILITY: Shorthand resolution — expand abbreviations before processing
  // ─────────────────────────────────────────────────────────────────────────
  function resolveShorthands(text, shorthands) {
    if (!shorthands) return text;
    // Sort keys longest-first so 'FED GOV' is replaced before 'FED'
    const keys = Object.keys(shorthands).sort((a, b) => b.length - a.length);
    let result = text;
    for (const k of keys) {
      const re = new RegExp('\\b' + k.replace(/[-/]/g, '[-/]') + '\\b', 'gi');
      result = result.replace(re, shorthands[k]);
    }
    return result;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 5: Sort bucket by descending word-count (multi-word first)
  // ─────────────────────────────────────────────────────────────────────────
  function sortBucketByLength(terms) {
    return terms.slice().sort(function (a, b) {
      return b.split(/\s+/).length - a.split(/\s+/).length;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  UTILITY: Stem-prefix match — handles morphological variants
  //  Checks if each word in 'term' appears in 'text' as a stem match
  //  by comparing the first 75% of characters. Minimum stem length: 3.
  //  Examples: 'colony' → stem 'colon' matches 'colonial','colonies','colonist'
  //            'cause'  → stem 'caus'  matches 'caused','causing','causation'
  //  Used by gradeThesis() so reasoning words match inflected forms.
  // ─────────────────────────────────────────────────────────────────────────
  function stemMatch(term, text) {
    const termWords = term.toLowerCase().split(/\s+/);
    const textWords = text.toLowerCase().split(/\s+/);
    return termWords.every(function (tw) {
      const stemLen = Math.floor(tw.length * 0.75);
      const stem    = tw.substring(0, stemLen);
      if (stem.length < 3) return text.toLowerCase().includes(tw); // short words: exact
      return textWords.some(function (w) { return w.startsWith(stem); });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 3: Sentence tokenizer
  //  - Splits on . ! ? followed by whitespace (or end of string)
  //  - Protects decimals: "14.5%" and "3.14" are NOT split
  //  - Virtual breaks every ~30 words for run-on segments (50+ words)
  // ─────────────────────────────────────────────────────────────────────────
  function tokenizeSentences(text) {
    if (!text || !text.trim()) return [];

    // Protect decimal numbers: temporarily replace "3.14" with sentinel
    const decimals = [];
    const protected_ = text.replace(/(\d+)\.(\d)/g, function (m, a, b) {
      const idx = decimals.length;
      decimals.push(m);
      return '\u0000DEC' + idx + '\u0000';
    });

    // Split on sentence-ending punctuation followed by whitespace or end-of-string
    const raw = protected_.split(/(?<=[.!?])\s+/);

    // Restore decimals
    const sentences = raw.map(function (s) {
      return s.replace(/\u0000DEC(\d+)\u0000/g, function (m, i) {
        return decimals[parseInt(i)];
      }).trim();
    }).filter(Boolean);

    // Virtual breaks: if any segment has 50+ words, split every ~30 words
    const result = [];
    for (const seg of sentences) {
      const words = seg.split(/\s+/);
      if (words.length >= 50) {
        for (let i = 0; i < words.length; i += 30) {
          const chunk = words.slice(i, i + 30).join(' ');
          if (chunk.trim()) result.push(chunk);
        }
      } else {
        result.push(seg);
      }
    }
    return result;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 1: Qualifier check for a found evidence term
  //  Returns { passed: bool, qualifier: str|null, reason: str|null }
  // ─────────────────────────────────────────────────────────────────────────
  function checkQualifiers(sentence, term, qualifierChecks) {
    if (!qualifierChecks || !qualifierChecks.length) return { passed: true, qualifier: null, reason: null };
    const normSentence = sentence.toLowerCase();
    const normTerm = term.toLowerCase();

    for (const check of qualifierChecks) {
      if (!fuzzyContains(check.term, normTerm, 0.15)) continue;
      // Term matches — now check if any bad qualifier appears in the sentence
      for (const bq of check.badQualifiers) {
        if (normSentence.includes(bq.toLowerCase())) {
          return { passed: false, qualifier: bq, reason: check.reason };
        }
      }
    }
    return { passed: true, qualifier: null, reason: null };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 2: Overlap ratio for DBQ plagiarism detection
  //  Returns ratio of shared words to student sentence word count
  // ─────────────────────────────────────────────────────────────────────────
  function computeOverlapRatio(studentSentence, sourceExcerpt) {
    if (!studentSentence || !sourceExcerpt) return 0;
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on',
      'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'are', 'were', 'it',
      'that', 'this', 'he', 'she', 'they', 'we', 'i', 'his', 'her', 'its',
      'their', 'our', 'my', 'be', 'been', 'have', 'has', 'had', 'do', 'does']);

    function tokenize(str) {
      return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
        .filter(function (w) { return w.length > 2 && !stopWords.has(w); });
    }

    const studentWords = tokenize(studentSentence);
    const sourceWords = new Set(tokenize(sourceExcerpt));
    if (studentWords.length === 0) return 0;

    let shared = 0;
    for (const w of studentWords) {
      if (sourceWords.has(w)) shared++;
    }
    return shared / studentWords.length;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 4: Era-overlap buffer check
  //  Returns true if the term SHOULD be forbidden (no grace applies)
  // ─────────────────────────────────────────────────────────────────────────
  function isForbiddenInEra(termEntry, unitNum, unitDateRanges) {
    const GRACE = 15; // years
    const validFrom = termEntry.validFrom;
    const [unitStart, unitEnd] = unitDateRanges[unitNum] || [0, 9999];
    const [fromStart]          = unitDateRanges[validFrom] || [9999, 9999];

    // If the unit's end year is within GRACE of when the term becomes valid,
    // give it a pass (era-overlap buffer)
    if (fromStart - unitEnd <= GRACE) return false; // grace — don't penalize

    // If the term validFrom is less than or equal to this unit, it's valid — not forbidden
    if (validFrom <= unitNum) return false;

    return true; // genuinely anachronistic
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  REFINEMENT 5: Consumed-range tracker
  //  Used to prevent single-word terms from double-matching inside multi-word hits
  // ─────────────────────────────────────────────────────────────────────────
  function overlapsConsumed(start, end, consumed) {
    for (const r of consumed) {
      if (start < r.end && end > r.start) return true;
    }
    return false;
  }

  function findTermInText(term, text) {
    // Returns {start, end} index of first occurrence (case-insensitive), or null
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return null;
    return { start: idx, end: idx + term.length };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  CORE: Detect evidence terms in text
  //  Returns { matchedTerms: string[], flaggedTerms: [{term, reason}],
  //            nicheTerms: string[], highlights: [] }
  // ─────────────────────────────────────────────────────────────────────────
  function detectEvidence(text, config, unitNum) {
    const unitCfg = config.units[unitNum] || {};
    const standardBucket = sortBucketByLength(unitCfg.standard || []); // R5
    const nicheBucket    = sortBucketByLength(unitCfg.niche    || []);
    const qualChecks     = unitCfg.qualifierChecks || [];
    const forbiddenList  = config.forbiddenByUnit[unitNum] || [];

    const sentences  = tokenizeSentences(text); // R3
    const normText   = text.toLowerCase();

    const matchedTerms = [];
    const flaggedTerms = [];
    const nicheTerms   = [];
    const highlights   = [];
    const consumed     = []; // R5: track matched char ranges

    // Check standard evidence bucket
    for (const term of standardBucket) { // R5: already sorted longest-first
      if (matchedTerms.includes(term)) continue;
      if (!fuzzyContains(term, normText, 0.2)) continue;

      // Find char position for consumed-range check (R5)
      const pos = findTermInText(term, text);
      if (pos && overlapsConsumed(pos.start, pos.end, consumed)) continue;

      // Find the containing sentence for qualifier check (R1)
      const containingSentence = sentences.find(function (s) {
        return s.toLowerCase().includes(term.toLowerCase()) ||
               fuzzyContains(term, s.toLowerCase(), 0.2);
      }) || text;

      // R1: Qualifier guard
      const qCheck = checkQualifiers(containingSentence, term, qualChecks);
      if (!qCheck.passed) {
        flaggedTerms.push({ term: term, qualifier: qCheck.qualifier, reason: qCheck.reason });
        highlights.push({ text: term, type: 'warning', reason: qCheck.reason });
        continue;
      }

      if (pos) consumed.push(pos); // R5: mark range as consumed
      matchedTerms.push(term);
      highlights.push({ text: term, type: 'evidence' });
    }

    // Check niche bucket (R5: already sorted)
    for (const term of nicheBucket) {
      if (nicheTerms.includes(term)) continue;
      if (!fuzzyContains(term, normText, 0.2)) continue;

      const pos = findTermInText(term, text);
      if (pos && overlapsConsumed(pos.start, pos.end, consumed)) continue;
      if (pos) consumed.push(pos);

      nicheTerms.push(term);
      highlights.push({ text: term, type: 'niche' });
    }

    // Check forbidden/anachronism terms (R4)
    for (const termEntry of forbiddenList) {
      if (!fuzzyContains(termEntry.term, normText, 0.15)) continue;
      if (!isForbiddenInEra(termEntry, unitNum, config.unitDateRanges)) continue;
      highlights.push({
        text: termEntry.term,
        type: 'anachronism',
        reason: 'Anachronism: "' + termEntry.term + '" is not historically valid for Period ' + unitNum
      });
    }

    return { matchedTerms, flaggedTerms, nicheTerms, highlights };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  CORE: Detect causal connectors in text, return found list
  // ─────────────────────────────────────────────────────────────────────────
  function detectConnectors(text, config) {
    const norm = text.toLowerCase();
    return (config.causalConnectors || []).filter(function (c) {
      return norm.includes(c.toLowerCase());
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  CORE: Proximity check — evidence term + causal connector within N words
  //  Returns array of {evidence, connector} pairs found
  // ─────────────────────────────────────────────────────────────────────────
  function findProximityLinks(text, evidenceTerms, config, windowSize) {
    windowSize = windowSize || 25;
    const sentences = tokenizeSentences(text); // R3 applied
    const links = [];

    for (const sentence of sentences) {
      const words  = sentence.split(/\s+/);
      const norm   = sentence.toLowerCase();
      const connectors = config.causalConnectors || [];

      for (const term of evidenceTerms) {
        if (!fuzzyContains(term, norm, 0.2)) continue;
        // Find approximate word index of the term
        const termWords = term.split(/\s+/);
        let termIdx = -1;
        for (let i = 0; i <= words.length - termWords.length; i++) {
          const chunk = words.slice(i, i + termWords.length).join(' ').toLowerCase();
          if (levenshtein(term.toLowerCase(), chunk) <= Math.floor(term.length * 0.2)) {
            termIdx = i;
            break;
          }
        }
        if (termIdx === -1) continue;

        // Check within windowSize words
        for (const conn of connectors) {
          const connWords = conn.split(/\s+/);
          let connIdx = -1;
          for (let j = 0; j <= words.length - connWords.length; j++) {
            const chunk = words.slice(j, j + connWords.length).join(' ').toLowerCase();
            if (chunk === conn.toLowerCase()) { connIdx = j; break; }
          }
          if (connIdx === -1) continue;

          const distance = Math.abs(connIdx - termIdx);
          if (distance <= windowSize) {
            const key = term + '|' + conn;
            const already = links.some(function (l) { return l.key === key; });
            if (!already) {
              links.push({ evidence: term, connector: conn, key: key });
              // Add logic highlight for connector
            }
          }
        }
      }
    }
    return links;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  THESIS grader — checks first 30% of text for reasoning process words
  //  Uses stemMatch() so 'cause' matches 'caused','causation'; 'colony' matches 'colonial'
  // ─────────────────────────────────────────────────────────────────────────
  function gradeThesis(text, config) {
    if (!text || !text.trim()) return { earned: 0, match: null };
    const introLen = Math.ceil(text.length * 0.30);
    const intro = text.substring(0, introLen).toLowerCase();
    const words = config.reasoningProcessWords || [];
    for (const w of words) {
      if (stemMatch(w, intro)) return { earned: 1, match: w };
    }
    return { earned: 0, match: null };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  CONTEXT grader — checks first 20% for prior-era keywords
  //  Fallback: if no signal phrase found, checks for any standard unit evidence term
  //  in the first 20% (student is setting historical stage with era-appropriate terms).
  // ─────────────────────────────────────────────────────────────────────────
  function gradeContext(text, config, unitNum) {
    if (!text || !text.trim()) return { earned: 0, match: null };
    const introLen = Math.ceil(text.length * 0.20);
    const intro = text.substring(0, introLen).toLowerCase();

    // Primary: check priorEraKeywords signal phrases
    const words = config.priorEraKeywords || [];
    for (const w of words) {
      if (intro.includes(w.toLowerCase())) return { earned: 1, match: w };
    }

    // Fallback: era-appropriate term in first 20% also counts as contextualization
    const unitCfg  = (config.units && config.units[unitNum]) || {};
    const stdTerms = unitCfg.standard || [];
    for (const term of stdTerms) {
      if (fuzzyContains(term, intro, 0.2)) return { earned: 1, match: term + ' (contextual)' };
    }

    return { earned: 0, match: null };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  EVIDENCE grader — returns 0|1|2 based on unique term density
  //  Threshold: 5+ unique = 2 pts; 2-4 = 1 pt; <2 = 0 pts
  // ─────────────────────────────────────────────────────────────────────────
  function gradeEvidence(text, config, unitNum) {
    const result = detectEvidence(text, config, unitNum);
    const count = result.matchedTerms.length;
    let earned = 0;
    if (count >= 5) earned = 2;
    else if (count >= 2) earned = 1;
    return {
      earned: earned,
      found:   result.matchedTerms,
      niche:   result.nicheTerms,
      flagged: result.flaggedTerms,
      highlights: result.highlights
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  ANALYSIS grader — proximity links between evidence and causal connectors
  //  2+ links = 2 pts; 1 link = 1 pt; 0 = 0 pts
  // ─────────────────────────────────────────────────────────────────────────
  function gradeAnalysis(text, config, unitNum, validEvidence) {
    if (!validEvidence || !validEvidence.length) return { earned: 0, links: [] };
    const links = findProximityLinks(text, validEvidence, config, 25);
    let earned = 0;
    if (links.length >= 2) earned = 2;
    else if (links.length === 1) earned = 1;
    return { earned: earned, links: links };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  DBQ: Citation grader — detect (Doc N) or Document N references
  //  Returns { earned:0|1|2, citations:[], copyWarnings:[] }
  // ─────────────────────────────────────────────────────────────────────────
  function gradeCitations(text, frqStimulus) {
    const citationRe = /\(\s*doc(?:ument)?\s*(\d+)\s*\)|document\s+(\d+)/gi;
    const sentences  = tokenizeSentences(text);
    const citedDocs  = new Set();
    const copyWarnings = [];
    let m;

    while ((m = citationRe.exec(text)) !== null) {
      const docNum = parseInt(m[1] || m[2]);
      if (!docNum) continue;

      // R2: Check for plagiarism against source excerpt
      const docData = frqStimulus && frqStimulus.find(function (d) { return d.docNum === docNum; });
      if (docData && docData.excerpt) {
        const citingSentence = sentences.find(function (s) {
          const pattern = new RegExp('\\(\\s*doc(?:ument)?\\s*' + docNum + '\\s*\\)|document\\s+' + docNum, 'i');
          return pattern.test(s);
        }) || '';
        const ratio = computeOverlapRatio(citingSentence, docData.excerpt);
        if (ratio > 0.80) {
          copyWarnings.push(docNum);
          continue; // Don't count this as a valid citation
        }
      }

      citedDocs.add(docNum);
    }

    const validCount = citedDocs.size;
    let earned = 0;
    if (validCount >= 4) earned = 2;      // 2026 CB: 4+ docs = 2pts
    else if (validCount >= 2) earned = 1; // 2–3 docs = 1pt

    return { earned: earned, citations: Array.from(citedDocs), copyWarnings: copyWarnings, validCount: validCount };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  DBQ: Sourcing grader — sourcing trigger within 20 words of a citation
  //  R2: Skip docs that already triggered copyWarning
  // ─────────────────────────────────────────────────────────────────────────
  function gradeSourcing(text, config, citationResult) {
    const triggers     = config.sourcingTriggers || [];
    const copyWarnings = (citationResult && citationResult.copyWarnings) || [];
    const sentences    = tokenizeSentences(text);
    const examples     = [];

    for (const sentence of sentences) {
      const normS = sentence.toLowerCase();
      const docMatch = normS.match(/\(\s*doc(?:ument)?\s*(\d+)\s*\)|document\s+(\d+)/i);
      if (!docMatch) continue;

      const docNum = parseInt(docMatch[1] || docMatch[2]);
      if (copyWarnings.includes(docNum)) continue; // R2: skip copy-warned docs

      // Check for sourcing trigger within 20 words of citation
      const words = sentence.split(/\s+/);
      let docWordIdx = -1;
      const docRe = new RegExp('doc(?:ument)?\\s*' + docNum, 'i');
      for (let i = 0; i < words.length; i++) {
        if (docRe.test(words[i])) { docWordIdx = i; break; }
      }
      if (docWordIdx === -1) continue;

      const windowStart = Math.max(0, docWordIdx - 20);
      const windowEnd   = Math.min(words.length, docWordIdx + 20);
      const window      = words.slice(windowStart, windowEnd).join(' ').toLowerCase();

      for (const trigger of triggers) {
        if (window.includes(trigger.toLowerCase())) {
          examples.push({ doc: docNum, trigger: trigger });
          break;
        }
      }
    }

    // 2026 CB: HAPP/HIPP analysis required on at least 2 documents for sourcing point
    return { earned: examples.length >= 2 ? 1 : 0, examples: examples };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  DBQ: Outside Evidence grader (2026 CB addition)
  //  Awards 1pt if the student cites a standard evidence term NOT drawn from
  //  the provided documents (genuine outside knowledge beyond the stimulus).
  // ─────────────────────────────────────────────────────────────────────────
  function gradeOutsideEvidence(text, config, unitNum, frqObj) {
    // Combine all document excerpts into one searchable string
    const stimulus = (frqObj && frqObj.stimulus) || [];
    const docText  = stimulus.map(function (d) { return d.excerpt || ''; }).join(' ').toLowerCase();

    // Detect standard evidence terms in the student's essay
    const evDetect = detectEvidence(text, config, unitNum);

    // Anachronism anywhere in the essay voids the outside evidence point
    const hasAnachronism = evDetect.highlights.some(function (h) { return h.type === 'anachronism'; });
    if (hasAnachronism) {
      return { earned: 0, outsideTerm: null, highlights: evDetect.highlights };
    }

    // Check unit-specific outsideEvidenceTerms first — these always count as outside
    // evidence regardless of whether they appear in document excerpts (e.g. Bill of Rights
    // for Unit 3 Constitution DBQ).
    // FIX2: was config.evidenceBuckets (undefined key) — must be config.units
    const bucket = (config.units && config.units[unitNum]) || {};
    const alwaysOutside = bucket.outsideEvidenceTerms || [];
    for (const term of alwaysOutside) {
      if (text.includes(term.toLowerCase())) {
        return { earned: 1, outsideTerm: term, highlights: evDetect.highlights };
      }
    }

    // Award 1pt if ANY matched standard term is NOT found in the doc excerpts
    for (const term of evDetect.matchedTerms) {
      if (!fuzzyContains(term, docText, 0.15)) {
        return { earned: 1, outsideTerm: term, highlights: evDetect.highlights };
      }
    }
    return { earned: 0, outsideTerm: null, highlights: evDetect.highlights };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  SAQ grader — per-part grading (3 parts → 3 pts)
  //  Each part: presence of evidence term + at least one causal connector = 1 pt
  // ─────────────────────────────────────────────────────────────────────────
  function gradeSAQ(answers, config, unitNum) {
    const partResults = {};
    let totalEarned = 0;
    const allHighlights = [];

    const parts = Object.keys(answers);
    for (const partLabel of parts) {
      const answerText = answers[partLabel] || '';
      if (!answerText.trim()) {
        partResults[partLabel] = { earned: 0, reason: 'No answer provided' };
        continue;
      }

      const normText = answerText.toLowerCase();
      const resolved = resolveShorthands(normText, config.shorthands);
      const evResult = detectEvidence(resolved, config, unitNum);
      const connectors = detectConnectors(resolved, config);
      allHighlights.push(...evResult.highlights);

      const hasEvidence    = evResult.matchedTerms.length > 0;
      const hasConnector   = connectors.length > 0;
      const hasAnachronism = evResult.highlights.some(function (h) { return h.type === 'anachronism'; });

      // FIX4: SAQ calibration fallback — award 1pt if >20 words AND contains a reasoning
      // keyword from causalConnectors or reasoningProcessWords. This prevents false negatives
      // where a student writes a substantive, correct answer that uses slightly different
      // phrasing than the evidence bucket terms.
      const wordCount = answerText.trim().split(/\s+/).length;
      const hasLengthReq = wordCount > 20;
      const hasReasoningKeyword =
        (config.causalConnectors || []).some(function (c) { return normText.includes(c.toLowerCase()); }) ||
        (config.reasoningProcessWords || []).some(function (w) { return stemMatch(w, normText); });

      // Also add logic highlights for connectors found
      for (const conn of connectors) {
        allHighlights.push({ text: conn, type: 'logic' });
      }

      // Anachronism voids the part — CB rubric: historically impossible term = 0
      if (hasAnachronism) {
        const aTerm = evResult.highlights.find(function (h) { return h.type === 'anachronism'; });
        partResults[partLabel] = {
          earned: 0,
          reason: 'Anachronism: "' + (aTerm ? aTerm.text : 'modern term') + '" is not historically valid for this period',
          evFound:   evResult.matchedTerms,
          connFound: connectors
        };
      } else if (hasEvidence && hasConnector) {
        // Primary ACE path: specific evidence term + causal connector
        partResults[partLabel] = {
          earned: 1,
          reason: 'ACE: Cited evidence + explained with reasoning connector',
          evFound:   evResult.matchedTerms,
          connFound: connectors
        };
        totalEarned++;
      } else if (hasLengthReq && hasReasoningKeyword) {
        // Fallback: substantive response (>20 words) with a reasoning keyword.
        // Catches valid answers that cite concepts not yet in the evidence bucket.
        partResults[partLabel] = {
          earned: 1,
          reason: 'Substantive response (>' + wordCount + ' words) with reasoning keyword — ACE partial credit',
          evFound:   evResult.matchedTerms,
          connFound: connectors
        };
        totalEarned++;
      } else if (hasEvidence) {
        partResults[partLabel] = {
          earned: 0,
          reason: 'ACE incomplete: Evidence cited (C) but no explanation connector found (E)',
          evFound:   evResult.matchedTerms,
          connFound: connectors
        };
      } else {
        partResults[partLabel] = {
          earned: 0,
          reason: 'ACE incomplete: No specific historical evidence cited (C missing)',
          evFound:   evResult.matchedTerms,
          connFound: connectors
        };
      }
    }

    return {
      type:        'saq',
      parts:       partResults,
      totalEarned: totalEarned,
      max:         3,
      highlights:  allHighlights
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  LEQ grader — Thesis(1) + Context(1) + Evidence(2) + Analysis(2) = 6 pts
  // ─────────────────────────────────────────────────────────────────────────
  function gradeLEQ(text, config, unitNum) {
    if (!text || !text.trim()) {
      return {
        type: 'leq', totalEarned: 0, max: 6,
        breakdown: { thesis: 0, context: 0, evidence: 0, analysis: 0 },
        highlights: [], details: {}
      };
    }

    const resolved = resolveShorthands(text.toLowerCase(), config.shorthands);
    const thesis   = gradeThesis(resolved, config);
    const context  = gradeContext(resolved, config, unitNum); // passes unitNum for fallback

    // 2026 CB LEQ Evidence Calibration:
    // 1pt = 2 unique terms found anywhere in essay
    // 2pts = 2 unique terms each within 15 words of a causal connector (argument-linked)
    const evDetect           = detectEvidence(resolved, config, unitNum);
    const evCount            = evDetect.matchedTerms.length;
    const anachronismInEssay = evDetect.highlights.some(function (h) { return h.type === 'anachronism'; });
    // FIX1: declare links15 in outer scope so the details object below can always access it.
    // Previously declared with 'const' inside the if-block, causing ReferenceError every time
    // gradeLEQ ran — which the silent catch() in questionBank.js swallowed, producing 0/6.
    let links15 = [];
    let evidenceEarned = 0;
    if (!anachronismInEssay && evCount >= 2) {
      evidenceEarned = 1;
      links15 = findProximityLinks(resolved, evDetect.matchedTerms, config, 15);
      const linkedTerms = new Set(links15.map(function (l) { return l.evidence; }));
      if (linkedTerms.size >= 2) evidenceEarned = 2;
    }
    const evidence = {
      earned:     evidenceEarned,
      found:      evDetect.matchedTerms,
      niche:      evDetect.nicheTerms,
      flagged:    evDetect.flaggedTerms,
      highlights: evDetect.highlights
    };

    const analysis = gradeAnalysis(resolved, config, unitNum, evidence.found); // 25-word window, separate 2-pt criterion

    const allHighlights = evidence.highlights.slice();

    // Add logic highlights for causal connectors found in analysis links
    const connHighlighted = new Set();
    for (const link of analysis.links) {
      if (!connHighlighted.has(link.connector)) {
        allHighlights.push({ text: link.connector, type: 'logic' });
        connHighlighted.add(link.connector);
      }
    }

    const total = thesis.earned + context.earned + evidence.earned + analysis.earned;

    return {
      type:        'leq',
      totalEarned: total,
      max:         6,
      breakdown:   {
        thesis:   thesis.earned,
        context:  context.earned,
        evidence: evidence.earned,
        analysis: analysis.earned
      },
      highlights: allHighlights,
      details: {
        thesisMatch:   thesis.match,
        contextMatch:  context.match,
        evidenceFound: evidence.found,
        nicheFound:    evidence.niche,
        flagged:       evidence.flagged,
        analysisLinks: analysis.links,
        links15:       links15 // 15-word proximity links used for evidence 2pt check
      }
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  DBQ grader — 2026 CB Rubric:
  //  Thesis(1)+Context(1)+OutsideEvidence(1)+DocUse(2)+Sourcing(1) = 6 pts auto
  //  +1 Complexity point must be scored manually (not auto-graded)
  //  frqObj: the full FRQ object (needed for stimulus excerpts by gradeOutsideEvidence)
  // ─────────────────────────────────────────────────────────────────────────
  function gradeDBQ(text, config, unitNum, frqStimulus, frqObj) {
    if (!text || !text.trim()) {
      return {
        type: 'dbq', totalEarned: 0, max: 7,
        breakdown: { thesis: 0, context: 0, outsideEvidence: 0, docUse: 0, sourcing: 0 },
        highlights: [], details: {}
      };
    }

    const resolved  = resolveShorthands(text.toLowerCase(), config.shorthands);
    const thesis    = gradeThesis(resolved, config);
    const context   = gradeContext(resolved, config, unitNum);   // passes unitNum for fallback
    const outsideEv = gradeOutsideEvidence(resolved, config, unitNum, frqObj); // 2026 CB: outside evidence
    const citations = gradeCitations(text, frqStimulus);
    const sourcing  = gradeSourcing(resolved, config, citations);

    const allHighlights = outsideEv.highlights.slice();

    // Highlight document citations
    for (const docNum of citations.citations) {
      allHighlights.push({ text: 'Doc ' + docNum, type: 'evidence' });
    }

    // Highlight copy-warned citations
    for (const docNum of citations.copyWarnings) {
      allHighlights.push({
        text: 'Document ' + docNum,
        type: 'copy_warning',
        reason: 'Answer is more than 80% identical to the source document excerpt'
      });
    }

    // Add logic highlights for sourcing triggers found
    for (const ex of sourcing.examples) {
      allHighlights.push({ text: ex.trigger, type: 'logic' });
    }

    // Auto-complexity bonus: if student cited ALL documents in the set, award 1pt complexity
    const totalDocsInSet = (frqStimulus && frqStimulus.length) || 0;
    const autoComplexity = (totalDocsInSet > 0 && citations.validCount >= totalDocsInSet) ? 1 : 0;

    const total = thesis.earned + context.earned + outsideEv.earned +
                  citations.earned + sourcing.earned + autoComplexity;

    return {
      type:        'dbq',
      totalEarned: total,
      max:         7, // Thesis(1)+Context(1)+OutsideEv(1)+DocUse(2)+Sourcing(1)+Complexity(1)
      breakdown:   {
        thesis:          thesis.earned,
        context:         context.earned,
        outsideEvidence: outsideEv.earned,
        docUse:          citations.earned,
        sourcing:        sourcing.earned,
        complexity:      autoComplexity
      },
      highlights: allHighlights,
      details: {
        thesisMatch:      thesis.match,
        contextMatch:     context.match,
        outsideTerm:      outsideEv.outsideTerm,
        evidenceFound:    outsideEv.outsideTerm ? [outsideEv.outsideTerm] : [],
        citations:        citations.citations,
        copyWarnings:     citations.copyWarnings,
        sourcingExamples: sourcing.examples
      }
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  BUILD FEEDBACK — human-readable summary from grading result
  // ─────────────────────────────────────────────────────────────────────────
  function buildFeedback(result) {
    const missing   = [];
    const found     = [];
    const anachronisms  = [];
    const qualifierErrors = [];
    const copyWarnings  = (result.details && result.details.copyWarnings) || [];
    const bd = result.breakdown || {};

    if (bd.thesis === 0) missing.push('Thesis: include a reasoning process word (change, causation, comparison, continuity) in your opening claim');
    else found.push('Thesis reasoning detected');

    if (bd.context === 0) missing.push('Context: add a prior-era reference in your introduction (e.g., "Prior to...", "Before...", "Dating back to...")');
    else found.push('Historical context detected');

    const details = result.details || {};

    // Evidence feedback (DBQ uses outsideTerm; LEQ/SAQ use evidenceFound)
    const isDBQ = result.type === 'dbq';
    if (isDBQ) {
      if (bd.outsideEvidence > 0 && details.outsideTerm) {
        found.push('Outside Evidence: ' + details.outsideTerm);
      } else {
        missing.push('Outside Evidence: cite at least one historical term not drawn from the provided documents');
      }
    } else {
      if (details.evidenceFound && details.evidenceFound.length > 0) {
        found.push('Evidence: ' + details.evidenceFound.slice(0, 4).join(', ') + (details.evidenceFound.length > 4 ? '...' : ''));
      } else {
        missing.push('Evidence: no specific historical terms detected from the unit\'s evidence bucket');
      }
      if (details.nicheFound && details.nicheFound.length > 0) {
        found.push('Niche evidence: ' + details.nicheFound.slice(0, 3).join(', '));
      }
    }

    // Collect qualifier errors
    if (details.flagged) {
      for (const f of details.flagged) {
        qualifierErrors.push({ term: f.term, qualifier: f.qualifier, reason: f.reason });
        missing.push('Factual check: ' + f.reason);
      }
    }

    // Anachronism warnings (from highlights — now type 'anachronism')
    const warnHighlights = (result.highlights || []).filter(function (h) {
      return (h.type === 'anachronism' || h.type === 'warning') && h.reason && h.reason.startsWith('Anachronism');
    });
    for (const w of warnHighlights) {
      anachronisms.push(w.text);
    }

    const analysisLinks = details.analysisLinks || [];
    if (analysisLinks.length === 0 && result.type !== 'saq' && result.type !== 'dbq') {
      missing.push('Analysis: connect evidence to causation using words like "because," "led to," or "resulted in"');
    }

    // DBQ-specific
    if (isDBQ) {
      if (bd.docUse === 0) missing.push('Document Use: cite at least 3 documents (4+ for full credit) using (Doc 1) format');
      else if (bd.docUse === 1) missing.push('Document Use: cite at least 4 documents for full credit');
      if (bd.sourcing === 0) missing.push('Sourcing: apply HAPP analysis to at least 2 documents for the sourcing point');
      if (copyWarnings.length > 0) {
        missing.push('Copy Warning: Doc ' + copyWarnings.join(', Doc ') + ' — your response was too similar to the source excerpt; use your own words');
      }
      found.push('Note: Complexity point (1 additional pt) must be scored manually');
    }

    // Build summary
    const pct = result.max > 0 ? Math.round((result.totalEarned / result.max) * 100) : 0;
    let summary = 'Score suggestion: ' + result.totalEarned + '/' + result.max + ' pts (' + pct + '%). ';
    if (pct >= 80) summary += 'Strong response. ';
    else if (pct >= 50) summary += 'Developing response — see feedback below. ';
    else summary += 'Needs significant improvement. ';
    if (found.length > 0) summary += 'Detected: ' + found[0] + '.';

    return {
      summary:        summary,
      missing:        missing,
      found:          found,
      anachronisms:   anachronisms,
      qualifierErrors: qualifierErrors,
      copyWarnings:   copyWarnings
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  MAIN: grade(answer, frqType, unitNum, subjectKey)
  //  frqType: 'saq' | 'leq' | 'dbq'
  //  unitNum: integer 1-9
  //  answer: string (for SAQ: pass the full answers object { a: '...', b: '...', c: '...' })
  //  frqObj: optional full FRQ object (needed for DBQ stimulus)
  // ─────────────────────────────────────────────────────────────────────────
  function grade(answer, frqType, unitNum, subjectKey, frqObj) {
    subjectKey = subjectKey || 'apush';
    const config = (typeof FRQ_CONFIGS !== 'undefined' && FRQ_CONFIGS[subjectKey])
      ? FRQ_CONFIGS[subjectKey]
      : null;

    if (!config) {
      return {
        score: { total: 0, max: 0, breakdown: {} },
        ui_highlights: [],
        feedback: { summary: 'Configuration not loaded.', missing: [], found: [], anachronisms: [], qualifierErrors: [], copyWarnings: [] }
      };
    }

    let result;
    // FIX3: LEQ/SAQ Shield — only extract stimulus for DBQ. Accessing frqObj.stimulus on
    // an LEQ/SAQ question object (which has no stimulus) previously caused TypeError crashes
    // that the silent catch() blocks swallowed, producing blank panels and 0-point scores.
    const frqStimulus = (frqType === 'dbq' && frqObj && frqObj.stimulus) ? frqObj.stimulus : null;

    if (frqType === 'saq') {
      // For SAQ: answer should be an object { a: '...', b: '...', c: '...' }
      const answers = typeof answer === 'object' ? answer : { a: answer };
      result = gradeSAQ(answers, config, unitNum);
    } else if (frqType === 'leq') {
      const text = typeof answer === 'object' ? Object.values(answer).join('\n\n') : answer;
      result = gradeLEQ(text, config, unitNum);
    } else if (frqType === 'dbq') {
      const text = typeof answer === 'object' ? Object.values(answer).join('\n\n') : answer;
      result = gradeDBQ(text, config, unitNum, frqStimulus, frqObj); // frqObj needed for outside evidence
    } else {
      // Unknown type — treat as LEQ
      const text = typeof answer === 'object' ? Object.values(answer).join('\n\n') : answer;
      result = gradeLEQ(text, config, unitNum);
    }

    const feedback = buildFeedback(result);

    return {
      score: {
        total:     result.totalEarned,
        max:       result.max,
        breakdown: result.breakdown || {}
      },
      ui_highlights: result.highlights || [],
      feedback:      feedback,
      _raw:          result // internal use by renderAnalysisPanel
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  BUILD HIGHLIGHTED HTML
  //  Wraps detected terms in <span class="hl-{type}"> within the raw answer text.
  //  Handles overlapping highlights by priority: copy_warning > warning > evidence > niche > logic
  // ─────────────────────────────────────────────────────────────────────────
  function buildHighlightedHtml(rawAnswer, gradeResult) {
    if (!rawAnswer) return '';
    if (!gradeResult || !gradeResult.ui_highlights || gradeResult.ui_highlights.length === 0) {
      return escapeHtmlStr(rawAnswer);
    }

    // Priority order for overlapping highlights (lower = higher priority in overlaps)
    const PRIORITY = { copy_warning: 0, anachronism: 1, warning: 2, evidence: 3, niche: 4, logic: 5 };

    // Build a character-level annotation array
    const len = rawAnswer.length;
    const tags = new Array(len).fill(null); // tags[i] = {type, reason, termStart} or null

    const highlights = gradeResult.ui_highlights.slice().sort(function (a, b) {
      return (PRIORITY[a.type] || 99) - (PRIORITY[b.type] || 99);
    });

    for (const hl of highlights) {
      if (!hl.text) continue;
      const searchTerm = hl.text.toLowerCase();
      const lowerAnswer = rawAnswer.toLowerCase();
      let searchFrom = 0;
      let idx;
      while ((idx = lowerAnswer.indexOf(searchTerm, searchFrom)) !== -1) {
        const end = idx + hl.text.length;
        // Check priority: only annotate if not already tagged with higher priority
        let canTag = true;
        for (let c = idx; c < end; c++) {
          if (tags[c] !== null && (PRIORITY[tags[c].type] || 99) <= (PRIORITY[hl.type] || 99)) {
            canTag = false;
            break;
          }
        }
        if (canTag) {
          for (let c = idx; c < end; c++) {
            tags[c] = { type: hl.type, reason: hl.reason || '', termStart: idx };
          }
        }
        searchFrom = idx + 1;
      }
    }

    // Build HTML string from character annotations
    let html = '';
    let i = 0;
    while (i < len) {
      if (tags[i] === null) {
        html += escapeHtmlChar(rawAnswer[i]);
        i++;
      } else {
        // Find the extent of this tag span
        const startTag = tags[i];
        let j = i;
        while (j < len && tags[j] !== null && tags[j].termStart === startTag.termStart) j++;
        const spanText = rawAnswer.substring(i, j);
        const reasonAttr = startTag.reason ? ' data-reason="' + escapeHtmlStr(startTag.reason) + '"' : '';
        html += '<span class="hl-' + startTag.type + '"' + reasonAttr + '>' + escapeHtmlStr(spanText) + '</span>';
        i = j;
      }
    }
    return html;
  }

  function escapeHtmlStr(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeHtmlChar(ch) {
    if (ch === '&') return '&amp;';
    if (ch === '<') return '&lt;';
    if (ch === '>') return '&gt;';
    return ch;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────
  return {
    grade:               grade,
    buildHighlightedHtml: buildHighlightedHtml,
    // Expose internals for testing
    _levenshtein:        levenshtein,
    _fuzzyContains:      fuzzyContains,
    _tokenizeSentences:  tokenizeSentences,
    _computeOverlapRatio: computeOverlapRatio
  };

})();
