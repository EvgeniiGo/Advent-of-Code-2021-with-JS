const input = document.querySelector("#input").textContent.split("\n    ");

const points = {};


function countNumbers(i, j) {
  const numMin = Math.min(i, j);
  const numMax = Math.max(i, j);
  const numbers = []
  for (let num = numMin; num <= numMax; num++) {
    numbers.push(num);
  }
  return numbers;
}

function countPoints(z, n) {
  const pointsArray = [];
  if (typeof (z) === 'object') {
    z.forEach(function (num) {
      pointsArray.push(num + '.' + n);
    });
  } else if (typeof (n) === 'object') {
    n.forEach(function (num) {
      pointsArray.push(z + '.' + num);
    })
  }
  return pointsArray;
}

function countDiagonalPoints(z, n) {
  const pointsArray = [];
  for (let m = 0; m < z.length; m++) {
    pointsArray.push(z[m] + '.' + n[m]);
  }
  return pointsArray;
}

input.forEach(function (line) {
  line = line.split(' -> ');
  const first = line[0].split(',');
  const second = line[1].split(',');
  const x1 = Number(first[0]);
  const x2 = Number(second[0]);
  const y1 = Number(first[1]);
  const y2 = Number(second[1]);

  xEqual = x1 === x2;
  yEqual = y1 === y2;
  subEqual = (x1 - y1) === (x2 - y2)
  sumEqual = (x1 + y1) === (x2 + y2);

  let pointArray = [];

  if (xEqual) {
    const numArray = countNumbers(y1, y2);
    pointArray = countPoints(x1, numArray);
  } else if (yEqual) {
    const numArray = countNumbers(x1, x2);
    pointArray = countPoints(numArray, y1);
  } else if (subEqual) {
    pointArray = countDiagonalPoints(countNumbers(x1, x2), countNumbers(y1, y2));
  } else if (sumEqual) {
    pointArray = countDiagonalPoints(countNumbers(x1, x2), countNumbers(y1, y2).reverse());
  }
  pointArray.forEach(function (point) {
    if (points[point] === undefined) {
      points[point] = 1;
    } else {
      points[point] += 1;
    }
  })
});

let counter = 0;
for (point in points) {
  if (Number(points[point]) >= 2) {
    counter += 1;
  }
}
console.log(counter);