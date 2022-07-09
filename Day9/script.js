let input = document.querySelector("#input");
input = input.textContent.split("\n    ");

// Need to do with less code

let lowPoints = [];

let basins = [];
let inputs = [];

let basin;

// Corner
function compareCorner(x, y) {
  height = Number(input[x][y]);
  if (x === 0 && y === 0) {
    if (height < Number(input[x + 1][y]) && height < Number(input[x][y + 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (x === input.length - 1 && y === 0) {
    if (height < Number(input[x - 1][y]) && height < Number(input[x][y + 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (x === 0 && y === input[x].length - 1) {
    if (height < Number(input[x + 1][y]) && height < Number(input[x][y - 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (x === input.length - 1 && y === input[x].length - 1) {
    if (height < Number(input[x - 1][y]) && height < Number(input[x][y - 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else {
  }
}
// Edge
function compareEdge(x, y) {
  height = Number(input[x][y]);
  if (x === 0) {
    if (height < Number(input[x + 1][y]) && height < Number(input[x][y + 1]) && height < Number(input[x][y - 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (y === 0) {
    if (height < Number(input[x + 1][y]) && height < Number(input[x][y + 1]) && height < Number(input[x - 1][y])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (y === input[x].length - 1) {
    if (height < Number(input[x + 1][y]) && height < Number(input[x][y - 1]) && height < Number(input[x - 1][y])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else if (x === input.length - 1) {
    if (height < Number(input[x - 1][y]) && height < Number(input[x][y + 1]) && height < Number(input[x][y - 1])) {
      lowPoints.push(height);
      basinPush(x, y);
    }
  } else {
  }

}

// Other
function compareNormal(x, y) {
  height = Number(input[x][y]);
  if (height < Number(input[x + 1][y]) && height < Number(input[x][y + 1]) && height < Number(input[x][y - 1]) && height < Number(input[x - 1][y])) {
    lowPoints.push(height);
    basinPush(x, y);
  }
}

function checkForBasin(x, y) {
  const height = input[x][y];
  if (((x === 0 && (y === 0 || y === (input[x].length - 1))) || ((x === (input.length - 1) && (y === 0 || y === (input[x].length - 1)))))) {
    if (x === 0 && y === 0) {
      for (let i = x; i < x + 2; i++) {
        for (let j = y; j < y + 2; j++) {
          if ((i === x - 1 && (j === y - 1 || j === y + 1)) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if (x === 0 & y === input[x].length - 1) {
      for (let i = x; i < x + 2; i++) {
        for (let j = y - 1; j < y + 1; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if ((x === input.length - 1) && y === 0) {
      for (let i = x - 1; i < x + 1; i++) {
        for (let j = y; j < y + 2; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if ((x === input.length - 1) && (y === input[x].length - 1)) {
      for (let i = x - 1; i < x + 1; i++) {
        for (let j = y - 1; j < y + 1; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    }
  } else if ((x === 0) || (x === (input.length - 1)) || (y === 0) || (y === (input[x].length - 1))) {
    if (x === 0) {
      for (let i = x; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if (y === 0) {
      for (let i = x - 1; i < x + 2; i++) {
        for (let j = y; j < y + 2; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if (y === input[x].length - 1) {
      for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 1; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    } else if (x === input.length - 1) {
      for (let i = x - 1; i < x + 1; i++) {
        for (let j = y - 1; j < y + 2; j++) {
          if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
            continue;
          } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
            continue;
          } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
            console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
            basin += 1;
            inputs.push(i + '' + j);
            checkForBasin(i, j);
          }
        }
      }
    }
  } else {
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (((i === x - 1 && (j === y - 1 || j === y + 1))) || (i === x + 1 && (j === y - 1 || j === y + 1))) {
          continue;
        } else if ((i === x && j === y) || (Number(input[i][j]) === 9)) {
          continue;
        } else if (input[i][j] - input[x][y] >= 1 && (!inputs.includes(i + '' + j))) {
          console.log('Row: ', i, ' Column: ', j, ' Value: ', input[i][j]);
          basin += 1;
          inputs.push(i + '' + j);
          checkForBasin(i, j);
        }
      }
    }
  }
}

function basinPush(x, y) {
  checkForBasin(x, y);
  basins.push(basin);
}

for (let line = 0; line < 100; line++) {
  for (let num = 0; num < input[line].length; num++) {
    basin = 1;
    if ((line === 0 && (num === 0 || num === (input[line].length - 1))) || ((line === (input.length - 1) && (num === 0 || num === (input[line].length - 1))))) {
      compareCorner(line, num);
    } else if ((line === 0) || (line === (input.length - 1)) || (num === 0) || (num === (input[line].length - 1))) {
      compareEdge(line, num);
    } else {
      compareNormal(line, num);
    }
  }
}

console.log('lowPoints: ', lowPoints);
let totalRisk = 0;
lowPoints.forEach(function (risk) {
  totalRisk += risk + 1;
});
console.log('Sum of risk: ', totalRisk);


console.log(basins);
maxBasins = basins.sort(function (a, b) {
  return b - a;
}).slice(0, 3);
const total = maxBasins.reduce(function (prod, num) {
  return prod * num;
});
console.log(total);