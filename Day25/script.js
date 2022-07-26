let input = document.querySelector("#input");
input = input.textContent.split('\n');
const map = []
for (let i = 0; i < input.length; i++) {
  map[i] = Array.from(input[i]);
}
console.log(input);

let x, y;

let counter = 0;
let steps = 1;
// for (let z = 0; z < 1; z++) {
while (steps > 0) {
  counter += 1;
  console.log(counter);
  steps = 0;
  for (let i = 0; i < input.length; i++) {
    input[i] = [...map[i]];
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (j === input[i].length - 1) {
        y = 0;
      } else {
        y = j + 1;
      }
      if (input[i][j] === '>' && input[i][y] === '.') {
        map[i][y] = '>';
        map[i][j] = '.';
        steps += 1;
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    input[i] = [...map[i]];
  }

  for (let i = 0; i < input.length; i++) {
    if (i === input.length - 1) {
      x = 0;
    } else {
      x = i + 1;
    }
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'v' && input[x][j] === '.') {
        map[x][j] = 'v';
        map[i][j] = '.';
        steps += 1;
      }
    }
  }
}

console.log(counter);