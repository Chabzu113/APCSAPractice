'use strict';
// AP Physics 1 — FRQ Question Bank
// Each rubric item schema:
//   index, points, description, keywords[], skill
//   fundamentalPrinciple (bool) — triggers QQT protocol check
//   proximity { cause[], connector[], effect[] } — triggers 15-word proximity check
//   cpeSource (partLabel string) — triggers CPE protection

window.PHYSICS_FRQ = [

  // ── Unit 1: Kinematics — Projectile Motion ───────────────────────────────────
  {
    id: 'aphy1_frq_u1_01',
    subject: 'apphys1',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Projectile Motion — Horizontal Launch',
    units: [1],
    topic: '1.3 Projectile Motion',
    difficulty: 'medium',
    source: 'AP Exam Style',
    points: 7,
    prompt: 'A ball of mass $m = 0.5\\,\\text{kg}$ is launched horizontally from the top of a cliff of height $H = 45\\,\\text{m}$ with an initial horizontal speed $v_0 = 15\\,\\text{m/s}$. Use $g = 10\\,\\text{m/s}^2$. Air resistance is negligible.',
    parts: [
      {
        label: 'a',
        instruction: 'On the diagram below, draw and label all forces acting on the ball at the moment it is launched (ignore air resistance).',
        skill: 'diagram',
        points: 1
      },
      {
        label: 'b',
        instruction: 'Starting from a fundamental kinematic principle, derive an expression for the time $t$ the ball takes to reach the ground. Your answer should be in terms of $H$ and $g$.',
        skill: 'derivation',
        points: 2
      },
      {
        label: 'c',
        instruction: 'Calculate the numerical value of the time $t$ and the horizontal range $x$ of the ball.',
        skill: 'calculation',
        points: 2
      },
      {
        label: 'd',
        instruction: 'In a well-reasoned paragraph, explain how the horizontal range would change if the cliff height were doubled to $2H$. Use physics principles to justify your answer.',
        skill: 'paragraph',
        points: 2
      }
    ],
    rubric: [
      {
        index: 1,
        points: 1,
        description: 'Single downward arrow labeled "W," "mg," or "F_g" (weight/gravity force) originating from the ball\'s center of mass. No horizontal force shown — horizontal velocity is NOT a force. No other forces present (no air resistance by problem statement).',
        keywords: ['yes'],
        skill: 'diagram'
      },
      {
        index: 2,
        points: 1,
        description: 'Starts from kinematic equation $y = v_{0y}t + \\frac{1}{2}gt^2$ (or $H = \\frac{1}{2}gt^2$ since $v_{0y}=0$).',
        keywords: ['kinematic', 'y = 1/2 g t', 'h = 1/2 g', 'displacement', 'y = v0t', '1/2 g t^2', 'half g t squared', 'free fall'],
        fundamentalPrinciple: true,
        skill: 'derivation'
      },
      {
        index: 3,
        points: 1,
        description: 'Correctly solves for $t = \\sqrt{2H/g}$.',
        keywords: ['t = sqrt', 't = \\sqrt', 'square root', '2h/g', '2H/g', 'sqrt(2h', 'root 2h'],
        skill: 'derivation'
      },
      {
        index: 4,
        points: 1,
        description: 'Correct numerical time: $t = \\sqrt{2(45)/10} = 3\\,\\text{s}$.',
        keywords: ['3 s', '3.0 s', '3 seconds', 't = 3', 'three seconds'],
        cpeSource: 'b',
        skill: 'calculation'
      },
      {
        index: 5,
        points: 1,
        description: 'Correct numerical range: $x = v_0 t = 15 \\times 3 = 45\\,\\text{m}$.',
        keywords: ['45 m', 'x = 45', '45 meters', 'range is 45', '15 times 3'],
        cpeSource: 'b',
        skill: 'calculation'
      },
      {
        index: 6,
        points: 1,
        description: 'States that range would increase (by factor $\\sqrt{2}$) because fall time increases.',
        keywords: ['increases', 'greater range', 'longer range', 'sqrt 2', 'factor of', 'longer time', 'more time'],
        proximity: {
          cause:     ['height', 'taller cliff', 'doubled height', '2h', 'greater height'],
          connector: ['increases', 'greater', 'longer', 'more'],
          effect:    ['time', 'fall time', 'range', 'distance']
        },
        skill: 'paragraph'
      },
      {
        index: 7,
        points: 1,
        description: 'Justifies via kinematics: $t \\propto \\sqrt{H}$, so range $\\propto \\sqrt{H}$, not proportional to $H$ directly.',
        keywords: ['proportional to square root', 'proportional to sqrt', 'not double', 'does not double', 'square root of h', 'sqrt h', 't proportional', 'kinematic'],
        fundamentalPrinciple: true,
        skill: 'paragraph'
      }
    ],
    cpeGroups: [['b', 'c']],
    idealResponse: {
      latex: 'H = \\tfrac{1}{2}g t^2 \\;\\Rightarrow\\; t = \\sqrt{\\dfrac{2H}{g}} = \\sqrt{\\dfrac{2(45)}{10}} = 3\\,\\text{s}\\qquad x = v_0 t = 15 \\times 3 = 45\\,\\text{m}',
      prose: 'Since horizontal and vertical motions are independent, vertical free-fall from rest gives H = ½gt². Solving for t and substituting into x = v₀t yields the range. Doubling H multiplies t by √2, so the range increases by √2 ≈ 1.41×, not 2×.'
    }
  },

  // ── Unit 2: Forces — Atwood Machine ─────────────────────────────────────────
  {
    id: 'aphy1_frq_u2_01',
    subject: 'apphys1',
    type: 'FRQ',
    frqType: 'frq',
    title: "Newton's Laws — Atwood Machine",
    units: [2],
    topic: "2.1 Newton's First & Second Law",
    difficulty: 'medium',
    source: 'AP Exam Style',
    points: 7,
    prompt: 'Two blocks of mass $m_1 = 3\\,\\text{kg}$ and $m_2 = 5\\,\\text{kg}$ are connected by a light, inextensible string over a massless, frictionless pulley. The system is released from rest. Use $g = 10\\,\\text{m/s}^2$.',
    parts: [
      {
        label: 'a',
        instruction: 'Draw and label a separate free-body diagram for each block.',
        skill: 'diagram',
        points: 1
      },
      {
        label: 'b',
        instruction: "Starting explicitly from Newton's Second Law, derive an algebraic expression for the acceleration $a$ of the system in terms of $m_1$, $m_2$, and $g$.",
        skill: 'derivation',
        points: 3
      },
      {
        label: 'c',
        instruction: 'Calculate the numerical acceleration of the system.',
        skill: 'calculation',
        points: 1
      },
      {
        label: 'd',
        instruction: "In a paragraph, explain how the acceleration would change if the string had significant mass $m_s$. Justify your answer using Newton's Second Law.",
        skill: 'paragraph',
        points: 2
      }
    ],
    rubric: [
      {
        index: 1,
        points: 1,
        description: 'Two separate FBDs — one per block. Block m₁: one arrow upward labeled "T" (tension), one arrow downward labeled "m₁g" or "W₁" (weight). Block m₂: one arrow upward labeled "T" (same magnitude as above), one arrow downward labeled "m₂g" or "W₂." No other forces present (frictionless pulley, massless string). Both tension arrows labeled with the same symbol T.',
        keywords: ['yes'],
        skill: 'diagram'
      },
      {
        index: 2,
        points: 1,
        description: "Explicitly states Newton's Second Law as the starting point: $\\sum F = ma$.",
        keywords: ["newton's second law", "second law", "f_net = ma", "f = ma", "net force equals", "sum f", "∑f = ma"],
        fundamentalPrinciple: true,
        skill: 'derivation'
      },
      {
        index: 3,
        points: 1,
        description: 'Writes correct equations of motion for each block: $m_2 g - T = m_2 a$ and $T - m_1 g = m_1 a$.',
        keywords: ['m2g - t', 'm2g−t', 'm_2 g - t', 't - m1g', 't−m1g', 'equation of motion', 'for block', 'for m1', 'for m2'],
        skill: 'derivation'
      },
      {
        index: 4,
        points: 1,
        description: 'Eliminates $T$ and solves for $a = \\dfrac{(m_2 - m_1)g}{m_1 + m_2}$.',
        keywords: ['m2 - m1', 'm₂ - m₁', 'm2-m1', 'm1 + m2', 'total mass', 'sum of masses', 'adding equations', 'eliminate t'],
        skill: 'derivation'
      },
      {
        index: 5,
        points: 1,
        description: 'Correct numerical answer: $a = \\frac{(5-3)(10)}{5+3} = 2.5\\,\\text{m/s}^2$.',
        keywords: ['2.5', '2.5 m/s', '2.5 m/s^2', 'two point five', 'a = 2.5'],
        cpeSource: 'b',
        skill: 'calculation'
      },
      {
        index: 6,
        points: 1,
        description: 'States that acceleration decreases because total accelerated mass increases.',
        keywords: ['decreases', 'smaller acceleration', 'less acceleration', 'more mass', 'total mass increases', 'heavier system'],
        proximity: {
          cause:     ['string mass', 'mass of string', 'heavier string', 'ms', 'm_s', 'string has mass'],
          connector: ['increases', 'adds', 'greater', 'heavier'],
          effect:    ['total mass', 'denominator', 'net mass']
        },
        skill: 'paragraph'
      },
      {
        index: 7,
        points: 1,
        description: "Newton's Second Law justification: $a = F_{net}/(m_1 + m_2 + m_s)$ — larger denominator means smaller $a$.",
        keywords: ["newton's second law", "f/m", "inversely proportional", "inversely", "denominator", "larger denominator", "decreases"],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['total mass', 'denominator', 'm1 + m2 + ms', 'larger mass'],
          connector: ['increases', 'grows', 'larger'],
          effect:    ['acceleration decreases', 'smaller a', 'less acceleration', 'inversely']
        },
        skill: 'paragraph'
      }
    ],
    cpeGroups: [['b', 'c']],
    idealResponse: {
      latex: 'a = \\dfrac{(m_2 - m_1)\\,g}{m_1 + m_2} = \\dfrac{(5-3)(10)}{5+3} = \\dfrac{20}{8} = 2.5\\,\\text{m/s}^2',
      prose: "Applying Newton's Second Law to each block and summing the equations eliminates T. The net force is (m₂ − m₁)g and the total inertia is (m₁ + m₂). Adding string mass m_s to the denominator reduces a."
    }
  },

  // ── Unit 3: Energy — Conservation with Friction ──────────────────────────────
  {
    id: 'aphy1_frq_u3_01',
    subject: 'apphys1',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Work-Energy Theorem — Ramp with Friction',
    units: [3],
    topic: '3.1 Work & Work-Energy Theorem',
    difficulty: 'medium',
    source: 'AP Exam Style',
    points: 7,
    prompt: 'A block of mass $m = 2\\,\\text{kg}$ starts from rest and slides down a ramp of height $h = 5\\,\\text{m}$ and length $L = 10\\,\\text{m}$. The coefficient of kinetic friction between the block and the ramp is $\\mu_k = 0.15$. Use $g = 10\\,\\text{m/s}^2$.',
    parts: [
      {
        label: 'a',
        instruction: 'Starting from the Work-Energy Theorem, derive an algebraic expression for the speed $v$ of the block at the bottom of the ramp in terms of $m$, $g$, $h$, $\\mu_k$, and $L$.',
        skill: 'derivation',
        points: 3
      },
      {
        label: 'b',
        instruction: 'Calculate the numerical speed $v$ of the block at the bottom of the ramp.',
        skill: 'calculation',
        points: 2
      },
      {
        label: 'c',
        instruction: 'In a paragraph, explain what would happen to the speed at the bottom if the ramp angle were increased while keeping the height $h$ constant (which shortens $L$). Justify using the Work-Energy Theorem.',
        skill: 'paragraph',
        points: 2
      }
    ],
    rubric: [
      {
        index: 1,
        points: 1,
        description: 'Cites the Work-Energy Theorem as starting point: $W_{net} = \\Delta KE$.',
        keywords: ['work-energy theorem', 'work energy theorem', 'w_net = delta ke', 'wnet = delta ke', 'net work equals', 'w = delta ke', 'work equals change in kinetic'],
        fundamentalPrinciple: true,
        skill: 'derivation'
      },
      {
        index: 2,
        points: 1,
        description: 'Identifies work done by gravity: $W_g = mgh$, and work done by friction: $W_f = -\\mu_k mg\\cos\\theta \\cdot L$.',
        keywords: ['mgh', 'work of gravity', 'work by gravity', 'work done by friction', 'mu k', 'friction work', 'mukl', 'mu_k mg', 'normal force times mu'],
        skill: 'derivation'
      },
      {
        index: 3,
        points: 1,
        description: 'Correctly combines work terms and solves: $v = \\sqrt{2g(h - \\mu_k L\\cos\\theta)}$ or equivalent $v = \\sqrt{2gh - 2\\mu_k gL\\cos\\theta}$.',
        keywords: ['v = sqrt', 'v = \\sqrt', '2gh - 2 mu', '2g(h - mu', 'square root', 'solve for v'],
        skill: 'derivation'
      },
      {
        index: 4,
        points: 1,
        description: 'Correctly identifies the normal force: $N = mg\\cos\\theta = mg(h/L) \\cdot (L/h)$ — or uses $N = mg\\cos\\theta$ with $\\cos\\theta = \\sqrt{L^2-h^2}/L$.',
        keywords: ['normal force', 'mg cos', 'cos theta', 'n = mg cos', 'perpendicular', 'component'],
        skill: 'derivation'
      },
      {
        index: 5,
        points: 1,
        description: 'Correct numerical answer: friction force $= \\mu_k mg\\cos\\theta$; $v \\approx 8.49\\,\\text{m/s}$ (or consistent value).',
        keywords: ['8.49', '8.5', '8.4', 'sqrt 72', 'sqrt(72', '72', 'approximately 8'],
        cpeSource: 'a',
        skill: 'calculation'
      },
      {
        index: 6,
        points: 1,
        description: 'States that speed increases when ramp angle increases (shorter L → less friction work).',
        keywords: ['increases', 'greater speed', 'faster', 'less friction', 'shorter ramp', 'smaller l', 'less friction work'],
        proximity: {
          cause:     ['steeper ramp', 'larger angle', 'shorter l', 'shorter ramp', 'angle increases'],
          connector: ['reduces', 'less', 'decreases', 'smaller'],
          effect:    ['friction work', 'work done by friction', 'energy lost', 'heat']
        },
        skill: 'paragraph'
      },
      {
        index: 7,
        points: 1,
        description: 'Justification via Work-Energy Theorem: less work lost to friction → more KE → greater $v$.',
        keywords: ['work-energy theorem', 'more kinetic energy', 'less energy lost', 'less work by friction', 'more ke', 'greater kinetic energy'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['friction work', 'energy lost to friction', 'work by friction'],
          connector: ['decreases', 'less', 'reduces', 'smaller'],
          effect:    ['kinetic energy', 'ke', 'speed increases', 'faster', 'greater v']
        },
        skill: 'paragraph'
      }
    ],
    cpeGroups: [['a', 'b']],
    idealResponse: {
      latex: 'W_{net} = \\Delta KE \\;\\Rightarrow\\; mgh - \\mu_k mg\\cos\\theta\\cdot L = \\tfrac{1}{2}mv^2 \\;\\Rightarrow\\; v = \\sqrt{2g\\!\\left(h - \\mu_k L\\cos\\theta\\right)} \\approx 8.5\\,\\text{m/s}',
      prose: "The Work-Energy Theorem states net work equals change in KE. Gravity does +mgh; friction does −μₖmgcosθ·L. Setting their sum equal to ½mv² and solving gives v. A steeper ramp with same h has smaller L, so friction work decreases and final speed increases."
    }
  }

];
