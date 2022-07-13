let input = document.querySelector("#input");
input = input.textContent.split(' ');
const xPoints = input[2].slice(2).split('..');
const yPoints = input[3].slice(2).split('..');

console.log(xPoints);
console.log(yPoints);

let position = {
  'x': 0,
  'y': 0
}

let options = {};

function part1() {
  let maxY;

  let breakCounter = 0;
  const maxPoints = [];
  for (let y = 0; ; y++) {
    if (breakCounter > 20) {
      break;
    }
    let jCounter = 0;
    let yPoint;
    for (j = y; ; j--) {
      if (j === 0) {
        yPoint = jCounter;
      }
      jCounter += j;
      if (jCounter >= Number(yPoints[0]) && jCounter <= Number(yPoints[1])) {
        maxPoints.push(yPoint);
        break;
      }
      else if (jCounter < Number(yPoints[0])) {
        if (maxPoints.length > 0) {
          breakCounter += 1;
        }
        break;
      }
    }
  }
  let maxPointY = Math.max(...maxPoints)
  return maxPointY;
}

const maxY = part1();
console.log('maxY', maxY);

function findX(distanceX) {
  let optionsX = [];
  for (let x = 1; x <= distanceX; x++) {
    let xCounter = 0;
    for (i = x;; i--) {
      if (i > 0) {
        xCounter += i;
      }
      if (xCounter === distanceX) {
        optionsX.push(x);
        break;
      }
      else if (xCounter > distanceX) {
        break;
      }
      else if (xCounter < distanceX && i === 0) {
        break
      }
    }
  }
  return optionsX;
}

function findVelocity(x) {
  const distanceX = Number(x);
  const optionsX = findX(distanceX);
  return optionsX;
}

for (let i = Number(xPoints[0]); i <= Number(xPoints[1]); i++) {
  const optionsX = findVelocity(i);
  for (let x = 0; x < optionsX.length; x++) {
    let breakCounter = 0;
    for (let y = Number(yPoints[0]); y <= maxY; y++) {
      if (breakCounter > 20) {
        break;
      }
      let xCounter = 0;
      let jCounter = 0;
      for (let m = optionsX[x], j = y;; j--, m--) {
        jCounter += j;
        if (m > 0) {
          xCounter += m;
        }
        if (jCounter >= Number(yPoints[0]) && jCounter <= Number(yPoints[1]) && xCounter >= Number(xPoints[0]) && xCounter <= Number(xPoints[1])) {
          options[`${optionsX[x]},${y}`] = 1;
          break;
        }
        else if (jCounter < Number(yPoints[0]) || xCounter >= Number(xPoints[1])) {
          if (options.length > 0) {
            breakCounter += 1;
          }
          break;
        }
      }
    }
  }
}

let total = 0;
for (value in options) {
  total += 1;
}
console.log('Total options: ', total);

