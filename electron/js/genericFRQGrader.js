'use strict';
// GenericFRQGrader — Universal AP FRQ Auto-Grader
// Works for all subjects: AP Physics 1, AP Bio, AP Stats, AP Micro, AP Calc AB,
//                         AP Physics C: E&M, AP CS A
//
// Five grading protocols:
//   1. Keyword Bucket Scan      — fuzzy keyword detection per rubric item
//   2. 15-word Proximity Check  — cause + connector + effect within sliding window
//   3. QQT Rule                 — fundamental principle must be cited (configurable per subject)
//   4. CPE Protection           — consistent carry-forward error credited in later parts
//   5. Code Structure Check     — for skill:'code' items, skips proximity+QQT, keyword-only
//
// Public API:
//   window.GenericFRQGrader.grade(answerObj, frqType, unitNum, question, subjectConfig) → gradeResult
//
// Backward-compat alias: window.PhysicsGrader = window.GenericFRQGrader

(function () {

  // ── Levenshtein distance ─────────────────────────────────────────────────────
  function levenshtein(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp[i] = [i];
      for (var j = 1; j <= n; j++) dp[i][j] = i === 0 ? j : 0;
    }
    for (var j2 = 1; j2 <= n; j2++) dp[0][j2] = j2;
    for (var i2 = 1; i2 <= m; i2++) {
      for (var j3 = 1; j3 <= n; j3++) {
        dp[i2][j3] = a[i2-1] === b[j3-1]
          ? dp[i2-1][j3-1]
          : 1 + Math.min(dp[i2-1][j3], dp[i2][j3-1], dp[i2-1][j3-1]);
      }
    }
    return dp[m][n];
  }

  // ── Fuzzy single-word match: Levenshtein ≤ 20% of max length ────────────────
  function fuzzyMatch(word, target) {
    if (word === target) return true;
    var maxLen = Math.max(word.length, target.length);
    if (maxLen === 0) return true;
    if (Math.abs(word.length - target.length) > maxLen * 0.4) return false;
    return levenshtein(word, target) / maxLen <= 0.2;
  }

  // ── Tokenize to lowercase words ──────────────────────────────────────────────
  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  }

  // ── Math normalization — preserves ^, /, = while stripping spaces ───────────
  function normalizeMath(text) {
    var s = text.toLowerCase().replace(/\s+/g, '');
    s = s.replace(/\*\*/g, '^');
    s = s.replace(/×/g, '*');
    // Expand scientific notation: 2.4e6 → 2400000
    s = s.replace(/(\d+\.?\d*)e(\d+)/gi, function(_, base, exp) {
      return String(parseFloat(base) * Math.pow(10, parseInt(exp)));
    });
    return s;
  }

  // ── Protocol 1: Keyword Bucket Scan ─────────────────────────────────────────
  // Returns the first matching keyword string, or null.
  function scanKeywords(answerText, keywords) {
    if (!keywords || !keywords.length) return null;
    var lower = answerText.toLowerCase();
    // Sort multi-word phrases first to prevent sub-match shadowing
    var sorted = keywords.slice().sort(function(a, b) {
      return b.split(/\s+/).length - a.split(/\s+/).length;
    });
    // Whitespace-normalized versions for math expressions (e.g. "3x^2-6x+2" vs "3x^2 - 6x + 2")
    var lowerNoWS = lower.replace(/\s+/g, '');
    for (var i = 0; i < sorted.length; i++) {
      var kw = sorted[i].toLowerCase();
      if (lower.indexOf(kw) !== -1) return sorted[i];
      // Whitespace-normalized fallback — helps with math notation where students omit spaces
      var kwNoWS = kw.replace(/\s+/g, '');
      if (kwNoWS.length > 3 && lowerNoWS.indexOf(kwNoWS) !== -1) return sorted[i];
      // Math-normalized fallback — preserves ^, /, = and expands scientific notation
      var mathAnswer = normalizeMath(answerText);
      var mathKw = normalizeMath(sorted[i]);
      if (mathKw.length > 2 && mathAnswer.indexOf(mathKw) !== -1) return sorted[i];
      // Fuzzy single-word fallback
      if (kw.indexOf(' ') === -1) {
        var tokens = tokenize(answerText);
        for (var k = 0; k < tokens.length; k++) {
          if (fuzzyMatch(tokens[k], kw)) return sorted[i];
        }
      }
    }
    return null;
  }

  // ── Protocol 2: 15-word Proximity Check ─────────────────────────────────────
  // Returns a hit string "cause → connector → effect" or null.
  function proximityCheck(answerText, proximityConfig, windowSize) {
    if (!proximityConfig) return null;
    windowSize = windowSize || 15;
    var cause     = proximityConfig.cause     || [];
    var connector = proximityConfig.connector || [];
    var effect    = proximityConfig.effect    || [];
    var lower = answerText.toLowerCase();
    var words = lower.split(/\s+/);

    for (var i = 0; i < words.length; i++) {
      var start = Math.max(0, i - windowSize);
      var end   = Math.min(words.length, i + windowSize + 1);
      var slice = words.slice(start, end).join(' ');

      var causeHit     = null;
      var connectorHit = null;
      var effectHit    = null;

      for (var ci = 0; ci < cause.length; ci++) {
        if (slice.indexOf(cause[ci].toLowerCase()) !== -1) { causeHit = cause[ci]; break; }
      }
      for (var co = 0; co < connector.length; co++) {
        if (slice.indexOf(connector[co].toLowerCase()) !== -1) { connectorHit = connector[co]; break; }
      }
      for (var ei = 0; ei < effect.length; ei++) {
        if (slice.indexOf(effect[ei].toLowerCase()) !== -1) { effectHit = effect[ei]; break; }
      }

      if (causeHit && connectorHit && effectHit) {
        return causeHit + ' \u2192 ' + connectorHit + ' \u2192 ' + effectHit;
      }
    }
    return null;
  }

  // ── Protocol 3: QQT — Fundamental Principle check ───────────────────────────
  // principles[] comes from subjectConfig.principles (frqConfigs.js), not hardcoded.
  function qqtCheck(answerText, principles) {
    if (!principles || !principles.length) return true; // no principles configured → pass
    var lower = answerText.toLowerCase();
    for (var i = 0; i < principles.length; i++) {
      if (lower.indexOf(principles[i].toLowerCase()) !== -1) return true;
    }
    return false;
  }

  // ── Protocol 4: CPE Protection ───────────────────────────────────────────────
  // Returns true if source part was wrong but this part uses a consistent value.
  function cpeCheck(answerObj, rubricItem, gradeLog) {
    var sourceLabel = rubricItem.cpeSource;
    if (!sourceLabel) return false;
    var sourceEntry = gradeLog[sourceLabel];
    if (!sourceEntry || sourceEntry.awarded) return false; // only relevant if source part was wrong
    var sourceText = (answerObj[sourceLabel] || '').toLowerCase();
    var thisText = '';
    var ansKeys = Object.keys(answerObj);
    for (var i = 0; i < ansKeys.length; i++) {
      thisText += ' ' + (answerObj[ansKeys[i]] || '');
    }
    thisText = thisText.toLowerCase();
    // Extract numbers from source part; see if any appear consistently in this answer
    var nums = sourceText.match(/\d+\.?\d*/g) || [];
    for (var n = 0; n < nums.length; n++) {
      if (nums[n].length >= 1 && thisText.indexOf(nums[n]) !== -1) return true;
    }
    return false;
  }

  // ── Scope text selector ──────────────────────────────────────────────────────
  // For a rubric item, pick the most relevant portion of the student's answer.
  // Priority: explicit partLabel on rubric item > skill-matched part > fallback
  function scopeText(answerObj, rubricItem, parts) {
    // Explicit part mapping (used by Bio/Stats/Micro/Calc where multiple parts share a skill)
    if (rubricItem.partLabel && Object.prototype.hasOwnProperty.call(answerObj, rubricItem.partLabel)) {
      return answerObj[rubricItem.partLabel];
    }
    var skill = rubricItem.skill || 'general';
    var matchPart = null;
    for (var i = 0; i < (parts || []).length; i++) {
      if (parts[i].skill === skill) { matchPart = parts[i].label; break; }
    }
    if (matchPart && answerObj[matchPart]) return answerObj[matchPart];
    if (answerObj.essay) return answerObj.essay;
    return Object.values(answerObj).join('\n\n');
  }

  // ── Main grade() ─────────────────────────────────────────────────────────────
  // subjectConfig comes from FRQ_CONFIGS[question.subject] (frqConfigs.js).
  // subjectConfig.principles[] drives the QQT check.
  function grade(answerObj, frqType, unitNum, question, subjectConfig) {
    var cfg     = subjectConfig || {};
    var principles = cfg.principles || [];
    var rubric  = question.rubric || [];
    var parts   = question.parts  || [];
    var totalMax = rubric.reduce(function(s, r) { return s + (r.points || 1); }, 0);

    var pointsEarned  = [];
    var proximityHits = [];
    var missingLogic  = [];
    var gradeLog      = {};   // partLabel → { awarded, reason }
    var totalEarned   = 0;
    var cpeTriggered  = false;

    rubric.forEach(function(item) {
      var text    = scopeText(answerObj, item, parts);
      var awarded = false;
      var reason  = '';
      var isCode  = (item.skill === 'code');

      // ── Protocol 1: Keyword Bucket Scan ───────────────────────────────────
      var keyHit = scanKeywords(text, item.keywords || []);
      if (keyHit) {
        awarded = true;
        reason  = 'Key term found: \u201c' + keyHit + '\u201d';
      }

      // ── Protocol 2: Proximity Check (skipped for code items) ──────────────
      if (!isCode && item.proximity) {
        var proxHit = proximityCheck(text, item.proximity);
        if (proxHit) {
          proximityHits.push(proxHit);
          awarded = true;
          reason  = 'Proximity link: ' + proxHit;
        } else if (awarded) {
          missingLogic.push(
            '\u201c' + item.description + '\u201d \u2014 keyword present but causal chain incomplete'
          );
        } else {
          missingLogic.push('Missing proximity link for: \u201c' + item.description + '\u201d');
        }
      }

      // ── Protocol 3: QQT check (skipped for code items) ────────────────────
      if (!isCode && item.fundamentalPrinciple && awarded && !qqtCheck(text, principles)) {
        awarded = false;
        reason  = 'QQT: Fundamental Principle not cited — must explicitly state the core law or theorem';
        missingLogic.push('QQT violation: \u201c' + item.description + '\u201d requires stating the Fundamental Principle');
      }

      // ── Protocol 4: CPE Protection ────────────────────────────────────────
      if (!awarded && item.cpeSource) {
        var cpeApplied = cpeCheck(answerObj, item, gradeLog);
        if (cpeApplied) {
          awarded = true;
          cpeTriggered = true;
          reason  = 'CPE Protection: consistent carry-forward error \u2014 credit awarded';
        }
      }

      // Log result keyed by part label for CPE look-up by subsequent items
      var partLabel = (function() {
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].skill === (item.skill || '')) return parts[i].label;
        }
        return String(item.index);
      }());
      gradeLog[partLabel] = { awarded: awarded, reason: reason };

      if (awarded) totalEarned += (item.points || 1);
      if (!awarded && !reason) {
        reason = 'Missing: ' + (item.keywords || []).slice(0, 3).join(', ');
      }

      pointsEarned.push({
        index:       item.index,
        description: item.description,
        awarded:     awarded,
        reason:      reason
      });
    });

    var idealLatex = (question.idealResponse && question.idealResponse.latex) || '';
    var idealProse = (question.idealResponse && question.idealResponse.prose)  || '';

    return {
      // ── Canonical JSON schema ──────────────────────────────────────────────
      total_score:          totalEarned + '/' + totalMax,
      points_earned:        pointsEarned,
      proximity_hits:       proximityHits,
      missing_logic:        missingLogic,
      cpe_triggered:        cpeTriggered,
      ideal_response_latex: idealLatex,
      ideal_response_prose: idealProse,
      // ── questionBank.js compatibility ─────────────────────────────────────
      score: {
        total:     totalEarned,
        max:       totalMax,
        breakdown: {}
      },
      feedback: {
        summary: 'Score: ' + totalEarned + '/' + totalMax + ' pts',
        found:   pointsEarned.filter(function(p) { return  p.awarded; }).map(function(p) { return p.description; }),
        missing: pointsEarned.filter(function(p) { return !p.awarded; }).map(function(p) { return p.description; })
      }
    };
  }

  // ── Public API ───────────────────────────────────────────────────────────────
  window.GenericFRQGrader = { grade: grade };

  // Backward-compatible alias so existing apphys1 call-sites keep working
  window.PhysicsGrader = window.GenericFRQGrader;

}());
