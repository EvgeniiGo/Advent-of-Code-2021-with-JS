let input = document.querySelector("#input");
input = input.textContent.split("\n    ");
// input = input.textContent.split(" | ");

let signals = []
let output = [];
for (i = 0; i < input.length; i++) {
  line = input[i].split(' | ');
  signals.push(line[0].split(' '));
  output.push(line[1].split(' '));
}

// Part 1

// const uniqueDigits = [2, 3, 4, 7];

// let counter = 0;
// for (let i = 0; i < output.length; i++) {
//   for (let j = 0; j < output[i].length; j++) {
//     if (uniqueDigits.includes(output[i][j].length)) {
//       counter += 1;
//     }
//   }
// }

// console.log(counter);


let letters;
let digits;
let x;
let counter;
let values = [];

function lookingFor(x, y) {
  let words = x.filter(function (word) {
    return word.length === y;
  });
  return words;
}

function returnUnique(x, y) {
  for (letter in x) {
    if (!y.includes(x[letter])) {
      return x[letter];
    }
  }
}

function updateDigits(x, y) {
  let newX = '';
  for (i in x) {
    for (j in y) {
      if (j === x[i]) {
        newX += y[j];
      }
    }
  }
  return newX;
}

function findWordValue(x, y) {
  if (y.length === 7) { return 8; }
  else if (y.length === 2) { return 1; }
  else if (y.length === 3) { return 7; }
  else if (y.length === 4) { return 4; }
  else {
    for (i in x) {
      let counter = 0;
      for (j in y) {
        if (x[i].includes(y[j])) {
          counter += 1;
        } else {
          break;
        }
        if (counter === y.length) {
          return i;
        }
      }
    }
  }
}

for (let i = 0; i < signals.length; i++) {
  digits = {
    0: 'abcefg',
    1: 'cf',
    2: 'acdeg',
    3: 'acdfg',
    4: 'bcdf',
    5: 'abdfg',
    6: 'abdefg',
    7: 'acf',
    8: 'abcdefg',
    9: 'abcdfg'
  }
  letters = {};
  // Find a
  digits[1] = [digits[1], String(lookingFor(signals[i], 2))];
  digits[7] = [digits[7], String(lookingFor(signals[i], 3))];
  for (letter in digits[7][1]) {
    if (!digits[1][1].includes(digits[7][1][letter])) {
      letters['a'] = digits[7][1][letter];
    }
  }

  // Find g
  digits[4] = [digits[4], String(lookingFor(signals[i], 4))];
  x = digits[4][1] + letters['a'];
  const words = lookingFor(signals[i], 6);
  for (word in words) {
    counter = 0;
    for (y in x) {
      if (words[word].includes(x[y])) {
        counter += 1;
      } else {
        break;
      }
    }
    if (counter === 5) {
      digits[9] = [digits[9], words[word]];
      letters['g'] = returnUnique(words[word], x)
    }
  }

  // Find e
  digits[8] = [digits[8], String(lookingFor(signals[i], 7))];
  letters['e'] = returnUnique(digits[8][1], digits[9][1]);

  // Find b
  x = letters['a'] + letters['g'] + letters['e'] + digits[1][1];
  for (word in words) {
    counter = 0;
    for (y in x) {
      if (words[word].includes(x[y])) {
        counter += 1;
      } else {
        break;
      }
    }
    if (counter === 5) {
      digits[0] = [digits[0], words[word]];
      letters['b'] = returnUnique(words[word], x)
    }
  }

  // Find d
  x = letters['b'] + digits[1][1];
  letters['d'] = returnUnique(digits[4][1], x);

  // Find f
  x = '';
  for (letter in letters) {
    x += letters[letter];
  }
  for (word in words) {
    counter = 0;
    for (y in x) {
      if (words[word].includes(x[y])) {
        counter += 1;
      } else {
        break;
      }
    }
    if (counter === 5) {
      digits[6] = [digits[6], words[word]];
      letters['f'] = returnUnique(words[word], x)
    }
  }

  // Find c
  letters['c'] = returnUnique(digits[1][1], letters['f']);

  // Update remaining digits
  digits[2] = [digits[2], updateDigits(digits[2], letters)];
  digits[3] = [digits[3], updateDigits(digits[3], letters)];
  digits[5] = [digits[5], updateDigits(digits[5], letters)];


  // Find values
  let value = ''
  const digitsToLook = {
    0: digits[0][1],
    2: digits[2][1],
    3: digits[3][1],
    5: digits[5][1],
    6: digits[6][1],
    9: digits[9][1]
  };

  for (word in output[i]) {
    value += findWordValue(digitsToLook, output[i][word]);
  }
  values.push(Number(value));
}
const total = values.reduce(function (sum, val) {
  return sum + val;
})
console.log(total);