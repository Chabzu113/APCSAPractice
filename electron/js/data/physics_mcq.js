'use strict';
// AP Physics 1 — MCQ Question Bank
// LaTeX uses $...$ inline and $$...$$ block (parsed by renderFRQPromptText in app.js)
// diagram field holds a relative path from the app root: "problems/physics/<file>"

window.PHYSICS_MCQ = [
  {
    id: 'aphy1_u1_q1',
    subject: 'apphys1',
    unit: 1,
    topic: '1.1 Position, Velocity & Acceleration',
    difficulty: 'easy',
    type: 'MCQ',
    question: 'A car starts from rest and accelerates uniformly at $a = 3\\,\\text{m/s}^2$. Using the kinematic equation $$v = v_0 + at$$ what is its speed after $t = 4\\,\\text{s}$?',
    diagram: 'problems/physics/kinematics_fbd_placeholder.png',
    choices: [
      '$v = 6\\,\\text{m/s}$',
      '$v = 12\\,\\text{m/s}$',
      '$v = 16\\,\\text{m/s}$',
      '$v = 24\\,\\text{m/s}$'
    ],
    answer: 1,
    explanation: 'Substituting into $v = v_0 + at$ with $v_0 = 0$: $$v = 0 + (3)(4) = 12\\,\\text{m/s}$$'
  },
  {
    id: 'aphy1_u1_q2',
    subject: 'apphys1',
    unit: 1,
    topic: '1.1 Position, Velocity & Acceleration',
    difficulty: 'medium',
    type: 'MCQ',
    question: 'A ball is thrown horizontally off a cliff at $v_x = 15\\,\\text{m/s}$. Using $g = 10\\,\\text{m/s}^2$, how far does it travel horizontally before hitting the ground if the cliff is $20\\,\\text{m}$ tall? Use $$x = v_x \\sqrt{\\frac{2h}{g}}$$',
    choices: [
      '$x = 10\\,\\text{m}$',
      '$x = 20\\,\\text{m}$',
      '$x = 30\\,\\text{m}$',
      '$x = 45\\,\\text{m}$'
    ],
    answer: 2,
    explanation: 'Time to fall: $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2(20)}{10}} = 2\\,\\text{s}$. Horizontal distance: $x = v_x t = 15 \\times 2 = 30\\,\\text{m}$.'
  },
  {
    id: 'aphy1_u2_q1',
    subject: 'apphys1',
    unit: 2,
    topic: '2.1 Newton\'s First & Second Law',
    difficulty: 'easy',
    type: 'MCQ',
    question: 'A net force of $F = 30\\,\\text{N}$ acts on an object of mass $m = 6\\,\\text{kg}$. What is the object\'s acceleration? Use $$a = \\frac{F_{net}}{m}$$',
    choices: [
      '$a = 0.2\\,\\text{m/s}^2$',
      '$a = 2\\,\\text{m/s}^2$',
      '$a = 5\\,\\text{m/s}^2$',
      '$a = 180\\,\\text{m/s}^2$'
    ],
    answer: 2,
    explanation: 'By Newton\'s Second Law: $a = \\frac{F_{net}}{m} = \\frac{30}{6} = 5\\,\\text{m/s}^2$.'
  },
  {
    id: 'aphy1_u3_q1',
    subject: 'apphys1',
    unit: 3,
    topic: '3.2 Conservation of Energy',
    difficulty: 'medium',
    type: 'MCQ',
    question: 'A block of mass $m = 2\\,\\text{kg}$ slides from rest down a frictionless ramp of height $h = 5\\,\\text{m}$. Using conservation of energy, what is its speed at the bottom? $$v = \\sqrt{2gh}$$',
    choices: [
      '$v = 5\\,\\text{m/s}$',
      '$v = 10\\,\\text{m/s}$',
      '$v = 20\\,\\text{m/s}$',
      '$v = 50\\,\\text{m/s}$'
    ],
    answer: 1,
    explanation: 'Setting potential energy equal to kinetic energy: $mgh = \\frac{1}{2}mv^2$. Solving: $v = \\sqrt{2gh} = \\sqrt{2(10)(5)} = \\sqrt{100} = 10\\,\\text{m/s}$.'
  },
  {
    id: 'aphy1_u5_q1',
    subject: 'apphys1',
    unit: 5,
    topic: '5.1 Impulse & Momentum',
    difficulty: 'medium',
    type: 'MCQ',
    question: 'A $0.5\\,\\text{kg}$ ball moving at $v_i = 8\\,\\text{m/s}$ is brought to rest by a wall in $\\Delta t = 0.02\\,\\text{s}$. What is the magnitude of the average force exerted on the ball? Use $$F = \\frac{\\Delta p}{\\Delta t}$$',
    choices: [
      '$F = 20\\,\\text{N}$',
      '$F = 80\\,\\text{N}$',
      '$F = 200\\,\\text{N}$',
      '$F = 400\\,\\text{N}$'
    ],
    answer: 2,
    explanation: '$\\Delta p = m \\Delta v = 0.5 \\times (0 - 8) = -4\\,\\text{kg\\cdot m/s}$. Magnitude: $F = \\frac{|\\Delta p|}{\\Delta t} = \\frac{4}{0.02} = 200\\,\\text{N}$.'
  }
];
