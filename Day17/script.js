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
  console.log(maxPoints);
  let maxPointY = Math.max(...maxPoints)
  console.log(maxPointY);
  return maxPointY;
}

part1();
