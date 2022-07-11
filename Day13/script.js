let input = document.querySelector("#input");
input = input.textContent.split("\n\n");
const dots = input[0].split('\n');
const beginning = 'fold along ';
const folds = input[1].split('\n').map(function (fold) {
  return fold.slice(beginning.length);
});

const dotsX = [];
const dotsY = [];
dots.forEach(function(group) {
  const dot = group.split(',');
  dotsX.push(Number(dot[0]));
  dotsY.push(Number(dot[1]));
})

// Preparing a paper of dots 
maxX = Math.max(...dotsX);
maxY = Math.max(...dotsY);
map = [];
for (let y = 0; y <= maxY; y++) {
  map.push([])
  for (let x = 0; x <= maxX; x++) {
    map[y].push('.')
    if (dots.includes([x, y].join(','))) {
      map[y][x] = '#';
    }
  }
}

function foldDots(x, y) {
  if (x === '#' || y === '#') {
    return '#';
  } else {
    return '.';
  }
}

function foldPaper(fold) {
  const [axis, value] = fold.split('=');
  let z;
  if (axis === 'y') {
    for (let i = 0, j = value * 2; i < j; i++, j--) {
      if (map[j] !== undefined) {
        for (let y = 0; y < map[i].length; y++) {
        map[i][y] = foldDots(map[i][y], map[j][y]);
        }
        map.pop();
      }
    }
    map.pop()
  } else {
    for (let x = 0; x < map.length; x++) {
      for (let i = 0, j = value * 2; i < j; i++, j--) {
        if (map[x][j] !== undefined) {
          map[x][i] = foldDots(map[x][i], map[x][j]);
          map[x].pop();
        }
      }
      map[x].pop();
    }
  }
}

// Don't need for part 2

// for (let i = 0; i < 1; i++) {
//   foldPaper(folds[i]);
// }

// counter = 0;
// map.forEach(function(line) {
//   line.forEach(function(cell) {
//     if (cell === '#') {
//       counter += 1;
//     }
//   })
// })
// console.log('Total count of #: ', counter);

// Part 2

for (let i = 0; i < 12; i++) {
  foldPaper(folds[i]);
}
console.log(map);