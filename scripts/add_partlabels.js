const fs = require('fs');
let src = fs.readFileSync('js/data/apphyscem_frq.js', 'utf8');

const partMaps = [
  ['a','b','b','c','c','d','d'],  // Q1: a(1), b(2), c(2), d(2)
  ['a','b','b','c','c','d','d'],  // Q2: a(1), b(2), c(2), d(2)
  ['a','a','b','b','c','c','d'],  // Q3: a(2), b(2), c(2), d(1)
  ['a','a','b','b','b','c','c'],  // Q4: a(2), b(3), c(2)
  ['a','a','b','b','b','b','c'],  // Q5: a(2), b(3+1extra), c(2)
  ['a','b','b','c','c','c','d'],  // Q6: a(1), b(2), c(3), d(1)
  ['a','b','b','c','c','d','d'],  // Q7: a(1), b(2), c(2), d(2)
  ['a','b','b','b','c','c','d'],  // Q8: a(1), b(3), c(2), d(1)
  ['a','a','b','b','c','c','d'],  // Q9: a(2), b(2), c(2), d(1)
  ['a','b','b','c','c','d','d'],  // Q10: a(1), b(2), c(2), d(2)
  ['a','b','b','b','c','d','d'],  // Q11: a(1), b(3), c(1), d(2)
  ['a','a','b','b','c','c','d'],  // Q12: a(2), b(2), c(2), d(1)
  ['a','a','b','b','c','d','d'],  // Q13: a(2), b(2), c(1), d(2)
  ['a','a','b','b','c','c','d'],  // Q14: a(2), b(2), c(2), d(1)
];

let qIdx = -1;
let rIdx = 0;

src = src.replace(/\{ index: (\d+),/g, function(match, idx) {
  var i = parseInt(idx);
  if (i === 1) { qIdx++; rIdx = 0; }
  else { rIdx++; }
  var map = partMaps[qIdx];
  if (!map || rIdx >= map.length) return match;
  var label = map[rIdx];
  return "{ index: " + i + ", partLabel: '" + label + "',";
});

fs.writeFileSync('js/data/apphyscem_frq.js', src);
console.log('Done. Processed ' + (qIdx + 1) + ' questions.');
