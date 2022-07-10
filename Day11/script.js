let input = document.querySelector("#input");
input = input.textContent.split("\n");

for (let i = 0; i < input.length; i++) {
  input[i] = Array.from(input[i]);
}

console.log('Input: ', input);

const steps = 100;
let total = 0;

function step(x, y) {
  input[x][y] = Number(input[x][y]) + 1;
}

function flash(x, y) {
  for (let i = x - 1; i < x + 2; i++) {
    if (input[i] === undefined) {
      continue;
    } else {
      for (let j = y - 1; j < y + 2; j++) {
        if (input[i][j] === undefined || (i === x && j === y) || input[i][j] === 0) {
          continue;
        } else {
        input[i][j] = Number(input[i][j]) + 1;
        }
      }
    }
  }
}

let changes;
function updateFlashes(stepsNum) {
  for (let n = 0; n < stepsNum; n++) {
    for (let i = 0; i < input.length; i++) {
      line = input[i];
      for (let j = 0; j < line.length; j++) {
        step(i, j);
      }
    }
    do {
      changes = 0;
      for (let i = 0; i < input.length; i++) {
        line = input[i];
        for (let j = 0; j < line.length; j++) {
          num = line[j];
          if (num > 9) {
            flash(i, j);
            input[i][j] = 0;
            total += 1;
            changes += 1;
          }
        }
      }
    } while (changes > 0);
    // Addition for part 2
    if (totalCheck()) {
      // As we already did 100 steps before we continue our check
      console.log('Everybody flash - step ', n + steps + 1);
      return;
    }
  }
}

updateFlashes(steps);
console.log(total);


// Part 2 with little addition to the function of part 1
function totalCheck () {
  for (let i = 0; i < input.length; i++) {
    line = input[i];
    for (let j = 0; j < line.length; j++) {
      num = line[j];
      if (num !== 0) {
        return false;
      }
    }
  }
  return true;
}

updateFlashes(Infinity);