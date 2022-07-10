let input = document.querySelector("#input");
input = input.textContent.split("\n");

let map = {};
const START = 'start';
const END = 'end';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const bigLetters = smallLetters.toUpperCase();

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

let ways = [];

function buildPaths(connections, path) {
  let updatedPath = [];
  for (let i = 0; i < map[connections].length; i++) {
    const option = map[connections][i];
    // Check if it is not small letter for second time
    if (path.includes(option) && smallLetters.includes(option[0])) {
      continue;
    }
    else {
      // Add path
      updatedPath.push([...path, option]);
      ways.push(updatedPath[updatedPath.length - 1]);
    }

    if (option === END) {
      continue;
    }
    else {
      buildPaths(option, updatedPath[updatedPath.length - 1]);      
    }
  }
}



for (let n = 0; n < map[START].length; n++) {
  let path = []
  path.push(START, map[START][n]);
  buildPaths(map[START][n], path);
}

console.log(ways);
counter = 0;
for (x in ways) {
  if (ways[x][ways[x].length - 1] === 'end') {
    counter ++;
  }
}
console.log('Total ends: ', counter);