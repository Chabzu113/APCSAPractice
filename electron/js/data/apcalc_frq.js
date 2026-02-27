var APCALC_FRQ = [

  // ── UNIT 1: Limits and Continuity ───────────────────────────────────────────

  {
    "id": "calc-u1-frq001",
    "subject": "apcalcab",
    "units": [1],
    "topic": "Limits and Continuity",
    "title": "Piecewise Function: Limits, Continuity, and IVT",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f be a function defined by:\n\nf(x) = { x² + 1,  if x < 2\n        { 3x − 1,  if x ≥ 2\n\nAnswer the following questions about f.",
    "parts": [
      { "label": "a", "question": "Find lim(x→2⁻) f(x) and lim(x→2⁺) f(x). Show your work." },
      { "label": "b", "question": "Is f continuous at x = 2? Justify your answer using the definition of continuity." },
      { "label": "c", "question": "Does the Intermediate Value Theorem guarantee a value c in [1, 3] such that f(c) = 4? Justify." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Left-hand limit: lim(x→2⁻) f(x) = 5 via x² + 1",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["5", "x^2 + 1", "left", "lim", "2^2 + 1", "4 + 1"]
      },
      {
        "points": 1,
        "description": "Right-hand limit: lim(x→2⁺) f(x) = 5 via 3x − 1",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["5", "3(2) - 1", "3x - 1", "right", "6 - 1"]
      },
      {
        "points": 1,
        "description": "f is continuous at x = 2 because both limits equal f(2) = 5",
        "partLabel": "b",
        "skill": "explain",
        "keywords": ["continuous", "both limits equal", "f(2) = 5", "limit equals f(2)", "equal 5"]
      },
      {
        "points": 1,
        "description": "IVT applies: f is continuous on [1,3], f(1)=2 < 4 < 5=f(3), so IVT guarantees c",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["ivt", "intermediate value", "continuous", "f(1) = 2", "f(3) = 5", "between", "guarantees"]
      }
    ]
  },

  {
    "id": "calc-u1-frq002",
    "subject": "apcalcab",
    "units": [1],
    "topic": "Limits and Continuity",
    "title": "Algebraic Limits and L'Hôpital's Rule",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Consider the following limit expressions. For each, evaluate the limit or explain why it does not exist.",
    "parts": [
      { "label": "a", "question": "Evaluate: lim(x→3) (x² − 9) / (x − 3)" },
      { "label": "b", "question": "Evaluate: lim(x→0) sin(4x) / (2x)" },
      { "label": "c", "question": "Evaluate: lim(x→∞) (3x² − 2x + 1) / (5x² + 7)" }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Factor and cancel: (x+3)(x-3)/(x-3) = x+3 → limit = 6",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["6", "factor", "x + 3", "(x+3)(x-3)", "cancel", "x - 3"]
      },
      {
        "points": 1,
        "description": "Use lim(θ→0) sin(θ)/θ = 1: sin(4x)/(2x) = (4/2)·sin(4x)/(4x) → 2",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["2", "sin(4x)/4x", "sin(theta)/theta", "limit of sinx/x", "4/2", "l'hopital"]
      },
      {
        "points": 1,
        "description": "Divide by x²: (3 − 2/x + 1/x²)/(5 + 7/x²) → 3/5",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["3/5", "leading coefficient", "divide by x^2", "3 over 5", "degree", "l'hopital"]
      }
    ]
  },

  {
    "id": "calc-u1-frq003",
    "subject": "apcalcab",
    "units": [1],
    "topic": "Limits and Continuity",
    "title": "Continuity Parameters and Differentiability",
    "difficulty": "hard",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let g be a function defined by:\n\ng(x) = { ax² + b,  if x ≤ 1\n        { 3x + 2,   if x > 1\n\nwhere a and b are constants.",
    "parts": [
      { "label": "a", "question": "Find values of a and b so that g is continuous at x = 1." },
      { "label": "b", "question": "Using the values found in (a), determine whether g is differentiable at x = 1. Justify." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Set up continuity condition: a(1)² + b = 3(1) + 2 → a + b = 5",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["a + b = 5", "a(1) + b", "continuous", "equal", "a + b"]
      },
      {
        "points": 1,
        "description": "One additional condition needed (e.g. b = 0 gives a = 5); any consistent pair accepted",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["a + b = 5", "any value", "infinite solutions", "one equation two unknowns", "infinitely many"]
      },
      {
        "points": 1,
        "description": "Left derivative: lim(x→1⁻) g'(x) = 2ax; Right derivative: g'(x) = 3. Differentiable if 2a = 3, i.e. a = 3/2",
        "partLabel": "b",
        "skill": "explain",
        "keywords": ["2a", "left derivative", "2a(1)", "right derivative is 3", "equal", "differentiable", "not differentiable", "3/2"]
      }
    ]
  },

  // ── UNIT 2: Differentiation — Basic Rules ────────────────────────────────────

  {
    "id": "calc-u2-frq001",
    "subject": "apcalcab",
    "units": [2],
    "topic": "Basic Differentiation",
    "title": "Derivative Rules and Tangent Lines",
    "difficulty": "easy",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = x³ − 3x² + 2x + 4.",
    "parts": [
      { "label": "a", "question": "Find f'(x)." },
      { "label": "b", "question": "Find the equation of the tangent line to f at x = 1." },
      { "label": "c", "question": "Find all x-values where the tangent line to f is horizontal." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f'(x) = 3x² − 6x + 2",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["3x^2 - 6x + 2", "3x^2 − 6x + 2", "3x² - 6x + 2", "power rule"]
      },
      {
        "points": 1,
        "description": "f(1) = 1 − 3 + 2 + 4 = 4; f'(1) = 3 − 6 + 2 = −1; tangent: y − 4 = −1(x − 1) or y = −x + 5",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["y = -x + 5", "y - 4 = -1(x - 1)", "slope -1", "f(1) = 4", "f'(1) = -1"]
      },
      {
        "points": 1,
        "description": "Set f'(x) = 0: 3x² − 6x + 2 = 0; x = (6 ± √12) / 6 = 1 ± √3/3",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["f'(x) = 0", "3x^2 - 6x + 2 = 0", "horizontal tangent", "quadratic formula", "1 ± √3/3", "1 + sqrt(3)/3"]
      }
    ]
  },

  {
    "id": "calc-u2-frq002",
    "subject": "apcalcab",
    "units": [2],
    "topic": "Basic Differentiation",
    "title": "Average vs. Instantaneous Rate of Change",
    "difficulty": "easy",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "A particle moves along a number line. Its position at time t ≥ 0 is given by s(t) = t³ − 6t² + 9t + 2 (in meters, t in seconds).",
    "parts": [
      { "label": "a", "question": "Find the average rate of change of s on the interval [1, 3]." },
      { "label": "b", "question": "Find the velocity v(t) and acceleration a(t) of the particle." },
      { "label": "c", "question": "At what time(s) is the particle at rest? Show your work." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "AROC = [s(3) − s(1)] / (3 − 1) = (2 − 6) / 2 = −2 m/s",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["-2", "s(3) - s(1)", "average rate", "(s(3) - s(1)) / 2", "−2 m/s"]
      },
      {
        "points": 1,
        "description": "v(t) = 3t² − 12t + 9 and a(t) = 6t − 12",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["3t^2 - 12t + 9", "3t² - 12t + 9", "6t - 12", "velocity", "acceleration"]
      },
      {
        "points": 1,
        "description": "v(t) = 0: 3t² − 12t + 9 = 3(t−1)(t−3) = 0 → t = 1 and t = 3",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["t = 1", "t = 3", "v(t) = 0", "factor", "at rest", "3(t-1)(t-3)"]
      }
    ]
  },

  {
    "id": "calc-u2-frq003",
    "subject": "apcalcab",
    "units": [2],
    "topic": "Basic Differentiation",
    "title": "Product and Quotient Rule",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = x² sin(x) and g(x) = (x² + 1) / (x − 2).",
    "parts": [
      { "label": "a", "question": "Find f'(x) using the product rule." },
      { "label": "b", "question": "Find g'(x) using the quotient rule." },
      { "label": "c", "question": "Find all x-values in [0, 2π] where f'(x) = 0." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f'(x) = 2x·sin(x) + x²·cos(x) by product rule",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["2x sin(x) + x^2 cos(x)", "2x·sin(x)", "x^2·cos(x)", "product rule", "2x sin x + x^2 cos x"]
      },
      {
        "points": 1,
        "description": "g'(x) = [(2x)(x−2) − (x²+1)(1)] / (x−2)² = (x²−4x−1)/(x−2)²",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["quotient rule", "(x-2)^2", "2x(x-2)", "x^2 - 4x - 1", "(x^2+1)(1)"]
      },
      {
        "points": 1,
        "description": "f'(x) = 0: x = 0 (multiplicity) and tan(x) = -2x/x = -2 solutions",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["x = 0", "2x sin(x) + x^2 cos(x) = 0", "x(2 sin(x) + x cos(x)) = 0", "factor out x"]
      }
    ]
  },

  // ── UNIT 3: Advanced Differentiation ────────────────────────────────────────

  {
    "id": "calc-u3-frq001",
    "subject": "apcalcab",
    "units": [3],
    "topic": "Advanced Differentiation",
    "title": "Chain Rule Application",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let h(x) = (x³ + 1)⁴.",
    "parts": [
      { "label": "a", "question": "Find h'(x) using the chain rule. Show each step." },
      { "label": "b", "question": "Evaluate h'(−1)." },
      { "label": "c", "question": "Write the equation of the tangent line to h at x = −1." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "h'(x) = 4(x³+1)³ · 3x² = 12x²(x³+1)³ by chain rule",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["chain rule", "4(x^3+1)^3", "3x^2", "12x^2(x^3+1)^3", "12x²(x³+1)³"]
      },
      {
        "points": 1,
        "description": "h'(−1) = 12(1)²((−1)³+1)³ = 12(1)(0)³ = 0",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["0", "h'(-1) = 0", "(-1)^3 + 1 = 0", "(-1+1)^3"]
      },
      {
        "points": 1,
        "description": "h(−1) = (0)⁴ = 0; slope = 0; tangent: y = 0",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["y = 0", "h(-1) = 0", "slope 0", "horizontal tangent", "y - 0 = 0"]
      }
    ]
  },

  {
    "id": "calc-u3-frq002",
    "subject": "apcalcab",
    "units": [3],
    "topic": "Advanced Differentiation",
    "title": "Implicit Differentiation",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "A curve is defined implicitly by x² + xy + y² = 7.",
    "parts": [
      { "label": "a", "question": "Use implicit differentiation to find dy/dx." },
      { "label": "b", "question": "Find the slope of the curve at the point (1, 2)." },
      { "label": "c", "question": "Write the equation of the tangent line at (1, 2)." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "2x + y + x(dy/dx) + 2y(dy/dx) = 0 → dy/dx = −(2x + y)/(x + 2y)",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["dy/dx = -(2x + y)/(x + 2y)", "implicit differentiation", "2x + y + x(dy/dx) + 2y(dy/dx) = 0", "-(2x+y)/(x+2y)"]
      },
      {
        "points": 1,
        "description": "At (1, 2): dy/dx = −(2+2)/(1+4) = −4/5",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["-4/5", "slope = -4/5", "-(4)/(5)", "-0.8", "−4/5"]
      },
      {
        "points": 1,
        "description": "y − 2 = (−4/5)(x − 1) or y = −4x/5 + 14/5",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["y - 2 = (-4/5)(x - 1)", "y = -4x/5 + 14/5", "-4/5", "point-slope", "tangent"]
      }
    ]
  },

  {
    "id": "calc-u3-frq003",
    "subject": "apcalcab",
    "units": [3],
    "topic": "Advanced Differentiation",
    "title": "Derivatives of Logarithmic and Exponential Functions",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = ln(x² + 4) and g(x) = x·e^(2x).",
    "parts": [
      { "label": "a", "question": "Find f'(x)." },
      { "label": "b", "question": "Find g'(x) using the product rule." },
      { "label": "c", "question": "Find all x where f'(x) = 0." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f'(x) = 2x / (x² + 4) by chain rule with ln",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["2x / (x^2 + 4)", "2x/(x²+4)", "chain rule", "1/(x^2+4) · 2x", "derivative of ln"]
      },
      {
        "points": 1,
        "description": "g'(x) = e^(2x) + x·2e^(2x) = e^(2x)(1 + 2x) by product rule",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["e^(2x)(1 + 2x)", "e^(2x) + 2xe^(2x)", "product rule", "e^(2x)(1+2x)"]
      },
      {
        "points": 1,
        "description": "f'(x) = 0: 2x = 0 → x = 0",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["x = 0", "2x = 0", "numerator equals 0", "f'(x) = 0"]
      }
    ]
  },

  // ── UNIT 4: Contextual Applications of Differentiation ──────────────────────

  {
    "id": "calc-u4-frq001",
    "subject": "apcalcab",
    "units": [4],
    "topic": "Contextual Applications of Differentiation",
    "title": "Related Rates — Expanding Circle",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Oil spills onto the surface of water and spreads in a circular shape. The radius of the circular spill is increasing at a rate of 2 meters per minute.",
    "parts": [
      { "label": "a", "question": "Write an equation relating the area A of the circle to its radius r." },
      { "label": "b", "question": "At what rate is the area of the oil spill increasing when the radius is 5 meters?" },
      { "label": "c", "question": "At what rate is the circumference of the oil spill increasing when r = 5 meters?" }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "A = πr²",
        "partLabel": "a",
        "skill": "describe",
        "keywords": ["A = πr^2", "A = pi*r^2", "A = π r²", "area equals pi r squared"]
      },
      {
        "points": 1,
        "description": "dA/dt = 2πr·(dr/dt) = 2π(5)(2) = 20π m²/min",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["20π", "20pi", "dA/dt = 2πr(dr/dt)", "2π(5)(2)", "2πr · dr/dt", "20π m^2/min"]
      },
      {
        "points": 1,
        "description": "C = 2πr → dC/dt = 2π·(dr/dt) = 2π(2) = 4π m/min",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["4π", "4pi", "dC/dt = 2π(dr/dt)", "2π · 2", "4π m/min"]
      }
    ]
  },

  {
    "id": "calc-u4-frq002",
    "subject": "apcalcab",
    "units": [4],
    "topic": "Contextual Applications of Differentiation",
    "title": "Linear Approximation",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = √x.",
    "parts": [
      { "label": "a", "question": "Find the linearization L(x) of f at x = 16." },
      { "label": "b", "question": "Use L(x) to approximate √15.8. Show your work." },
      { "label": "c", "question": "Is your approximation an overestimate or underestimate? Justify using f''(x)." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f(16)=4, f'(x)=1/(2√x), f'(16)=1/8; L(x) = 4 + (1/8)(x−16)",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["L(x) = 4 + (1/8)(x - 16)", "f'(16) = 1/8", "1/(2√16)", "4 + (1/8)(x-16)", "linearization"]
      },
      {
        "points": 1,
        "description": "L(15.8) = 4 + (1/8)(15.8 − 16) = 4 + (1/8)(−0.2) = 4 − 0.025 = 3.975",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["3.975", "4 - 0.025", "(1/8)(-0.2)", "15.8 - 16 = -0.2", "L(15.8)"]
      },
      {
        "points": 1,
        "description": "f''(x) = −1/(4x^(3/2)) < 0, so f is concave down; linearization is an overestimate",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["overestimate", "concave down", "f''(x) < 0", "f''", "concavity", "above the curve"]
      }
    ]
  },

  {
    "id": "calc-u4-frq003",
    "subject": "apcalcab",
    "units": [4],
    "topic": "Contextual Applications of Differentiation",
    "title": "L'Hôpital's Rule",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Use L'Hôpital's Rule to evaluate each limit.",
    "parts": [
      { "label": "a", "question": "lim(x→0) (e^x − 1 − x) / x²" },
      { "label": "b", "question": "lim(x→∞) x·e^(−x)" },
      { "label": "c", "question": "lim(x→0⁺) x·ln(x). Rewrite in a suitable form before applying L'Hôpital's Rule." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "0/0 form; apply twice: e^x/2x → e^x/2 → 1/2",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["1/2", "l'hopital", "0/0", "e^x/2", "apply twice", "indeterminate"]
      },
      {
        "points": 1,
        "description": "Rewrite as x/e^x (∞/∞); L'Hôpital: 1/e^x → 0",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["0", "x/e^x", "1/e^x", "l'hopital", "infinity/infinity", "∞/∞"]
      },
      {
        "points": 1,
        "description": "Write as ln(x)/(1/x) (−∞/∞); L'Hôpital: (1/x)/(−1/x²) = −x → 0",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["0", "ln(x)/(1/x)", "l'hopital", "(1/x)/(-1/x^2)", "-x", "rewrite", "0 · ∞"]
      }
    ]
  },

  // ── UNIT 5: Analytical Applications of Differentiation ──────────────────────

  {
    "id": "calc-u5-frq001",
    "subject": "apcalcab",
    "units": [5],
    "topic": "Analytical Applications of Differentiation",
    "title": "Mean Value Theorem",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = x³ − 2x on the closed interval [−1, 2].",
    "parts": [
      { "label": "a", "question": "Verify that all conditions of the Mean Value Theorem are satisfied on [−1, 2]." },
      { "label": "b", "question": "Find all values of c in (−1, 2) guaranteed by the MVT." },
      { "label": "c", "question": "Interpret the value(s) of c geometrically." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f is a polynomial → continuous on [−1,2] and differentiable on (−1,2); MVT applies",
        "partLabel": "a",
        "skill": "explain",
        "keywords": ["continuous", "differentiable", "polynomial", "mvt applies", "mean value theorem"]
      },
      {
        "points": 1,
        "description": "f'(c) = [f(2)−f(−1)]/(2−(−1)) = (4−1)/3 = 1; 3c²−2 = 1 → c² = 1 → c = 1 (in (−1,2))",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["c = 1", "3c^2 - 2 = 1", "average rate", "f(2) - f(-1)", "(4-1)/3 = 1", "c^2 = 1"]
      },
      {
        "points": 1,
        "description": "At c = 1, the tangent line is parallel to the secant line from (−1, 1) to (2, 4)",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["tangent", "parallel", "secant", "same slope", "tangent line is parallel to the secant"]
      }
    ]
  },

  {
    "id": "calc-u5-frq002",
    "subject": "apcalcab",
    "units": [5],
    "topic": "Analytical Applications of Differentiation",
    "title": "Critical Points and the First/Second Derivative Test",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let g(x) = x⁴ − 8x² + 3 on the closed interval [−3, 3].",
    "parts": [
      { "label": "a", "question": "Find all critical numbers of g on (−3, 3)." },
      { "label": "b", "question": "Classify each critical number as a local minimum or local maximum using the second derivative test." },
      { "label": "c", "question": "Find the absolute maximum and absolute minimum values of g on [−3, 3]." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "g'(x) = 4x³ − 16x = 4x(x²−4) = 0 → x = 0, x = ±2",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["4x^3 - 16x", "4x(x^2 - 4)", "x = 0", "x = 2", "x = -2", "critical numbers"]
      },
      {
        "points": 1,
        "description": "g''(x) = 12x²−16; g''(0)=−16<0 (local max); g''(±2)=32>0 (local min)",
        "partLabel": "b",
        "skill": "explain",
        "keywords": ["g''(0) = -16", "local max at x = 0", "local min at x = 2", "local min at x = -2", "second derivative test", "12x^2 - 16"]
      },
      {
        "points": 1,
        "description": "Compare g(−3)=12, g(−2)=−13, g(0)=3, g(2)=−13, g(3)=12; abs max = 12, abs min = −13",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["12", "-13", "absolute maximum", "absolute minimum", "g(3) = 12", "g(2) = -13"]
      }
    ]
  },

  {
    "id": "calc-u5-frq003",
    "subject": "apcalcab",
    "units": [5],
    "topic": "Analytical Applications of Differentiation",
    "title": "Optimization",
    "difficulty": "hard",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "A farmer wants to fence a rectangular garden using 120 meters of fencing. One side of the garden is against a barn wall and requires no fencing.",
    "parts": [
      { "label": "a", "question": "Write the area A as a function of the width x (the dimension perpendicular to the barn wall)." },
      { "label": "b", "question": "Find the dimensions that maximize the area and find the maximum area." },
      { "label": "c", "question": "Justify that your answer gives a maximum, not a minimum." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "With 2x + L = 120, L = 120 − 2x; A(x) = x(120 − 2x) = 120x − 2x²",
        "partLabel": "a",
        "skill": "describe",
        "keywords": ["A(x) = 120x - 2x^2", "A = x(120 - 2x)", "120 - 2x", "2x + L = 120", "constraint"]
      },
      {
        "points": 1,
        "description": "A'(x) = 120 − 4x = 0 → x = 30; L = 60; max area = 1800 m²",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["x = 30", "120 - 4x = 0", "1800", "length = 60", "A'(x) = 0", "maximum area is 1800"]
      },
      {
        "points": 1,
        "description": "A''(x) = −4 < 0, confirming concave down → local (and global) maximum",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["A''(x) = -4", "concave down", "maximum", "A'' < 0", "second derivative negative", "first derivative changes from positive to negative"]
      }
    ]
  },

  // ── UNIT 6: Integration and Accumulation of Change ──────────────────────────

  {
    "id": "calc-u6-frq001",
    "subject": "apcalcab",
    "units": [6],
    "topic": "Integration",
    "title": "Riemann Sums",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = x² + 1 on the interval [0, 4]. Use n = 4 equal subintervals.",
    "parts": [
      { "label": "a", "question": "Compute the Left Riemann Sum (LRAM) for ∫₀⁴ f(x) dx." },
      { "label": "b", "question": "Compute the Right Riemann Sum (RRAM) for ∫₀⁴ f(x) dx." },
      { "label": "c", "question": "Is f increasing on [0, 4]? Use this to determine whether each Riemann sum is an overestimate or underestimate of the exact value." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Δx = 1; left: f(0)+f(1)+f(2)+f(3) = 1+2+5+10 = 18",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["18", "lram", "f(0) + f(1) + f(2) + f(3)", "left riemann", "1 + 2 + 5 + 10"]
      },
      {
        "points": 1,
        "description": "right: f(1)+f(2)+f(3)+f(4) = 2+5+10+17 = 34",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["34", "rram", "f(1) + f(2) + f(3) + f(4)", "right riemann", "2 + 5 + 10 + 17"]
      },
      {
        "points": 1,
        "description": "f is increasing on [0,4] (f'(x)=2x>0); LRAM is underestimate, RRAM is overestimate",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["increasing", "underestimate", "overestimate", "lram underestimate", "rram overestimate", "f'(x) > 0"]
      }
    ]
  },

  {
    "id": "calc-u6-frq002",
    "subject": "apcalcab",
    "units": [6],
    "topic": "Integration",
    "title": "Fundamental Theorem of Calculus",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let g(x) = ∫₀ˣ (t² − 3t + 2) dt.",
    "parts": [
      { "label": "a", "question": "Find g'(x) using the Fundamental Theorem of Calculus, Part 1." },
      { "label": "b", "question": "Evaluate g(3) using the Fundamental Theorem of Calculus, Part 2." },
      { "label": "c", "question": "Find all x > 0 where g has a local minimum. Justify." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "By FTC Part 1: g'(x) = x² − 3x + 2",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["g'(x) = x^2 - 3x + 2", "x^2 - 3x + 2", "ftc", "fundamental theorem", "part 1"]
      },
      {
        "points": 1,
        "description": "∫₀³ (t²−3t+2) dt = [t³/3 − 3t²/2 + 2t]₀³ = 9 − 27/2 + 6 = 3/2",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["3/2", "1.5", "t^3/3 - 3t^2/2 + 2t", "antiderivative", "g(3) ="]
      },
      {
        "points": 1,
        "description": "g'(x) = (x−1)(x−2) = 0 at x=1,2; sign change from − to + at x=2 → local min at x = 2",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["x = 2", "local minimum", "sign change", "g'(x) = 0", "(x-1)(x-2)", "negative to positive"]
      }
    ]
  },

  {
    "id": "calc-u6-frq003",
    "subject": "apcalcab",
    "units": [6],
    "topic": "Integration",
    "title": "U-Substitution and Definite Integrals",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Evaluate the following integrals.",
    "parts": [
      { "label": "a", "question": "Use u-substitution to find ∫ 2x·cos(x²) dx." },
      { "label": "b", "question": "Evaluate the definite integral ∫₀² 2x(x² + 1)³ dx using u-substitution." },
      { "label": "c", "question": "Evaluate ∫ (3x² − 1) / (x³ − x + 5) dx." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "u = x², du = 2x dx; ∫ cos(u) du = sin(u) + C = sin(x²) + C",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["sin(x^2) + C", "u = x^2", "du = 2x dx", "sin(u)", "u-substitution", "cos(u)"]
      },
      {
        "points": 1,
        "description": "u = x²+1, du = 2x dx; when x=0, u=1; x=2, u=5; ∫₁⁵ u³ du = [u⁴/4]₁⁵ = 625/4 − 1/4 = 156",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["156", "u = x^2 + 1", "u^4/4", "625/4 - 1/4", "change bounds", "156"]
      },
      {
        "points": 1,
        "description": "u = x³ − x + 5, du = (3x²−1) dx; ∫ du/u = ln|u| + C = ln|x³ − x + 5| + C",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["ln|x^3 - x + 5| + C", "ln|u|", "u = x^3 - x + 5", "du = (3x^2 - 1)dx", "natural log"]
      }
    ]
  },

  // ── UNIT 7: Differential Equations ──────────────────────────────────────────

  {
    "id": "calc-u7-frq001",
    "subject": "apcalcab",
    "units": [7],
    "topic": "Differential Equations",
    "title": "Separation of Variables",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Consider the differential equation dy/dx = xy, where y > 0.",
    "parts": [
      { "label": "a", "question": "Find the general solution by separating variables." },
      { "label": "b", "question": "Find the particular solution satisfying y(0) = 2." },
      { "label": "c", "question": "Find the value of y when x = 2." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Separate: dy/y = x dx; integrate: ln|y| = x²/2 + C; y = Ae^(x²/2)",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["dy/y = x dx", "ln|y| = x^2/2 + C", "y = Ae^(x^2/2)", "separation of variables", "separate"]
      },
      {
        "points": 1,
        "description": "y(0) = 2: 2 = Ae^0 = A; particular solution: y = 2e^(x²/2)",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["A = 2", "y = 2e^(x^2/2)", "y(0) = 2", "initial condition", "particular solution"]
      },
      {
        "points": 1,
        "description": "y(2) = 2e^(4/2) = 2e²",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["2e^2", "2e²", "y(2) = 2e^2", "x = 2"]
      }
    ]
  },

  {
    "id": "calc-u7-frq002",
    "subject": "apcalcab",
    "units": [7],
    "topic": "Differential Equations",
    "title": "Slope Fields and Equilibrium Solutions",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Consider the differential equation dy/dx = y(2 − y).",
    "parts": [
      { "label": "a", "question": "Find all equilibrium solutions of the differential equation." },
      { "label": "b", "question": "Compute dy/dx at the points (0, 1), (0, 3), and (0, −1). What do these slopes tell you about solution behavior?" },
      { "label": "c", "question": "If y(0) = 0.5, describe the long-run behavior of y as x → ∞." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "y(2−y) = 0 → y = 0 or y = 2; both are equilibrium (constant) solutions",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["y = 0", "y = 2", "equilibrium", "constant solution", "y(2-y) = 0"]
      },
      {
        "points": 1,
        "description": "(0,1): dy/dx=1>0 increasing; (0,3): dy/dx=3(−1)=−3<0 decreasing; (0,−1): dy/dx=−1(3)=−3<0 decreasing",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["1(2-1) = 1", "3(2-3) = -3", "-1(2-(-1)) = -3", "positive", "negative", "increasing", "decreasing"]
      },
      {
        "points": 1,
        "description": "y(0) = 0.5 between 0 and 2; dy/dx > 0 there; solution approaches y = 2 as x → ∞",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["approaches y = 2", "y → 2", "increases toward 2", "stable equilibrium", "long-run", "as x → ∞"]
      }
    ]
  },

  {
    "id": "calc-u7-frq003",
    "subject": "apcalcab",
    "units": [7],
    "topic": "Differential Equations",
    "title": "Exponential Growth and Decay",
    "difficulty": "easy",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "A population P grows according to the equation dP/dt = 0.04P, with P(0) = 500.",
    "parts": [
      { "label": "a", "question": "Find the general and particular solution for P(t)." },
      { "label": "b", "question": "Find the time t at which the population doubles." },
      { "label": "c", "question": "Find the rate of growth of the population when t = 10." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "General: P = Ce^(0.04t); particular: P(0) = 500 → C = 500; P(t) = 500e^(0.04t)",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["P(t) = 500e^(0.04t)", "P = Ce^(0.04t)", "C = 500", "exponential growth", "particular solution"]
      },
      {
        "points": 1,
        "description": "1000 = 500e^(0.04t) → e^(0.04t) = 2 → t = ln(2)/0.04 ≈ 17.3",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["ln(2)/0.04", "t = ln(2)/0.04", "≈ 17.3", "0.04t = ln(2)", "doubling time", "e^(0.04t) = 2"]
      },
      {
        "points": 1,
        "description": "dP/dt at t=10: 0.04·P(10) = 0.04·500e^(0.4) ≈ 0.04·745.9 ≈ 29.8 people/unit time",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["0.04 · P(10)", "0.04 · 500e^(0.4)", "dP/dt", "rate of growth", "500e^(0.4)"]
      }
    ]
  },

  // ── UNIT 8: Applications of Integration ─────────────────────────────────────

  {
    "id": "calc-u8-frq001",
    "subject": "apcalcab",
    "units": [8],
    "topic": "Applications of Integration",
    "title": "Area Between Two Curves",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = x + 2 and g(x) = x². Let R be the region enclosed by the graphs of f and g.",
    "parts": [
      { "label": "a", "question": "Find the x-coordinates of the intersection points of f and g." },
      { "label": "b", "question": "Set up, but do not evaluate, an integral that gives the area of R." },
      { "label": "c", "question": "Evaluate the integral to find the exact area of R." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "x + 2 = x² → x² − x − 2 = (x−2)(x+1) = 0 → x = −1 and x = 2",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["x = -1", "x = 2", "x^2 - x - 2 = 0", "(x-2)(x+1) = 0", "intersection"]
      },
      {
        "points": 1,
        "description": "A = ∫₋₁² (x + 2 − x²) dx (top minus bottom)",
        "partLabel": "b",
        "skill": "describe",
        "keywords": ["∫(-1 to 2)", "∫_{-1}^{2}", "(x + 2 - x^2)", "top minus bottom", "f(x) - g(x)", "x + 2 - x^2"]
      },
      {
        "points": 1,
        "description": "[x²/2 + 2x − x³/3]₋₁² = (2+4−8/3) − (1/2−2+1/3) = 9/2",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["9/2", "4.5", "x^2/2 + 2x - x^3/3", "antiderivative", "area = 9/2"]
      }
    ]
  },

  {
    "id": "calc-u8-frq002",
    "subject": "apcalcab",
    "units": [8],
    "topic": "Applications of Integration",
    "title": "Particle Motion: Displacement and Total Distance",
    "difficulty": "medium",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "A particle moves along the x-axis. Its velocity at time t ≥ 0 is given by v(t) = t² − 4t + 3. The particle's position at t = 0 is x(0) = 2.",
    "parts": [
      { "label": "a", "question": "Find the displacement of the particle on [0, 4]." },
      { "label": "b", "question": "Find the total distance traveled by the particle on [0, 4]." },
      { "label": "c", "question": "Find the position of the particle at t = 4." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Displacement = ∫₀⁴ v(t) dt = [t³/3 − 2t² + 3t]₀⁴ = 64/3 − 32 + 12 = 4/3",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["4/3", "∫₀⁴ v(t) dt", "t^3/3 - 2t^2 + 3t", "displacement", "4/3"]
      },
      {
        "points": 1,
        "description": "v(t) = 0 at t=1 and t=3; total dist = ∫₀¹v dt + |∫₁³v dt| + ∫₃⁴v dt = 4/3 + 4/3 + 4/3 = ... (set up split integral)",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["t = 1", "t = 3", "split", "total distance", "|v(t)|", "absolute value", "∫₀¹", "∫₁³", "∫₃⁴"]
      },
      {
        "points": 1,
        "description": "x(4) = x(0) + displacement = 2 + 4/3 = 10/3",
        "partLabel": "c",
        "skill": "calculate",
        "keywords": ["10/3", "x(4) = 2 + 4/3", "position", "x(0) + displacement", "2 + 4/3"]
      }
    ]
  },

  {
    "id": "calc-u8-frq003",
    "subject": "apcalcab",
    "units": [8],
    "topic": "Applications of Integration",
    "title": "Volume by the Disk Method",
    "difficulty": "hard",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let R be the region bounded by y = √x, the x-axis, and x = 4.",
    "parts": [
      { "label": "a", "question": "Set up, but do not evaluate, an integral for the volume of the solid formed when R is revolved around the x-axis." },
      { "label": "b", "question": "Evaluate the integral to find the exact volume." },
      { "label": "c", "question": "Set up an integral for the volume when R is revolved around the line y = −1. (Do not evaluate.)" }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "V = π∫₀⁴ (√x)² dx = π∫₀⁴ x dx (disk method, radius = √x)",
        "partLabel": "a",
        "skill": "describe",
        "keywords": ["π∫₀⁴ x dx", "pi * ∫(0 to 4) x dx", "disk method", "(√x)^2 = x", "π∫₀⁴ (√x)^2 dx"]
      },
      {
        "points": 1,
        "description": "π∫₀⁴ x dx = π[x²/2]₀⁴ = π(8) = 8π",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["8π", "8pi", "x^2/2", "π[x^2/2]", "volume = 8π"]
      },
      {
        "points": 1,
        "description": "Outer radius = √x − (−1) = √x + 1; inner = 0 − (−1) = 1; V = π∫₀⁴ [(√x+1)² − 1²] dx (washer method)",
        "partLabel": "c",
        "skill": "describe",
        "keywords": ["washer", "outer radius", "√x + 1", "(√x + 1)^2 - 1", "π∫₀⁴", "y = -1"]
      }
    ]
  },

  {
    "id": "calc-u8-frq004",
    "subject": "apcalcab",
    "units": [8],
    "topic": "Applications of Integration",
    "title": "Average Value of a Function",
    "difficulty": "easy",
    "frqType": "short",
    "autoGraded": true,
    "prompt": "Let f(x) = cos(x) on [0, π].",
    "parts": [
      { "label": "a", "question": "Write the formula for the average value of f on [0, π] and evaluate it." },
      { "label": "b", "question": "Find a value c in [0, π] where f(c) equals the average value (Mean Value Theorem for Integrals)." },
      { "label": "c", "question": "Interpret the average value of f on [0, π] geometrically." }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "f_avg = (1/π)∫₀^π cos(x) dx = (1/π)[sin(x)]₀^π = (1/π)(0 − 0) = 0",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": ["0", "(1/π)∫₀^π cos(x) dx", "average value = 0", "sin(π) - sin(0)", "[sin(x)]"]
      },
      {
        "points": 1,
        "description": "cos(c) = 0 → c = π/2 in [0, π]",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": ["c = π/2", "cos(c) = 0", "π/2", "pi/2", "mean value theorem for integrals"]
      },
      {
        "points": 1,
        "description": "The average value of 0 means the area above the x-axis equals the area below on [0, π]",
        "partLabel": "c",
        "skill": "explain",
        "keywords": ["area above equals area below", "symmetric", "net area", "positive area equals negative area", "cancel out", "average is zero"]
      }
    ]
  }

];
