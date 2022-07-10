let input = document.querySelector("#input");
input = input.textContent.split("\n");

let map = {};
const START = 'start';
const END = 'end';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';

function updateDict(x, y) {
  if (map[x] === undefined) {
    map[x] = [y];
  } else {
    map[x] = [...map[x], y];
  }
}

for (let i = 0; i < input.length; i++) {
  connection = input[i].split('-');
  // If rule has 'end' as a first argument or 'start' as a second argument
  if (connection[0] === END || connection[1] === START) {
    updateDict(connection[1], connection[0]);
  } 
  // If rule is regular
  else {
    updateDict(connection[0], connection[1]);
    if (connection[1] !== END && connection[0] !== START) {
      updateDict(connection[1], connection[0]);
    }
  }    
}

function checkForDouble(x) {
  const check = Array.from(x).every(function(letter) {
    return smallLetters.includes(letter);
  })
  return check;
}

let ways = [];

function buildPaths(connections, path) {
  let updatedPath = [];
  // Find number of small doubles in the path
  for (let i = 0; i < map[connections].length; i++) {
    const option = map[connections][i];
    // Check if it is not small letter for second time
    let doubleCounter = 0;
    for (m in path) {
      if (checkForDouble(path[m]) && path.slice(Number(m) + 1).includes(path[m])) {
        doubleCounter += 1;
      }
    }
    if (((path.includes(option)) + (checkForDouble(option)) + (doubleCounter > 0)) !== 3) {
      // Add path
      updatedPath.push([...path, option]);
      ways.push(updatedPath[updatedPath.length - 1]);
    }
    else {
      continue;
    }
    if (option !== END) {
      buildPaths(option, updatedPath[updatedPath.length - 1]);
    }
  }
}



for (let n = 0; n < map[START].length; n++) {
  let path = []
  path.push(START, map[START][n]);
  buildPaths(map[START][n], path);
}

counter = 0;
for (x in ways) {
  if (ways[x][ways[x].length - 1] === 'end') {
    counter ++;
  }
}
console.log('Total ends: ', counter);