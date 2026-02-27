#!/usr/bin/env python3
"""
annotate_apmicro.py — Auto-annotate all 30 questions in apmicro_frq.js
Adds to each question:
  - autoGraded: true   (question level)
  - skill, keywords    (per rubric item — NO partLabel since parts[] is empty)

All questions have empty parts[] → student answers in single essay editor
→ answerObj.essay. All rubric items check the full essay via scopeText() fallback.

Keyword extraction strategy:
  PRIMARY  — parse the "1pt: description." rubric text:
               Strip "Npt: " prefix, then:
               - Quoted 'terms' → direct keywords
               - "State that X" / "Explain that X" → core phrase from X
               - "Show/Label/Shade X" → graph element keywords
  SECONDARY — AP Micro vocab dictionary with word-boundary matching

Skill derivation from "1pt:" prefix text:
  "Correct..."  / "Show..." / "Shade..." / "Label..." → 'graph'
  "State that..." / "State 'X'"                       → 'describe'
  "Explain that..."                                   → 'explain'
  "Calculate..." / "Compute..."                       → 'calculate'
  default                                             → 'explain'

Usage:
  python3 scripts/annotate_apmicro.py
"""

import re, os, sys, json

BASE       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_FILE = os.path.join(BASE, 'js', 'data', 'apmicro_frq.js')

# ── AP Micro vocabulary (word-boundary matched, longest-first) ────────────────
RAW_VOCAB = [
    # Unit 1 — Basic Economic Concepts
    "production possibilities curve", "production possibility curve",
    "production possibilities frontier", "ppf", "ppc",
    "opportunity cost", "increasing opportunity costs",
    "law of increasing opportunity costs",
    "comparative advantage", "absolute advantage",
    "specialization", "trade", "terms of trade",
    "perfectly adaptable", "not perfectly adaptable",
    "bowed out", "bowed-out", "concave", "convex",
    "economic growth", "full employment", "efficient",
    "attainable", "unattainable", "inside the ppc",
    "outside the ppc", "on the ppc",
    "marginal benefit", "marginal cost",
    "trade-off", "scarcity", "resources",
    "capital goods", "consumer goods",

    # Unit 2 — Supply and Demand
    "law of demand", "law of supply",
    "supply and demand", "supply curve", "demand curve",
    "quantity demanded", "quantity supplied",
    "equilibrium price", "equilibrium quantity",
    "equilibrium", "market equilibrium",
    "consumer surplus", "producer surplus",
    "total surplus", "social surplus",
    "deadweight loss", "market failure",
    "price ceiling", "price floor",
    "shortage", "surplus",
    "price elastic", "price inelastic",
    "unit elastic", "perfectly elastic", "perfectly inelastic",
    "elastic demand", "inelastic demand",
    "price elasticity of demand", "price elasticity of supply",
    "total revenue", "total revenue test",
    "substitute", "complement", "inferior good", "normal good",
    "income effect", "substitution effect",
    "change in quantity demanded", "change in demand",
    "change in quantity supplied", "change in supply",
    "rightward shift", "leftward shift",
    "shift in demand", "shift in supply",
    "increase in demand", "decrease in demand",
    "increase in supply", "decrease in supply",
    "input cost", "input price",
    "number of sellers", "number of buyers",
    "consumer income", "consumer tastes",
    "price of related goods",
    "determinants of demand", "determinants of supply",
    "per-unit tax", "per unit tax", "excise tax",
    "tax incidence", "tax burden",
    "subsidy",
    "indeterminate", "ambiguous",

    # Unit 3 — Production, Cost, Perfect Competition
    "marginal cost", "marginal revenue",
    "average total cost", "average variable cost", "average fixed cost",
    "total cost", "total revenue", "total variable cost", "total fixed cost",
    "atc", "avc", "afc", "mc", "mr",
    "mr = mc", "mr=mc", "profit maximization", "profit-maximizing",
    "economic profit", "accounting profit", "normal profit",
    "zero economic profit", "break even", "break-even",
    "shutdown rule", "shutdown point",
    "variable cost", "fixed cost", "sunk cost",
    "perfect competition", "perfectly competitive",
    "price taker", "price maker",
    "short run", "long run", "short-run", "long-run",
    "long-run equilibrium", "long run equilibrium",
    "productive efficiency", "allocative efficiency",
    "minimum atc", "minimum average total cost",
    "entry of firms", "exit of firms",
    "new firms enter", "firms exit",
    "economic losses", "economic profits attract",

    # Unit 4 — Imperfect Competition
    "monopoly", "monopolist", "monopolistic",
    "monopolistic competition", "oligopoly",
    "price discrimination", "first-degree price discrimination",
    "perfect price discrimination",
    "natural monopoly",
    "economies of scale",
    "marginal revenue curve", "mr curve",
    "downward sloping demand", "downward-sloping",
    "mr < price", "mr less than price",
    "qm", "pm", "qso",
    "allocatively inefficient", "allocative inefficiency",
    "deadweight loss eliminated", "deadweight loss reduced",
    "lump-sum tax", "lump sum tax",
    "does not affect marginal cost",
    "fixed cost does not affect",
    "game theory", "nash equilibrium", "prisoner's dilemma",
    "dominant strategy",
    "collusion", "cartel", "kinked demand",
    "incentive to cheat",
    "product differentiation",
    "excess capacity", "excess capacity theorem",

    # Unit 5 — Factor Markets
    "factor market", "resource market",
    "labor market", "labor demand", "labor supply",
    "wage", "wage rate", "equilibrium wage",
    "derived demand", "value of marginal product",
    "marginal revenue product", "mrp",
    "marginal resource cost", "mrc",
    "monopsony", "wage discrimination",
    "minimum wage", "economic rent",
    "land supply", "perfectly inelastic supply",
    "capital", "human capital",
    "mrc = mrp", "mrp = mrc",
    "hire more workers", "hire fewer workers",

    # Unit 6 — Externalities and Market Failure
    "negative externality", "positive externality",
    "externality", "external cost", "external benefit",
    "marginal social cost", "marginal private cost",
    "marginal social benefit", "marginal private benefit",
    "msc", "mpc", "msb", "mpb",
    "marginal external cost", "mec",
    "pigouvian tax", "corrective tax",
    "overproduction", "underproduction",
    "social optimum", "socially optimal",
    "coase theorem",
    "public good", "free rider", "free-rider problem",
    "nonexcludable", "nonrival",
    "cannot be excluded", "unable to exclude",
    "income inequality", "lorenz curve", "gini coefficient",
    "taxes and transfers",
    "regulate", "government intervention",
    "understate", "understate their value",
    "additional benefit", "additional cost",
    "regardless of price",

    # Unit 6 continued — public goods / commons
    "non-excludable", "nonexcludable", "non-rivalrous", "nonrivalrous",
    "tragedy of the commons", "free rider problem", "free-rider problem",
    "market power", "prevent resale", "resale", "segregate",
    "ability to price discriminate",

    # Consumer theory
    "marginal utility", "diminishing marginal utility",
    "utility-maximizing", "utility maximizing",
    "consumer equilibrium", "equal marginal utility per dollar",
    "mux/px", "mu/p", "budget constraint",
    "consumer theory",

    # Misc economic terms
    "elasticity", "inelastic supply",
    "rent", "economic rent", "land rent",
    "perfectly inelastic",
    "quantity does not change",
    "price increases", "price decreases",
    "quantity increases", "quantity decreases",
    "wages increase", "wages decrease",
    "profit increases", "profit decreases",
    "revenue increases", "revenue decreases",
    "firms enter", "firms exit",
    "shift right", "shift left",
    "decrease in supply", "increase in supply",
    "decrease in demand", "increase in demand",
    "labor demand", "labor supply",
    "demand for labor", "supply of labor",
    "shift demand for labor", "labor demand shifts",
    "point e", "point u", "point a", "point b",
    "on the curve", "inside the curve", "outside the curve",
    "placed on the curve", "on the ppc",
    "s&d labor", "labor graph", "labor market graph",
    "nash equilibrium payoff",

    # Graph / diagram vocabulary
    "correctly labeled", "correctly drawn",
    "axes labeled", "axis labeled",
    "downward sloping", "upward sloping",
    "horizontal", "vertical",
    "shifts right", "shifts left", "shifts up", "shifts down",
    "outward rotation", "inward rotation",
    "triangle", "rectangle", "area",
    "shaded area", "shade the area",
    "intersection", "intersect",
    "supply and demand graph", "s&d graph",
    "labor market graph",
]

VOCAB = sorted(list(set(v.lower() for v in RAW_VOCAB)), key=lambda x: -len(x))
VOCAB_PATTERNS = [(term, re.compile(r'\b' + re.escape(term) + r'\b')) for term in VOCAB]

# ── Skill derivation from "1pt:" rubric description text ─────────────────────
def derive_skill(desc):
    # Strip leading "Npt: " prefix
    text = re.sub(r'^\d+pt:\s*', '', desc).strip()
    lower = text.lower()

    if re.match(r'^(correct|show |shade |label |draw |plot )', lower):
        return 'graph'
    if re.match(r'^(state that|state \')', lower):
        return 'describe'
    if re.match(r'^(explain that|explain )', lower):
        return 'explain'
    if re.match(r'^(calculat|comput|determin the (?:price|quantity|profit|cost|revenue))', lower):
        return 'calculate'
    return 'explain'

# ── Keyword extractor ─────────────────────────────────────────────────────────
def extract_keywords(desc, max_kw=8):
    # Strip "Npt: " prefix
    text = re.sub(r'^\d+pt:\s*', '', desc).strip()
    text_lower = text.lower()
    found = []
    seen = set()

    # 1. Quoted 'EXACT TERM' — highest signal
    # e.g. "State 'Marginal External Cost (MEC)'" → "marginal external cost (mec)"
    # (?<!\w) prevents matching apostrophes in possessives like "Pat's", "Chris's"
    for m in re.finditer(r"(?<!\w)'([^']+)'", text):
        kw = m.group(1).lower().strip()
        if kw and kw not in seen and len(kw) > 1:
            # Also add without parenthetical part if present
            base = re.sub(r'\s*\([^)]+\)\s*$', '', kw).strip()
            if base and base not in seen:
                found.append(base)
                seen.add(base)
            if kw != base and kw not in seen:
                found.append(kw)
                seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    # 2. "State that X." / "Explain that X" — extract core phrase (≤8 words)
    m = re.match(
        r'(?:State|Explain|Show|Confirm|Note)\s+that\s+(.+?)(?:\s+\(|\.?\s*$)',
        text, re.IGNORECASE
    )
    if m:
        core = m.group(1).lower().strip().rstrip('.,;')
        word_count = len(core.split())
        if core and core not in seen and 3 < len(core) < 70 and word_count <= 8:
            found.append(core)
            seen.add(core)
        if len(found) >= max_kw:
            return found[:max_kw]

    # 3. "State/Identify/Note X" without "that" — extract core noun phrase (≤5 words)
    m2 = re.match(
        r'(?:Identify|Note|Recognize|Label)\s+([A-Za-z][^.(]+?)(?:\s*[\(.;]|\.?\s*$)',
        text, re.IGNORECASE
    )
    if m2:
        core = m2.group(1).lower().strip().rstrip('.,;')
        word_count = len(core.split())
        if core and core not in seen and 2 < len(core) < 45 and word_count <= 5:
            # Skip single-word proper names like "Alex", "Sam", "Pat"
            if not re.match(r'^[A-Z][a-z]+$', m2.group(1).strip()):
                found.append(core)
                seen.add(core)
        if len(found) >= max_kw:
            return found[:max_kw]

    # 4. Comma-separated multi-concept items e.g. "Non-excludable and Non-rivalrous"
    if ',' in text_lower or ' and ' in text_lower:
        # Split on commas/and and try each chunk
        parts_raw = re.split(r',\s*|\s+and\s+', text)
        for part in parts_raw:
            kw = part.lower().strip().rstrip('.,;')
            # Check if any vocab term matches this chunk
            for term, pattern in VOCAB_PATTERNS:
                if pattern.search(kw) and term not in seen:
                    found.append(term)
                    seen.add(term)
                    break
            if len(found) >= max_kw:
                return found[:max_kw]

    # 5. AP Micro vocab with word boundaries (full text)
    for term, pattern in VOCAB_PATTERNS:
        if pattern.search(text_lower) and term not in seen:
            found.append(term)
            seen.add(term)
            if len(found) >= max_kw:
                return found[:max_kw]

    # 6. Parenthetical terms — e.g. "(Law of Increasing Opportunity Costs)"
    for m in re.finditer(r'\(([A-Z][^)]+)\)', text):
        kw = m.group(1).lower().strip()
        if kw and kw not in seen and 3 <= len(kw) <= 60:
            found.append(kw)
            seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    return found[:max_kw]

# ── Main ──────────────────────────────────────────────────────────────────────
def annotate(data):
    for q in data:
        q['autoGraded'] = True
        text_label_idx = 0
        for item in q.get('rubric', []):
            item['skill'] = derive_skill(item.get('description', ''))
            if item['skill'] == 'graph':
                # Graph items: self-check via checkbox — 'yes' keyword matches checked state
                item['partLabel'] = 'graph'
                item['keywords']  = ['yes']
            else:
                # Text items: each gets its own labelled textarea (a, b, c, ...)
                item['partLabel'] = chr(ord('a') + text_label_idx)
                item['keywords']  = extract_keywords(item.get('description', ''))
                text_label_idx += 1
    return data

def serialize_to_js(data, var_name='APMICRO_FRQ'):
    inner = json.dumps(data, indent=2, ensure_ascii=False)
    return f'var {var_name} = {inner};\n'

if __name__ == '__main__':
    print(f'Reading {INPUT_FILE} ...')
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        raw = f.read()

    # Strip JS var wrapper
    stripped = raw.strip()
    if stripped.startswith('var APMICRO_FRQ ='):
        stripped = stripped[len('var APMICRO_FRQ ='):].strip()
    if stripped.endswith(';'):
        stripped = stripped[:-1].strip()

    data = json.loads(stripped)
    print(f'  Loaded {len(data)} questions')

    annotate(data)

    # Sanity checks
    auto_count = sum(1 for q in data if q.get('autoGraded'))
    all_items  = [item for q in data for item in q.get('rubric', [])]
    kw_counts  = [len(item.get('keywords', [])) for item in all_items]
    empty_kw   = sum(1 for k in kw_counts if k == 0)
    print(f'  autoGraded = True  → {auto_count}/{len(data)} questions')
    print(f'  rubric items total → {len(all_items)}')
    print(f'  avg keywords/item  → {sum(kw_counts)/max(len(kw_counts),1):.1f}')
    print(f'  items with 0 kw    → {empty_kw}')

    # Show 3 sample questions
    print('\n  Samples:')
    for q in data[:3]:
        print(f'    [{q["id"]}] {q["title"]}')
        for item in q['rubric'][:2]:
            print(f'      {item["skill"]:9s} | {item["keywords"]}')

    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(serialize_to_js(data))
    print(f'\nDone. {INPUT_FILE} updated in-place.')
