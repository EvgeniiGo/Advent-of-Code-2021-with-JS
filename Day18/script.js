let input = document.querySelector("#input");
input = input.textContent.split('\n');
const brackets = ['[', ']', ','];

function sum(x, y) {
  line = '[' + x + ',' + y + ']';
  let flag = 1;
  while (flag === 1) {
    [line, flag] = reduce(line);
  }
  return line;
}

function explode(line, i, leftValue, rightValue) {
  // x = number of digits of the first pair value
  // y = number of digits of the second pair value
  x = String(leftValue).length;
  y = String(rightValue).length;
  for (k = i + 2 + x + y; k < line.length; k++) {
    if (!brackets.includes(line[k])) {
      let right;
      if (brackets.includes(line[k + 1])) {
        right = String(Number(line[k]) + rightValue);
        line = line.slice(0, k) + right + line.slice(k + 1);
      } else {
        right = String(Number(line.slice(k, k + 2)) + rightValue)
        line = line.slice(0, k) + right + line.slice(k + 2);
      }
      break;
    }
  }
  for (let j = i - 1; j > 0; j--) {
    if (!brackets.includes(line[j])) {
      if (brackets.includes(line[j - 1])) {
        let left = String(Number(line[j]) + leftValue);
        line = line.slice(0, j) + left + line.slice(j + 1, i) + '0' + line.slice(i + 3 + x + y);
        break;
      } else {
        let left = String(Number(line.slice(j - 1, j + 1)) + leftValue);
        line = line.slice(0, j - 1) + left + line.slice(j + 1, i) + '0' + line.slice(i + 3 + x + y);
        break;
      }
    } else if (j === 1) {
      line = line.slice(0, i) + '0' + line.slice(i + 3 + x + y);
      break;
    }
  }
  return line;
}

function split(line, i) {
  line = line.slice(0, i) + '[' + Math.floor(Number(line.slice(i, i + 2)) / 2) + ',' + Math.ceil(Number(line.slice(i, i + 2)) / 2) + ']' + line.slice(i + 2);
  return line;
}

function reduce(line) {
  flag = 0;
  let bracketCounter = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '[') {
      bracketCounter += 1;
      if (bracketCounter >= 5) {
        let left, right;
        if ((!brackets.includes(line[i + 1])) && (line[i + 2] === ',') && (!brackets.includes(line[i + 3])) && (line[i + 4] === ']')) {
          left = Number(line[i + 1]);
          right = Number(line[i + 3]);
          flag = 1;
          line = explode(line, i, left, right);
          return [line, flag];
        }
        else if ((!brackets.includes(line[i + 1])) && (!brackets.includes(line[i + 2])) && (line[i + 3] === ',') && (!brackets.includes(line[i + 4])) && (line[i + 5] === ']')) {
          left = Number(line.slice(i + 1, i + 3));
          right = Number(line[i + 4]);
          flag = 1;
          line = explode(line, i, left, right);
          return [line, flag];
        }
        else if ((!brackets.includes(line[i + 1])) && (line[i + 2] === ',') && (!brackets.includes(line[i + 3])) && (!brackets.includes(line[i + 4])) && (line[i + 5] === ']')) {
          left = Number(line[i + 1]);
          right = Number(line.slice(i + 3, i + 5));
          flag = 1;
          line = explode(line, i, left, right);
          return [line, flag];
        }
        else if ((!brackets.includes(line[i + 1])) && (!brackets.includes(line[i + 2])) && (line[i + 3] === ',') && (!brackets.includes(line[i + 4])) && (!brackets.includes(line[i + 5])) && (line[i + 6] === ']')) {
          left = Number(line.slice(i + 1, i + 3));
          right = Number(line.slice(i + 4, i + 6));
          flag = 1;
          line = explode(line, i, left, right);
          return [line, flag];
        }
      }
    } else if (line[i] === ']') {
      bracketCounter -= 1;
    }
  }
  for (let i = 0; i < line.length; i++) {
    if (!brackets.includes(line[i]) && !brackets.includes(line[i + 1])) {
      flag = 1;
      line = split(line, i);
      return [line, flag];
    }
  }
  return [line, flag];
}

function findMagnitude(line) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ']') {
      for (let j = i; j >= 0; j--) {
        if (line[j] === '[') {
          for (let k = j; k < i; k++) {
            if (line[k] === ',') {
              line = line.slice(0, j) + ((Number(line.slice(j + 1, k)) * 3) + (Number(line.slice(k + 1, i)) * 2)) + line.slice(i + 1);
              return line;
            }
          }
        }
      }
    }
  }
}

function findTotal(line) {
  while (line.includes(',')) {
    line = findMagnitude(line);
  }
  return Number(line);
}

function part1() {
  let line = input[0];
  for (let z = 1; z < input.length; z++) {
    line = sum(line, input[z]);
  }
  findTotal(line);
}

// part1()

function part2() {
  let magnitudes = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++ ) {
      if (i === j) {
        continue;
      }
      magnitudes.push(findTotal(sum(input[i], input[j])));
      magnitudes.push(findTotal(sum(input[j], input[i])));
    }
  }
  console.log(Math.max(...magnitudes));
}

part2();
