let input = document.querySelector("#input");
input = input.textContent.split("\n");

corrupt = [];
const openings = ['(', '[', '{', '<']

pairs = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}

missingPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const costs = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const scores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

let incomplete = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let symbols = [];
  incomplete.push(line);
  for (let j = 0; j < line.length; j++) {
    sym = line[j];
    if (openings.includes(sym)) {
      symbols.push(sym);
    } else if (symbols[symbols.length - 1] === pairs[sym]) {
      symbols.pop();
    } else {
      corrupt.push(sym);
      incomplete.pop();
      break;
    }
  }
}
let total = 0;
corrupt.forEach(function (x) {
  total += costs[x];
})
console.log('Total error score (part 1): ', total);


let missing = [];
for (let i = 0; i < incomplete.length; i++) {
  const line = incomplete[i];
  let symbols = [];
  for (let j = 0; j < line.length; j++) {
    sym = line[j];
    if (openings.includes(sym)) {
      symbols.push(sym);
    } else if (symbols[symbols.length - 1] === pairs[sym]) {
      symbols.pop();
    }
  }
  missing[i] = '';
  for (let n = symbols.length - 1; n >= 0; n--) {
    missing[i] += missingPairs[symbols[n]];
  }
}

let totals = [];
missing.forEach(function (line) {
  let score = 0;
  for (let n = 0; n < line.length; n++) {
    score = score * 5 + scores[line[n]];
  }
  totals.push(score);
});
totals.sort(function (a, b) {
  return a - b;
})

console.log('Autocomplete middle score: ', totals[(totals.length - 1) / 2]);