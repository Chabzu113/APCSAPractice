#!/usr/bin/env python3
"""
annotate_apstats.py — Auto-annotate all 60 questions in apstats_frq.js
Adds to each question:
  - autoGraded: true   (question level)
  - partLabel, skill, keywords  (per rubric item)

Keyword extraction strategy (AP Stats specific):
  PRIMARY — "Checklist: item1 | item2 | item3" in parts[i].rubric
    Each checklist item is parsed to extract the core concept:
      "States 'X'"      → x
      "Uses 'X' or 'Y'" → x, y
      "Identifies X"    → x
      "Correct X"       → x
      bare phrase       → lowercased phrase
  SECONDARY — AP Stats vocab dictionary with word-boundary matching

Skill derivation (no 'command:' field in Stats):
  Explain/Justify/Why/Does/Is/Test/Compare → 'explain'
  Describe/Interpret/What does             → 'describe'
  Identify/State/Name/List/Which           → 'describe'
  Calculate/Find/Compute/Construct/Estimate → 'calculate'
  default                                  → 'explain'

Usage:
  python3 scripts/annotate_apstats.py
"""

import re, os, sys, json

BASE       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_FILE = os.path.join(BASE, 'js', 'data', 'apstats_frq.js')

# ── AP Statistics vocabulary (word-boundary matched) ─────────────────────────
RAW_VOCAB = [
    # Exploring data / descriptive stats
    "mean", "median", "mode", "range", "interquartile range", "iqr",
    "standard deviation", "variance", "outlier", "skewed right", "skewed left",
    "symmetric", "bell-shaped", "normal distribution", "approximately normal",
    "boxplot", "box plot", "histogram", "dotplot", "dot plot", "stemplot",
    "stem-and-leaf plot", "frequency table", "relative frequency",
    "cumulative frequency", "ogive", "pie chart", "bar chart", "bar graph",
    "percentile", "quartile", "five number summary", "minimum", "maximum",
    "z-score", "standardized score", "modified boxplot",
    "resistant measure", "not resistant",
    "shape", "center", "spread", "unusual features",

    # Bivariate / regression
    "correlation", "correlation coefficient", "r value",
    "lurking variable", "confounding variable", "confounding",
    "causation", "correlation does not imply causation",
    "least squares regression line", "lsrl",
    "regression line", "regression equation",
    "slope", "y-intercept", "predicted value", "prediction",
    "explanatory variable", "response variable",
    "residual", "residual plot", "sum of squared residuals",
    "r-squared", "coefficient of determination",
    "influential point", "high leverage point", "extrapolation",
    "interpolation", "linear", "nonlinear", "curved pattern",
    "random scatter", "no pattern",
    "positive association", "negative association",
    "strong association", "weak association",

    # Collecting data / design
    "simple random sample", "srs", "stratified random sample",
    "cluster sample", "systematic sample", "convenience sample",
    "voluntary response sample", "voluntary response bias",
    "undercoverage", "nonresponse bias", "response bias",
    "sampling bias", "bias", "random assignment", "randomization",
    "observational study", "experiment", "census",
    "block design", "randomized block design", "matched pairs",
    "placebo", "placebo effect", "blinding", "double blind",
    "control group", "treatment group", "experimental unit",
    "confounding variable", "explanatory", "response",
    "replication", "random", "control", "statistically significant",
    "generalizable", "causation",

    # Probability
    "probability", "complement", "complement rule",
    "addition rule", "multiplication rule",
    "conditional probability", "given that",
    "independent events", "independence", "mutually exclusive",
    "disjoint events", "sample space", "event",
    "law of large numbers", "simulation",
    "equally likely outcomes", "geometric distribution",
    "binomial distribution", "binomial probability",
    "expected value", "mean of a distribution",
    "standard deviation of a distribution",
    "random variable", "discrete random variable",
    "continuous random variable", "probability distribution",
    "uniform distribution",

    # Sampling distributions / CLT
    "sampling distribution", "central limit theorem",
    "sampling distribution of the sample mean",
    "sampling distribution of the sample proportion",
    "standard error", "standard error of the mean",
    "unbiased estimator", "variability", "variability of the statistic",
    "normal approximation",

    # Confidence intervals
    "confidence interval", "margin of error", "confidence level",
    "critical value", "z-star", "t-star", "t critical value",
    "one-sample t interval", "two-sample t interval",
    "one-proportion z interval", "two-proportion z interval",
    "we are x% confident", "capture", "plausible values",
    "conditions", "random condition", "10 percent condition",
    "large counts condition", "normal condition",
    "nearly normal condition",

    # Hypothesis testing
    "null hypothesis", "alternative hypothesis",
    "p-value", "significance level", "alpha level", "alpha",
    "reject the null hypothesis", "fail to reject the null hypothesis",
    "statistically significant", "not statistically significant",
    "type i error", "type ii error", "power", "power of the test",
    "one-tailed test", "two-tailed test",
    "one-sample t test", "two-sample t test", "paired t test",
    "one-proportion z test", "two-proportion z test",
    "test statistic", "t statistic", "z statistic",
    "calculate the test statistic", "p-value interpretation",
    "assume the null is true", "in repeated samples",
    "conclude", "evidence",

    # Chi-square
    "chi-square test", "chi-square statistic",
    "chi-square goodness of fit", "chi-square test of independence",
    "chi-square test for homogeneity",
    "expected count", "observed count",
    "degrees of freedom", "chi-square distribution",
    "categorical variable",

    # Misc / AP Stats phrases
    "in context", "in the context of", "predict", "predicted",
    "estimated", "approximately", "roughly", "about",
    "parameter", "statistic", "population", "sample",
    "population mean", "population proportion",
    "sample mean", "sample proportion",
    "mu", "sigma", "p-hat", "x-bar",
    "plausible", "not plausible",
    "convincing evidence", "sufficient evidence",
]

VOCAB = sorted(list(set(v.lower() for v in RAW_VOCAB)), key=lambda x: -len(x))
VOCAB_PATTERNS = [(term, re.compile(r'\b' + re.escape(term) + r'\b')) for term in VOCAB]

# ── Skill derivation (from question text — no command field) ──────────────────
def derive_skill(question_text):
    q = question_text.lower().strip()
    # Calculate / construct
    if re.match(r'^(calculat|find|comput|determin|construct|estimat|what is the value|how many|how much)', q):
        return 'calculate'
    # Describe / interpret
    if re.match(r'^(describ|interpret|what does|what is meant|compare)', q):
        return 'describe'
    # Describe: identify / state / name / list / which
    if re.match(r'^(identif|state|name|list|which|what type|what kind)', q):
        return 'describe'
    # Explain: explain / justify / why / does / is / are / can / will / test / does
    return 'explain'

# ── Checklist item → core keyword(s) ─────────────────────────────────────────
def parse_checklist_item(item):
    item = item.strip()
    if not item:
        return []

    # "States 'X'" or "States X"
    m = re.match(r"States?\s+'([^']+)'", item, re.IGNORECASE)
    if m: return [m.group(1).lower()]

    # "Uses 'X' or 'Y'" or "Uses 'X'"
    m = re.match(r"Uses?\s+'([^']+)'(?:\s+or\s+'([^']+)')?", item, re.IGNORECASE)
    if m:
        result = [m.group(1).lower()]
        if m.group(2): result.append(m.group(2).lower())
        return result

    # "Identifies X phrase" / "Mentions X" / "Includes X" / etc.
    m = re.match(
        r'(?:Identifies?|Mentions?|Includes?|Shows?|Notes?|Applies?|References?|'
        r'Provides?|Interprets?|Labels?|Recognizes?|Verifies?|Confirms?|'
        r'Acknowledges?|Explains?|Checks?|Computes?|Calculates?|Uses?|'
        r'Evaluates?)\s+(.+)',
        item, re.IGNORECASE
    )
    if m:
        core = m.group(1).lower().rstrip('.,;')
        # Further clean: remove trailing " (X)" parentheticals
        core = re.sub(r'\s*\([^)]+\)\s*$', '', core).strip()
        return [core] if core else []

    # "Correct X"
    m = re.match(r'Correct\s+(.+)', item, re.IGNORECASE)
    if m:
        return [m.group(1).lower().rstrip('.,;')]

    # Bare phrase — return lowercased, cleaned
    cleaned = item.lower().rstrip('.,;').strip()
    # Skip noise phrases
    if re.match(r'^(e\.g\.|i\.e\.|etc\.|and|or|a|an|the)$', cleaned):
        return []
    return [cleaned] if len(cleaned) > 2 else []

# ── Keyword extractor ─────────────────────────────────────────────────────────
def extract_keywords(part_rubric_text, max_kw=10):
    found = []
    seen = set()

    # 1. Parse "Checklist:" items — PRIMARY source
    if 'Checklist:' in part_rubric_text:
        checklist_raw = part_rubric_text.split('Checklist:')[-1]
        # Handle literal \n in the string (in case they show as backslash-n)
        checklist_raw = checklist_raw.replace('\\n', '\n')
        # Take only the first line of the checklist (in case of multi-line)
        checklist_line = checklist_raw.split('\n')[0].strip()
        items = [i.strip() for i in checklist_line.split('|') if i.strip()]
        for item in items:
            core_kws = parse_checklist_item(item)
            for kw in core_kws:
                if kw and kw not in seen and len(kw) > 2:
                    found.append(kw)
                    seen.add(kw)
            if len(found) >= max_kw:
                return found[:max_kw]

    # 2. AP Stats vocab with word boundaries — SECONDARY
    text_lower = part_rubric_text.lower()
    for term, pattern in VOCAB_PATTERNS:
        if pattern.search(text_lower) and term not in seen:
            found.append(term)
            seen.add(term)
            if len(found) >= max_kw:
                return found[:max_kw]

    return found[:max_kw]

# ── Main ──────────────────────────────────────────────────────────────────────
def annotate(data):
    """Add autoGraded, partLabel, skill, keywords to each question."""
    for q in data:
        # Add question-level autoGraded flag
        q['autoGraded'] = True

        parts  = q.get('parts', [])
        rubric = q.get('rubric', [])

        for i, item in enumerate(rubric):
            if i < len(parts):
                part = parts[i]
            else:
                # Edge case: more rubric items than parts (shouldn't happen)
                part = {'label': chr(ord('a') + i), 'question': '', 'rubric': item.get('description', '')}

            item['partLabel'] = part.get('label', chr(ord('a') + i))
            item['skill']     = derive_skill(part.get('question', ''))
            item['keywords']  = extract_keywords(part.get('rubric', ''))

    return data

def serialize_to_js(data):
    """Serialize the annotated data back to a JS var declaration."""
    inner = json.dumps(data, indent=2, ensure_ascii=False)
    return f'var APSTATS_FRQ = {inner};\n'

if __name__ == '__main__':
    print(f'Reading {INPUT_FILE} ...')
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        raw = f.read()

    # Strip JS var wrapper → pure JSON
    # Remove "var APSTATS_FRQ = " prefix and trailing ";"
    stripped = raw.strip()
    if stripped.startswith('var APSTATS_FRQ ='):
        stripped = stripped[len('var APSTATS_FRQ ='):].strip()
    if stripped.endswith(';'):
        stripped = stripped[:-1].strip()

    data = json.loads(stripped)
    print(f'  Loaded {len(data)} questions')

    annotate(data)

    # Sanity checks
    auto_count = sum(1 for q in data if q.get('autoGraded'))
    kw_counts  = [len(item.get('keywords', [])) for q in data for item in q.get('rubric', [])]
    empty_kw   = sum(1 for k in kw_counts if k == 0)
    print(f'  autoGraded = True       → {auto_count}/{len(data)} questions')
    print(f'  rubric items total      → {len(kw_counts)}')
    print(f'  keywords extracted avg  → {sum(kw_counts)/len(kw_counts):.1f} per item')
    print(f'  items with 0 keywords   → {empty_kw} (expect 0)')

    # Show sample for SB-01 equivalent
    sample = data[0]
    print(f'\n  Sample: {sample["id"]} — {sample["title"]}')
    for item in sample['rubric']:
        print(f'    part {item["partLabel"]} ({item["skill"]}): {item["keywords"]}')

    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(serialize_to_js(data))
    print(f'\nDone. {INPUT_FILE} updated in-place.')
