'use strict';
// AP Physics C: E&M — FRQ Question Bank
// 12 questions: 3 per unit (Electrostatics, Conductors/Capacitors, Circuits, Magnetism/Induction)

window.APPHYSCEM_FRQ = [

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 1 — ELECTROSTATICS
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'apcem_frq_u1_01',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Two Point Charges — Force and Field',
    units: [1],
    topic: '1.1 Coulomb\'s Law & Electric Field',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'Two point charges $q_1 = +4\\,\\mu\\text{C}$ and $q_2 = -2\\,\\mu\\text{C}$ are separated by a distance $d = 0.30\\,\\text{m}$ in free space. Point P is located at the midpoint between the two charges. Use $k = 9 \\times 10^9\\,\\text{N}\\!\\cdot\\!\\text{m}^2/\\text{C}^2$.',
    parts: [
      { label: 'a', instruction: 'On the diagram below, draw and label the electric field vectors at point P due to each charge.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Starting from Coulomb\'s law, derive an expression for the net electric force on a test charge $q_0$ placed at point P in terms of $k$, $q_1$, $q_2$, and $d$.', skill: 'derivation', points: 2 },
      { label: 'c', instruction: 'Calculate the magnitude and direction of the net electric field at point P.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Explain qualitatively what happens to the net field at P if $q_2$ is replaced by a charge of equal magnitude but positive sign.', skill: 'paragraph', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Two arrows at P both pointing toward the negative charge ($q_2$). The arrow due to $q_1$ points from P toward $q_2$ (away from $q_1$), and the arrow due to $q_2$ also points from P toward $q_2$ (toward $q_2$). Both arrows correctly labeled $E_1$ and $E_2$.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Starts from Coulomb\'s law $F = kq_1q_2/r^2$ or $E = kq/r^2$ and identifies $r = d/2$ for each charge to point P.', keywords: ['coulomb', 'kq/r^2', 'kq1q2', 'k q1 q2', 'f = k', 'e = k', 'kq/r', 'd/2', 'r = d/2', 'r=d/2', '* k *', 'k *', '* k', '/r^2', '/d^2'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Correctly derives net field at P: both fields point in the same direction (toward $q_2$), so $E_{net} = k(|q_1|+|q_2|)/(d/2)^2 = 4k(|q_1|+|q_2|)/d^2$.', keywords: ['same direction', 'add', 'q1+q2', '|q1|+|q2|', '4k', '/(d/2)^2', 'd/2 squared', 'e1 + e2', 'e_1 + e_2', 'fields add', 'e1+e2', 'enet', 'q1 + q2', 'q1 + abs', 'abs(q2)', '(q1 +'], skill: 'derivation' },
      { index: 4, partLabel: 'c', points: 1, description: 'Correct numerical E-field from $q_1$: $E_1 = (9\\times10^9)(4\\times10^{-6})/(0.15)^2 = 1.6 \\times 10^6\\,\\text{N/C}$.', keywords: ['1.6', '10^6', '1600000', '1.6e6'], cpeSource: 'b', skill: 'calculation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Correct total: $E_{net} = E_1 + E_2 = 1.6\\times10^6 + 0.8\\times10^6 = 2.4 \\times 10^6\\,\\text{N/C}$ directed toward $q_2$.', keywords: ['2.4', '10^6', '2400000', '2.4e6', 'toward q2', 'toward negative'], skill: 'calculation' },
      { index: 6, partLabel: 'd', points: 1, description: 'States that if $q_2$ becomes positive, the fields at P from $q_1$ and $q_2$ point in opposite directions instead of the same direction.', keywords: ['opposite direction', 'cancel', 'opposing', 'point away from each other', 'subtract'], skill: 'paragraph' },
      { index: 7, partLabel: 'd', points: 1, description: 'Concludes that the net field at P would decrease in magnitude (partial cancellation) since $|q_1| > |q_2|$ the field does not fully cancel.', keywords: ['decrease', 'smaller', 'reduce', 'partially cancel', 'not fully cancel', 'net field is smaller', 'weaker'], skill: 'paragraph' }
    ]
  },

  {
    id: 'apcem_frq_u1_02',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Gauss\'s Law — Spherical Shell',
    units: [1],
    topic: '1.2 Gauss\'s Law',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A thin conducting spherical shell of radius $R$ carries a total charge $+Q$ uniformly distributed on its surface.',
    parts: [
      { label: 'a', instruction: 'Draw a Gaussian surface you would use to find the electric field inside the shell at $r < R$. Label it clearly.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Using Gauss\'s law, derive the electric field for $r < R$.', skill: 'derivation', points: 2 },
      { label: 'c', instruction: 'Using Gauss\'s law, derive the electric field for $r > R$ and show it is equivalent to a point charge.', skill: 'derivation', points: 2 },
      { label: 'd', instruction: 'Sketch a graph of $E(r)$ vs $r$ for $0 < r < 3R$. Label key values on both axes.', skill: 'diagram', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Gaussian surface is a sphere of radius $r < R$ concentric with the shell, drawn inside the conducting shell and clearly labeled.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Writes Gauss\'s law: $\\oint \\vec{E} \\cdot d\\vec{A} = Q_{enc}/\\varepsilon_0$ and identifies $Q_{enc} = 0$ inside conducting shell.', keywords: ['gauss', 'q_enc = 0', 'q enclosed = 0', 'qenc = 0', 'qenc=0', 'no charge enclosed', 'epsilon_0', 'epsilon naught', 'flux', 'e dot da', 'e*da', 'eda'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Concludes $E = 0$ for $r < R$ since the enclosed charge is zero.', keywords: ['E = 0', 'e=0', 'field is zero', 'no electric field', 'zero field'], skill: 'derivation' },
      { index: 4, partLabel: 'c', points: 1, description: 'For $r > R$: applies Gauss\'s law with spherical Gaussian surface enclosing $Q$: $E(4\\pi r^2) = Q/\\varepsilon_0$.', keywords: ['4 pi r^2', '4pir^2', 'Q/epsilon', 'q_enc = Q', 'qenc = q', 'total charge Q', 'e(4pi', 'e*4pi', 'e4pir'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Solves $E = Q/(4\\pi\\varepsilon_0 r^2) = kQ/r^2$, noting this is identical to the field of a point charge $Q$ at the center.', keywords: ['kQ/r^2', 'Q/(4pi epsilon_0 r^2)', 'point charge', 'identical to point charge', 'as if all charge at center'], skill: 'derivation' },
      { index: 6, partLabel: 'd', points: 1, description: 'Graph shows $E = 0$ for $r < R$.', keywords: ['yes'], skill: 'diagram' },
      { index: 7, partLabel: 'd', points: 1, description: 'Graph shows $E$ jumping at $r = R$ then decreasing as $1/r^2$ for $r > R$.', keywords: ['yes'], skill: 'diagram' }
    ]
  },

  {
    id: 'apcem_frq_u1_03',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Electric Potential — Work and Energy',
    units: [1],
    topic: '1.3 Electric Potential',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A charge $Q = +5\\,\\mu\\text{C}$ is fixed at the origin. A second charge $q = +1\\,\\mu\\text{C}$ is moved from point A ($r_A = 0.50\\,\\text{m}$) to point B ($r_B = 0.20\\,\\text{m}$) along a radial line. Use $k = 9 \\times 10^9\\,\\text{N}\\!\\cdot\\!\\text{m}^2/\\text{C}^2$.',
    parts: [
      { label: 'a', instruction: 'Derive an expression for the electric potential $V(r)$ at distance $r$ from charge $Q$.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Calculate the electric potential at points A and B.', skill: 'calculation', points: 2 },
      { label: 'c', instruction: 'Calculate the work done by an external agent in moving $q$ from A to B.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Is the work done by the electric field positive or negative? Explain why.', skill: 'paragraph', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Starts from $V = -\\int \\vec{E}\\cdot d\\vec{r}$ or states $V = kQ/r$ from the definition of electric potential.', keywords: ['V = kQ/r', 'V=kQ/r', 'v=kq/r', '-integral E dr', 'potential', 'kq/r', 'kQ/r'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Shows integration: $V(r) = -\\int_\\infty^r \\frac{kQ}{r\'^2}dr\' = kQ/r$ or directly cites the result with justification.', keywords: ['kQ/r', 'integrate', '1/r^2', 'infinity to r', 'reference at infinity'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Calculates $V_A = kQ/r_A = (9\\times10^9)(5\\times10^{-6})/(0.50) = 9 \\times 10^4\\,\\text{V}$ or $90{,}000\\,\\text{V}$.', keywords: ['9e4', '90000', '9 x 10^4', '90,000', '9*10^4', '90 kV'], skill: 'calculation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Calculates $V_B = kQ/r_B = (9\\times10^9)(5\\times10^{-6})/(0.20) = 2.25 \\times 10^5\\,\\text{V}$ or $225{,}000\\,\\text{V}$.', keywords: ['2.25e5', '225000', '2.25 x 10^5', '225,000', '2.25*10^5', '225 kV'], skill: 'calculation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Work by external agent: $W_{ext} = q(V_B - V_A) = (1\\times10^{-6})(225000 - 90000) = 0.135\\,\\text{J}$.', keywords: ['0.135', 'q(V_B - V_A)', 'q delta V', '135', '1.35'], skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: 'States $W_{ext} > 0$ because work must be done against the repulsive electric force to move $q$ closer to $Q$.', keywords: ['positive', 'against', 'repulsive', 'closer'], skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'The work done by the electric field is negative because the displacement is opposite to the electric force (both charges positive, force is repulsive/outward, displacement is inward).', keywords: ['negative', 'opposite', 'against the force', 'repulsive force', 'displacement opposite'], skill: 'paragraph' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 2 — CONDUCTORS, CAPACITORS & DIELECTRICS
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'apcem_frq_u2_01',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Parallel-Plate Capacitor',
    units: [2],
    topic: '2.1 Capacitance',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A parallel-plate capacitor has plates of area $A = 0.02\\,\\text{m}^2$ separated by a distance $d = 1.0\\,\\text{mm}$. The capacitor is connected to a $V_0 = 12\\,\\text{V}$ battery. Use $\\varepsilon_0 = 8.85 \\times 10^{-12}\\,\\text{C}^2/(\\text{N}\\!\\cdot\\!\\text{m}^2)$.',
    parts: [
      { label: 'a', instruction: 'Derive the capacitance $C$ of a parallel-plate capacitor from Gauss\'s law.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Calculate the capacitance, the charge stored, and the energy stored.', skill: 'calculation', points: 3 },
      { label: 'c', instruction: 'The battery is disconnected and a dielectric slab ($\\kappa = 3$) is inserted between the plates. Explain what happens to the charge, voltage, and energy stored.', skill: 'paragraph', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Uses Gauss\'s law on a pillbox surface to find $E = \\sigma/\\varepsilon_0$ between the plates, where $\\sigma = Q/A$.', keywords: ['gauss', 'sigma/epsilon_0', 'sigma/epsilon', 'Q/A', 'pillbox', 'surface charge density', 'e = sigma', 'e=sigma'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Relates $V = Ed$ and $C = Q/V = \\varepsilon_0 A/d$.', keywords: ['V = Ed', 'C = epsilon_0 A/d', 'epsilon_0 A / d', 'C = Q/V', 'epsilon A over d'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Capacitance: $C = (8.85\\times10^{-12})(0.02)/(0.001) = 1.77 \\times 10^{-10}\\,\\text{F} \\approx 177\\,\\text{pF}$.', keywords: ['1.77', '177', '10^-10', 'pF', '1.8'], skill: 'calculation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Charge: $Q = CV_0 = (1.77\\times10^{-10})(12) \\approx 2.12 \\times 10^{-9}\\,\\text{C} \\approx 2.12\\,\\text{nC}$.', keywords: ['2.12', '2.1', 'nC', '10^-9', 'Q = CV'], cpeSource: 'a', skill: 'calculation' },
      { index: 5, partLabel: 'b', points: 1, description: 'Energy: $U = \\frac{1}{2}CV_0^2 = \\frac{1}{2}(1.77\\times10^{-10})(144) \\approx 1.27 \\times 10^{-8}\\,\\text{J}$.', keywords: ['1.27', '1.3', '10^-8', '1/2 CV^2', 'half CV squared', '12.7 nJ'], cpeSource: 'a', skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: 'With battery disconnected, charge $Q$ remains constant (no path for charge to flow).', keywords: ['charge stays', 'charge remains', 'Q constant', 'charge constant', 'charge same', 'charge does not change', 'isolated'], skill: 'paragraph' },
      { index: 7, partLabel: 'c', points: 1, description: 'Voltage decreases by factor $\\kappa$ ($V = V_0/\\kappa$) and energy decreases ($U = U_0/\\kappa$) because $C$ increases while $Q$ is fixed.', keywords: ['voltage decreases', 'V decreases', 'V/kappa', 'energy decreases', 'U decreases', 'U/kappa', 'capacitance increases'], skill: 'paragraph' }
    ]
  },

  {
    id: 'apcem_frq_u2_02',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Concentric Conducting Spheres',
    units: [2],
    topic: '2.2 Conductors & Induced Charge',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A solid conducting sphere of radius $a$ carries charge $+Q$. It is surrounded by a concentric conducting spherical shell of inner radius $b$ and outer radius $c$, which carries no net charge.',
    parts: [
      { label: 'a', instruction: 'Determine the charge on the inner and outer surfaces of the shell.', skill: 'calculation', points: 2 },
      { label: 'b', instruction: 'Using Gauss\'s law, derive $E(r)$ for all four regions: $r<a$, $a<r<b$, $b<r<c$, $r>c$.', skill: 'derivation', points: 3 },
      { label: 'c', instruction: 'Sketch $E(r)$ vs $r$ and label key features.', skill: 'diagram', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Inner surface of shell has charge $-Q$ (by Gauss\'s law: field inside conductor must be zero, so Gaussian surface in shell encloses net zero charge).', keywords: ['-Q', 'negative Q', 'minus Q', 'induced -Q', 'inner surface -Q'], skill: 'calculation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Outer surface has charge $+Q$ (shell is neutral overall, so $-Q + Q_{outer} = 0 \\Rightarrow Q_{outer} = +Q$).', keywords: ['+Q', 'positive Q', 'outer surface +Q', 'net zero', 'conservation of charge'], skill: 'calculation' },
      { index: 3, partLabel: 'b', points: 1, description: 'For $r < a$: $E = 0$ (inside a conductor, the electric field is zero).', keywords: ['E = 0', 'zero', 'inside conductor', 'field is zero'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: 'For $a < r < b$: Gauss gives $E(4\\pi r^2) = Q/\\varepsilon_0$ so $E = kQ/r^2$ directed radially outward.', keywords: ['kQ/r^2', 'Q/(4pi epsilon_0 r^2)', '4 pi r^2', 'gauss', 'radially outward'], skill: 'derivation' },
      { index: 5, partLabel: 'b', points: 1, description: 'For $b < r < c$: $E = 0$ (inside the conducting shell).', keywords: ['E = 0', 'zero', 'inside conductor', 'inside shell', 'field is zero'], skill: 'derivation' },
      { index: 6, partLabel: 'b', points: 1, description: 'For $r > c$: $E = kQ/r^2$ (total enclosed charge is $+Q$), same as a point charge.', keywords: ['kQ/r^2', 'point charge', 'Q/(4pi epsilon_0 r^2)', 'same as point charge'], skill: 'derivation' },
      { index: 7, partLabel: 'c', points: 1, description: 'Graph shows $E=0$ for $r<a$, $1/r^2$ rise for $a<r<b$, $E=0$ for $b<r<c$, and $1/r^2$ decay for $r>c$.', keywords: ['yes'], skill: 'diagram' }
    ]
  },

  {
    id: 'apcem_frq_u2_03',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Capacitors in Combination',
    units: [2],
    topic: '2.3 Capacitor Circuits',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'Three capacitors $C_1 = 2\\,\\mu\\text{F}$, $C_2 = 4\\,\\mu\\text{F}$, and $C_3 = 4\\,\\mu\\text{F}$ are arranged so that $C_2$ and $C_3$ are in parallel with each other, and that combination is in series with $C_1$. The network is connected to a $V = 18\\,\\text{V}$ battery.',
    parts: [
      { label: 'a', instruction: 'Draw the circuit diagram described above.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Calculate the equivalent capacitance of the network.', skill: 'calculation', points: 2 },
      { label: 'c', instruction: 'Calculate the charge on and voltage across each capacitor.', skill: 'calculation', points: 3 },
      { label: 'd', instruction: 'Calculate the total energy stored in the network.', skill: 'calculation', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Circuit shows $C_2$ and $C_3$ connected in parallel, and that parallel combination in series with $C_1$, connected across the battery.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Parallel combination: $C_{23} = C_2 + C_3 = 4 + 4 = 8\\,\\mu\\text{F}$.', keywords: ['8', 'C2 + C3', 'c_23 = 8', '8 uF', '8 microfarad', 'parallel add'], skill: 'calculation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Series with $C_1$: $1/C_{eq} = 1/C_1 + 1/C_{23} = 1/2 + 1/8 = 5/8$, so $C_{eq} = 8/5 = 1.6\\,\\mu\\text{F}$.', keywords: ['1.6', '8/5', '1.6 uF', 'C_eq = 1.6'], skill: 'calculation' },
      { index: 4, partLabel: 'c', points: 1, description: 'Total charge: $Q = C_{eq}V = (1.6\\times10^{-6})(18) = 2.88 \\times 10^{-5}\\,\\text{C} = 28.8\\,\\mu\\text{C}$. This is also $Q_1$ (series).', keywords: ['28.8', '2.88', 'Q = CV', 'Q1 = 28.8'], cpeSource: 'b', skill: 'calculation' },
      { index: 5, partLabel: 'c', points: 1, description: '$V_1 = Q/C_1 = 28.8/2 = 14.4\\,\\text{V}$ and $V_{23} = 18 - 14.4 = 3.6\\,\\text{V}$ across each of $C_2$ and $C_3$ (parallel).', keywords: ['14.4', '3.6', 'V1 = 14.4', 'V2 = 3.6', 'V3 = 3.6'], cpeSource: 'b', skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: '$Q_2 = C_2 \\cdot V_{23} = 4(3.6) = 14.4\\,\\mu\\text{C}$ and $Q_3 = C_3 \\cdot V_{23} = 4(3.6) = 14.4\\,\\mu\\text{C}$.', keywords: ['Q2 = 14.4', 'Q3 = 14.4', '14.4 uC'], skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'Total energy: $U = \\frac{1}{2}C_{eq}V^2 = \\frac{1}{2}(1.6\\times10^{-6})(324) = 2.59 \\times 10^{-4}\\,\\text{J} \\approx 0.259\\,\\text{mJ}$.', keywords: ['2.59', '0.259', '10^-4', '1/2 CV^2', '259', 'mJ'], cpeSource: 'b', skill: 'calculation' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 3 — ELECTRIC CIRCUITS
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'apcem_frq_u3_01',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Resistor Network — Series and Parallel',
    units: [3],
    topic: '3.1 Ohm\'s Law & Equivalent Resistance',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A circuit consists of a $\\mathcal{E} = 24\\,\\text{V}$ battery (negligible internal resistance) connected to resistors: $R_1 = 6\\,\\Omega$ in series with a parallel combination of $R_2 = 12\\,\\Omega$ and $R_3 = 4\\,\\Omega$.',
    parts: [
      { label: 'a', instruction: 'Draw the circuit described above.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Calculate the equivalent resistance of the circuit.', skill: 'calculation', points: 2 },
      { label: 'c', instruction: 'Calculate the current through each resistor.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Calculate the power dissipated by each resistor and verify it equals the power supplied by the battery.', skill: 'calculation', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Circuit diagram shows $R_2$ and $R_3$ in parallel, that combination in series with $R_1$, connected to battery $\\mathcal{E}$.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Parallel: $1/R_{23} = 1/12 + 1/4 = 1/3$, so $R_{23} = 3\\,\\Omega$.', keywords: ['3', 'R_23 = 3', '3 ohm', '1/12 + 1/4'], skill: 'calculation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Total: $R_{eq} = R_1 + R_{23} = 6 + 3 = 9\\,\\Omega$.', keywords: ['9', 'R_eq = 9', '9 ohm', '6 + 3'], skill: 'calculation' },
      { index: 4, partLabel: 'c', points: 1, description: 'Total current: $I = \\mathcal{E}/R_{eq} = 24/9 = 8/3 \\approx 2.67\\,\\text{A}$. This is also $I_1$.', keywords: ['2.67', '8/3', '2.7', 'I = 24/9', 'I1 = 2.67'], cpeSource: 'b', skill: 'calculation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Voltage across parallel: $V_{23} = IR_{23} = (8/3)(3) = 8\\,\\text{V}$. $I_2 = 8/12 = 2/3\\,\\text{A} \\approx 0.67\\,\\text{A}$; $I_3 = 8/4 = 2\\,\\text{A}$.', keywords: ['0.67', '2/3', 'I2 = 0.67', 'I3 = 2', 'V = 8'], cpeSource: 'b', skill: 'calculation' },
      { index: 6, partLabel: 'd', points: 1, description: 'Power: $P_1 = I^2R_1 = (8/3)^2(6) \\approx 42.67\\,\\text{W}$; $P_2 = (2/3)^2(12) \\approx 5.33\\,\\text{W}$; $P_3 = (2)^2(4) = 16\\,\\text{W}$.', keywords: ['42.67', '5.33', '16', 'P1', 'P2', 'P3', 'I^2 R'], skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'Total power = $42.67 + 5.33 + 16 = 64\\,\\text{W}$. Battery power: $P = \\mathcal{E}I = 24(8/3) = 64\\,\\text{W}$. They match (conservation of energy).', keywords: ['64', 'conservation', 'equal', 'match', 'P = EI', 'P = 64'], skill: 'calculation' }
    ]
  },

  {
    id: 'apcem_frq_u3_02',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Kirchhoff\'s Laws — Two-Loop Circuit',
    units: [3],
    topic: '3.2 Kirchhoff\'s Rules',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A circuit contains two batteries and three resistors. Battery $\\mathcal{E}_1 = 12\\,\\text{V}$ is in the left loop with $R_1 = 4\\,\\Omega$ and shared resistor $R_3 = 2\\,\\Omega$. Battery $\\mathcal{E}_2 = 6\\,\\text{V}$ is in the right loop with $R_2 = 3\\,\\Omega$ and the same $R_3$. All internal resistances are negligible.',
    parts: [
      { label: 'a', instruction: 'Draw the circuit and label assumed current directions $I_1$, $I_2$, $I_3$.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Write the junction rule equation and the two loop equations.', skill: 'derivation', points: 3 },
      { label: 'c', instruction: 'Solve for the three currents $I_1$, $I_2$, and $I_3$.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Determine the voltage across $R_3$ and state which terminal is at higher potential.', skill: 'calculation', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Circuit drawn with two loops sharing $R_3$, current directions labeled consistently with junction rule.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Junction rule (KCL): $I_1 = I_2 + I_3$ (or equivalent assignment of current directions).', keywords: ['I1 = I2 + I3', 'I1 - I2 - I3 = 0', 'junction', 'kirchhoff', 'KCL', 'node rule', 'current in = current out'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Left loop (KVL): $\\mathcal{E}_1 - I_1R_1 - I_3R_3 = 0 \\Rightarrow 12 - 4I_1 - 2I_3 = 0$.', keywords: ['12 - 4I1 - 2I3', 'E1 - I1R1 - I3R3', 'loop rule', 'KVL', 'voltage loop'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Right loop (KVL): $\\mathcal{E}_2 - I_2R_2 - I_3R_3 = 0 \\Rightarrow 6 - 3I_2 - 2I_3 = 0$.', keywords: ['6 - 3I2 - 2I3', 'E2 - I2R2 - I3R3', 'second loop'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Solves system: substituting $I_1 = I_2 + I_3$ into left loop to get two equations in two unknowns. Result: $I_1 \\approx 2.25\\,\\text{A}$.', keywords: ['2.25', '9/4', 'I1 = 2.25', 'I1 = 9/4', 'substitute'], skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: '$I_2 \\approx 0.75\\,\\text{A}$, $I_3 \\approx 1.50\\,\\text{A}$. (Signs confirm assumed directions are correct.)', keywords: ['0.75', '1.5', '3/4', '3/2', 'I2 = 0.75', 'I3 = 1.5'], skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: '$V_{R3} = I_3 R_3 = (1.5)(2) = 3\\,\\text{V}$. The terminal connected to the batteries\' positive side is at higher potential.', keywords: ['3 V', 'V = 3', 'I3 R3', '1.5 times 2', 'higher potential'], skill: 'calculation' }
    ]
  },

  {
    id: 'apcem_frq_u3_03',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'RC Circuit — Charging Transient',
    units: [3],
    topic: '3.3 RC Circuits',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'An uncharged capacitor $C = 50\\,\\mu\\text{F}$ is connected in series with a resistor $R = 10\\,\\text{k}\\Omega$ and a battery $\\mathcal{E} = 20\\,\\text{V}$. The switch is closed at $t = 0$.',
    parts: [
      { label: 'a', instruction: 'Using Kirchhoff\'s voltage law, derive the differential equation for the charge $q(t)$ on the capacitor during charging.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Solve the differential equation to find $q(t)$ and $I(t)$.', skill: 'derivation', points: 2 },
      { label: 'c', instruction: 'Calculate the time constant $\\tau$ and the charge and current at $t = \\tau$.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Sketch $q(t)$ and $I(t)$ on the same graph, labeling the time constant and asymptotic values.', skill: 'diagram', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Applies KVL: $\\mathcal{E} - IR - q/C = 0$ or equivalently $\\mathcal{E} = R\\frac{dq}{dt} + q/C$.', keywords: ['E - IR - q/C', 'E = R dq/dt + q/C', 'kirchhoff', 'KVL', 'loop rule', 'E - Rdq/dt - q/C = 0'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Rearranges to $\\frac{dq}{dt} = \\frac{\\mathcal{E} - q/C}{R}$ and identifies this as a first-order linear ODE.', keywords: ['dq/dt', 'first order', 'separable', 'differential equation', 'ODE'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Solves: $q(t) = C\\mathcal{E}(1 - e^{-t/RC})$ with initial condition $q(0)=0$.', keywords: ['q = CE(1 - e^{-t/RC})', '1 - e^(-t/RC)', '1-e^(-t/tau)', 'q(0) = 0', 'CE(1-e'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Current: $I(t) = dq/dt = (\\mathcal{E}/R)e^{-t/RC}$ and $I(0) = \\mathcal{E}/R$.', keywords: ['I = E/R e^{-t/RC}', 'E/R e^(-t/RC)', 'e^(-t/tau)', 'I(0) = E/R', 'exponential decay'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: 'Time constant: $\\tau = RC = (10{,}000)(50\\times10^{-6}) = 0.5\\,\\text{s}$.', keywords: ['0.5', 'tau = 0.5', 'RC = 0.5', '500 ms', 'tau = RC'], skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: 'At $t=\\tau$: $q(\\tau) = C\\mathcal{E}(1-1/e) \\approx 0.632 C\\mathcal{E} = 0.632(10^{-3}) \\approx 6.32 \\times 10^{-4}\\,\\text{C}$ and $I(\\tau) = (\\mathcal{E}/R)/e \\approx 0.736\\,\\text{mA}$.', keywords: ['0.632', '63.2%', '1-1/e', '6.32', '0.736', '0.74', '1/e'], cpeSource: 'b', skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'Graph: $q(t)$ rises exponentially toward $Q_{max} = C\\mathcal{E}$; $I(t)$ decays exponentially from $I_0 = \\mathcal{E}/R$ toward zero. Time constant $\\tau$ marked on horizontal axis.', keywords: ['yes'], skill: 'diagram' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 4 — MAGNETIC FIELDS & ELECTROMAGNETISM
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'apcem_frq_u4_01',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Force on a Current-Carrying Wire',
    units: [4],
    topic: '4.1 Magnetic Force',
    difficulty: 'medium',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A straight wire of length $L = 0.40\\,\\text{m}$ carries a current $I = 5\\,\\text{A}$ and is placed in a uniform magnetic field $B = 0.30\\,\\text{T}$. The angle between the wire and the field is $\\theta = 60°$.',
    parts: [
      { label: 'a', instruction: 'On the diagram, draw and label the direction of the magnetic force on the wire using the right-hand rule.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Starting from the expression for the magnetic force on a current-carrying conductor, calculate the magnitude of the force.', skill: 'calculation', points: 2 },
      { label: 'c', instruction: 'If the wire is free to rotate, describe and explain the resulting motion until equilibrium.', skill: 'paragraph', points: 2 },
      { label: 'd', instruction: 'Derive the torque on a rectangular current loop of area $A$ in a uniform field $B$ and express it as $\\vec{\\tau} = \\vec{m} \\times \\vec{B}$.', skill: 'derivation', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Force arrow perpendicular to both the wire and $\\vec{B}$, direction consistent with $\\vec{F} = I\\vec{L} \\times \\vec{B}$ (right-hand rule correctly applied).', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'Starts from $F = BIL\\sin\\theta$ (the force on a current-carrying wire in a magnetic field).', keywords: ['F = BIL sin', 'F = ILB sin', 'BIL sin theta', 'IL cross B', 'force on current'], skill: 'calculation' },
      { index: 3, partLabel: 'b', points: 1, description: '$F = (0.30)(5)(0.40)\\sin 60° = 0.60 \\times 0.866 = 0.52\\,\\text{N}$.', keywords: ['0.52', '0.520', '0.5196', 'sin 60', '0.866'], skill: 'calculation' },
      { index: 4, partLabel: 'c', points: 1, description: 'The torque causes the wire to rotate until it aligns parallel to the field ($\\theta = 0$), where the force/torque becomes zero.', keywords: ['rotate', 'align', 'parallel', 'theta = 0', 'equilibrium', 'torque zero'], skill: 'paragraph' },
      { index: 5, partLabel: 'c', points: 1, description: 'At equilibrium ($\\theta = 0$), $F = BIL\\sin 0 = 0$, so the net force vanishes and the wire is in stable equilibrium parallel to $\\vec{B}$.', keywords: ['sin 0 = 0', 'force is zero', 'stable', 'no net force', 'no torque'], skill: 'paragraph' },
      { index: 6, partLabel: 'd', points: 1, description: 'For a rectangular loop: forces on top/bottom segments produce torque $\\tau = NIAB\\sin\\alpha$ where $\\alpha$ is the angle between the area vector and $\\vec{B}$.', keywords: ['tau = NIAB sin', 'NIAB', 'torque on loop', 'area vector', 'couple'], skill: 'derivation' },
      { index: 7, partLabel: 'd', points: 1, description: 'Defines magnetic moment $\\vec{m} = NI\\vec{A}$ and writes $\\vec{\\tau} = \\vec{m} \\times \\vec{B}$, showing the cross product gives the correct magnitude and direction.', keywords: ['m = NIA', 'm = IA', 'magnetic moment', 'tau = m cross B', 'm x B', 'magnetic dipole'], skill: 'derivation' }
    ]
  },

  {
    id: 'apcem_frq_u4_02',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Ampere\'s Law — Long Solenoid',
    units: [4],
    topic: '4.2 Ampere\'s Law',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A long solenoid has $n = 2000\\,\\text{turns/m}$ and carries current $I = 3\\,\\text{A}$. The solenoid has radius $R = 0.05\\,\\text{m}$. Use $\\mu_0 = 4\\pi \\times 10^{-7}\\,\\text{T}\\!\\cdot\\!\\text{m/A}$.',
    parts: [
      { label: 'a', instruction: 'Draw an Amperian loop you would use to find the magnetic field inside the solenoid. Explain your choice of path.', skill: 'diagram', points: 1 },
      { label: 'b', instruction: 'Using Ampere\'s law, derive the magnetic field inside the solenoid.', skill: 'derivation', points: 3 },
      { label: 'c', instruction: 'Calculate the numerical value of $B$ inside the solenoid.', skill: 'calculation', points: 1 },
      { label: 'd', instruction: 'Explain why the field outside an ideal (infinite) solenoid is zero.', skill: 'paragraph', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'Rectangular Amperian loop with one side inside the solenoid parallel to the axis and one side outside. Clearly labeled.', keywords: ['yes'], skill: 'diagram' },
      { index: 2, partLabel: 'b', points: 1, description: 'States Ampere\'s law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enc}$.', keywords: ['ampere', 'B dot dl', 'mu_0 I_enc', 'line integral', 'closed path'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Only the side inside contributes ($B$ parallel to path); outside side contributes zero. So $Bl = \\mu_0 n l I$ where $nl$ is the number of turns enclosed.', keywords: ['Bl = mu_0 n l I', 'Bl', 'only inside', 'nl turns', 'enclosed current', 'nI per length'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Solves: $B = \\mu_0 n I$ (uniform inside the solenoid, independent of position).', keywords: ['B = mu_0 n I', 'B = mu_0 nI', 'uniform', 'independent of position', 'mu nI', 'mu0nI'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: '$B = (4\\pi \\times 10^{-7})(2000)(3) = 7.54 \\times 10^{-3}\\,\\text{T} \\approx 7.5\\,\\text{mT}$.', keywords: ['7.54', '7.5', 'mT', '10^-3', '0.00754', '7.54e-3'], cpeSource: 'b', skill: 'calculation' },
      { index: 6, partLabel: 'd', points: 1, description: 'By symmetry, the field outside an ideal infinite solenoid cancels. An Amperian loop entirely outside encloses no net current.', keywords: ['symmetry', 'cancels', 'zero net current', 'no enclosed current', 'cancel outside'], skill: 'paragraph' },
      { index: 7, partLabel: 'd', points: 1, description: 'Equivalently, applying Ampere\'s law to a rectangular loop outside gives $\\oint \\vec{B}\\cdot d\\vec{l} = 0$, confirming $B = 0$ outside.', keywords: ['B = 0', 'ampere', 'outside', 'field is zero outside', 'no field outside', 'zero outside'], skill: 'paragraph' }
    ]
  },

  {
    id: 'apcem_frq_u4_03',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Faraday\'s Law — Changing Magnetic Flux',
    units: [4],
    topic: '4.3 Faraday\'s Law & Induction',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A circular loop of wire with radius $r = 0.10\\,\\text{m}$ and resistance $R = 5\\,\\Omega$ is placed in a uniform magnetic field perpendicular to the plane of the loop. The field increases linearly from $B_0 = 0$ to $B_f = 0.50\\,\\text{T}$ over a time interval $\\Delta t = 0.20\\,\\text{s}$.',
    parts: [
      { label: 'a', instruction: 'State Faraday\'s law and use it to derive the induced EMF in the loop.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Calculate the induced EMF and the induced current.', skill: 'calculation', points: 2 },
      { label: 'c', instruction: 'Using Lenz\'s law, determine the direction of the induced current. Explain your reasoning.', skill: 'paragraph', points: 2 },
      { label: 'd', instruction: 'Calculate the total energy dissipated in the loop during the $0.20\\,\\text{s}$ interval.', skill: 'calculation', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'States Faraday\'s law: $\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$ where $\\Phi_B = \\int \\vec{B} \\cdot d\\vec{A}$.', keywords: ['faraday', 'emf = -dPhi/dt', 'E = -d(phi)/dt', '-d phi_B/dt', 'rate of change of flux', 'flux'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'For uniform $B$ perpendicular to loop: $\\Phi_B = BA = B\\pi r^2$. Since $B$ changes linearly, $|\\mathcal{E}| = \\pi r^2 \\frac{\\Delta B}{\\Delta t}$.', keywords: ['Phi = BA', 'B pi r^2', 'pi r^2 delta B', 'pi r^2 dB/dt', 'delta B / delta t'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: '$|\\mathcal{E}| = \\pi (0.10)^2 (0.50/0.20) = \\pi(0.01)(2.5) = 0.0785\\,\\text{V} \\approx 78.5\\,\\text{mV}$.', keywords: ['0.0785', '78.5', '0.079', '0.025 pi', '25 pi', 'mV'], skill: 'calculation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Induced current: $I = |\\mathcal{E}|/R = 0.0785/5 = 0.0157\\,\\text{A} \\approx 15.7\\,\\text{mA}$.', keywords: ['0.0157', '15.7', '0.016', '0.0157 A', 'mA', '5 pi'], cpeSource: 'a', skill: 'calculation' },
      { index: 5, partLabel: 'c', points: 1, description: 'By Lenz\'s law, the induced current opposes the change in flux. Since flux is increasing (into page), the induced current flows counterclockwise (to create a field opposing the increase).', keywords: ['lenz', 'oppose', 'counterclockwise', 'opposes the change', 'opposes increase', 'opposing flux'], skill: 'paragraph' },
      { index: 6, partLabel: 'c', points: 1, description: 'The induced current creates a magnetic field out of the page inside the loop, which opposes the increasing external field into the page.', keywords: ['out of page', 'opposes increase', 'opposing direction', 'opposite to external', 'opposing field'], skill: 'paragraph' },
      { index: 7, partLabel: 'd', points: 1, description: 'Energy: $E = P \\cdot \\Delta t = I^2 R \\cdot \\Delta t = (0.0157)^2(5)(0.20) \\approx 2.47 \\times 10^{-4}\\,\\text{J} \\approx 0.247\\,\\text{mJ}$. Or equivalently $E = \\mathcal{E}^2 \\Delta t / R$.', keywords: ['2.47', '0.247', '10^-4', 'I^2 R', 'P delta t', '0.000247', 'mJ'], cpeSource: 'b', skill: 'calculation' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 5 — ELECTROMAGNETISM (Biot-Savart, Inductors)
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'apcem_frq_u5_01',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'Biot-Savart Law — Magnetic Field of a Long Wire',
    units: [5],
    topic: '5.1 Biot-Savart Law',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'A long straight wire carries a steady current $I = 10\\,\\text{A}$. Point P is located a perpendicular distance $d = 0.05\\,\\text{m}$ from the wire. Use $\\mu_0 = 4\\pi \\times 10^{-7}\\,\\text{T}\\!\\cdot\\!\\text{m/A}$.',
    parts: [
      { label: 'a', instruction: 'State the Biot-Savart law and explain each term.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Using either Biot-Savart integration or Ampere\'s law, derive the magnetic field at distance $d$ from an infinite straight wire.', skill: 'derivation', points: 2 },
      { label: 'c', instruction: 'Calculate the magnetic field at point P.', skill: 'calculation', points: 1 },
      { label: 'd', instruction: 'A second parallel wire carrying current $I_2 = 10\\,\\text{A}$ in the same direction is placed $d = 0.05\\,\\text{m}$ away. Determine the force per unit length between the wires and whether it is attractive or repulsive.', skill: 'calculation', points: 2 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'States Biot-Savart law: $d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec{l} \\times \\hat{r}}{r^2}$ and identifies each term ($d\\vec{l}$ is current element, $\\hat{r}$ is unit vector from element to field point, $r$ is distance).', keywords: ['biot-savart', 'biot savart', 'mu_0/4pi', 'dl cross r', 'Idl', 'current element', 'r hat', 'unit vector'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Correctly explains that $d\\vec{l} \\times \\hat{r}$ gives the direction of the field (using right-hand rule) and that $r^2$ in the denominator gives the inverse-square dependence.', keywords: ['right-hand rule', 'inverse square', 'cross product', 'direction', 'perpendicular'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Derives $B = \\mu_0 I/(2\\pi d)$ either by integrating Biot-Savart for infinite wire or by applying Ampere\'s law with a circular path.', keywords: ['mu_0 I / 2 pi d', 'mu_0 I/(2pi d)', 'B = mu0I/2pid', 'ampere', 'circular path', 'integration'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: 'Correctly identifies that the integration yields $\\mu_0 I / (2\\pi d)$ after evaluating $\\int d\\theta$ from 0 to $\\pi$ or equivalent.', keywords: ['mu_0 I / 2 pi d', '2 pi d', 'integral', 'ampere gives same'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: '$B = (4\\pi \\times 10^{-7})(10)/(2\\pi \\times 0.05) = 4 \\times 10^{-5}\\,\\text{T} = 40\\,\\mu\\text{T}$.', keywords: ['4e-5', '4 x 10^-5', '40 uT', '40 micro', '0.00004', '4*10^-5'], cpeSource: 'b', skill: 'calculation' },
      { index: 6, partLabel: 'd', points: 1, description: 'Force per unit length: $F/L = \\mu_0 I_1 I_2/(2\\pi d) = (4\\pi\\times10^{-7})(10)(10)/(2\\pi\\times0.05) = 4 \\times 10^{-4}\\,\\text{N/m}$.', keywords: ['4e-4', '4 x 10^-4', '0.0004', '4*10^-4', 'mu_0 I1 I2 / 2pi d'], skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'Parallel currents in the same direction attract each other (each wire is in the field of the other; force direction from $\\vec{F} = I\\vec{L}\\times\\vec{B}$ points toward the other wire).', keywords: ['attract', 'attractive', 'same direction attract', 'toward each other', 'parallel currents attract'], skill: 'calculation' }
    ]
  },

  {
    id: 'apcem_frq_u5_02',
    subject: 'apphyscem',
    type: 'FRQ',
    frqType: 'frq',
    title: 'RL Circuit — Inductor Transient',
    units: [5],
    topic: '5.2 Inductance & RL Circuits',
    difficulty: 'hard',
    source: 'AP Exam Style',
    autoGraded: true,
    points: 7,
    prompt: 'An inductor $L = 200\\,\\text{mH}$ is connected in series with a resistor $R = 100\\,\\Omega$ and an EMF source $\\mathcal{E} = 10\\,\\text{V}$. The switch is closed at $t = 0$.',
    parts: [
      { label: 'a', instruction: 'Using Kirchhoff\'s voltage law, derive the differential equation for the current $I(t)$.', skill: 'derivation', points: 2 },
      { label: 'b', instruction: 'Solve for $I(t)$ and find the time constant $\\tau$.', skill: 'derivation', points: 2 },
      { label: 'c', instruction: 'Calculate the current at $t = \\tau$ and at $t = 5\\tau$.', skill: 'calculation', points: 2 },
      { label: 'd', instruction: 'Calculate the energy stored in the inductor at $t \\to \\infty$.', skill: 'calculation', points: 1 }
    ],
    rubric: [
      { index: 1, partLabel: 'a', points: 1, description: 'KVL: $\\mathcal{E} - L\\frac{dI}{dt} - IR = 0$ or equivalently $L\\frac{dI}{dt} + IR = \\mathcal{E}$.', keywords: ['E - L dI/dt - IR = 0', 'L dI/dt + IR = E', 'kirchhoff', 'KVL', 'inductor voltage'], skill: 'derivation' },
      { index: 2, partLabel: 'a', points: 1, description: 'Identifies this as a first-order linear ODE and separates/integrates.', keywords: ['first order', 'separable', 'integrate', 'ODE', 'differential equation'], skill: 'derivation' },
      { index: 3, partLabel: 'b', points: 1, description: 'Solution: $I(t) = \\frac{\\mathcal{E}}{R}(1 - e^{-t/\\tau})$ where $\\tau = L/R$.', keywords: ['I = E/R (1 - e^{-t/tau})', 'E/R(1-e', '1 - e^(-t/tau)', 'tau = L/R', 'L/R'], skill: 'derivation' },
      { index: 4, partLabel: 'b', points: 1, description: '$\\tau = L/R = 0.200/100 = 2.0 \\times 10^{-3}\\,\\text{s} = 2.0\\,\\text{ms}$.', keywords: ['2.0', '2 ms', '0.002', '2e-3', '2.0 ms', 'tau = 2', '2 x 10^-3'], skill: 'derivation' },
      { index: 5, partLabel: 'c', points: 1, description: 'At $t = \\tau$: $I = (10/100)(1 - 1/e) = 0.1(0.632) = 0.0632\\,\\text{A} \\approx 63.2\\,\\text{mA}$.', keywords: ['0.0632', '63.2', '0.063', '63 mA', '1 - 1/e', '0.632'], cpeSource: 'b', skill: 'calculation' },
      { index: 6, partLabel: 'c', points: 1, description: 'At $t = 5\\tau$: $I \\approx (\\mathcal{E}/R)(1 - e^{-5}) \\approx 0.1(0.9933) = 0.0993\\,\\text{A} \\approx 99.3\\,\\text{mA}$, essentially the maximum current.', keywords: ['0.0993', '99.3', '0.099', '99 mA', 'e^{-5}', 'maximum', 'essentially E/R'], cpeSource: 'b', skill: 'calculation' },
      { index: 7, partLabel: 'd', points: 1, description: 'At $t \\to \\infty$: $I_{max} = \\mathcal{E}/R = 0.1\\,\\text{A}$. Energy: $U = \\frac{1}{2}LI^2 = \\frac{1}{2}(0.200)(0.1)^2 = 1.0 \\times 10^{-3}\\,\\text{J} = 1.0\\,\\text{mJ}$.', keywords: ['1.0 mJ', '0.001', '10^-3', '1/2 LI^2', '1 mJ', '1.0e-3', 'half LI squared'], skill: 'calculation' }
    ]
  }

];
