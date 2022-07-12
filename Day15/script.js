let input = document.querySelector("#input");
input = input.textContent.split('\n');

input.forEach(function(line, index) {
  input[index] = Array.from(line);
});

input.forEach(function (line, x) {
  line.forEach(function (value, y) {
    input[x][y] = Number(value);
  });
});

let risk = 0;
let position = {'x': 0, 'y': 0}

let map = []

function findWay(input, p) {
  for (let i = 0; i < input.length; i++) {
    map.push([]);
    for (let j = 0; j < input[i].length; j++) {
      let z = 0;
      if (i !== 0 && j !== 0) {
        z = Math.min(map[i - 1][j], map[i][j - 1]);
      } else if (i === 0 && j !== 0) {
        z = map[i][j - 1];
      } else if (i !== 0 && j === 0) {
        z = map[i - 1][j];
      }
      map[i][j] = input[i][j] + z;
      risk = map[i][j];
    }
  }
  repeatCicle(p);
  console.log(input);
  console.log(map);
  console.log(risk);
}
function repeatCicle(p) {
  for (let t = 0; t < p; t++) {
    for (let i = input.length - 1; i >= 0; i--) {
      for (let j = input[i].length - 1; j >= 0; j--) {
        let z = map[i][j];
        if ((i !== input.length - 1) && (j !== input[i].length - 1)) {
          z = Math.min(map[i][j], map[i + 1][j] + input[i][j], map[i][j + 1] + input[i][j]);
        } else if (i === input.length - 1 && j !== input[i].length - 1) {
          z = Math.min(map[i][j], map[i][j + 1] + input[i][j]);
        } else if (i !== input.length - 1 && j === input[i].length - 1) {
          z = Math.min(map[i][j], map[i + 1][j] + input[i][j]);
        }
        map[i][j] = z;
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        let z = 0;
        if (i !== 0 && j !== 0) {
          z = Math.min(map[i][j], map[i - 1][j] + input[i][j], map[i][j - 1] + input[i][j]);
        } else if (i === 0 && j !== 0) {
          z = Math.min(map[i][j], map[i][j - 1] + input[i][j]);
        } else if (i !== 0 && j === 0) {
          z = Math.min(map[i][j], map[i - 1][j] + input[i][j]);
        }
        map[i][j] = z;
        risk = map[i][j];
      }
    }
  }
}

function part1 () {
  findWay(input, 1);
}

// part1();

function part2() {
  // Extending the input
  xLen = input.length;
  yLen = input[0].length;
  let kCounter = 0;
  for (let k = 0; k < 5; k++) {
    for (let m = 0; m < 5; m++) {
      if (k === 0 && m === 0) {
        continue;
      }
      for (let i = 0; i < xLen; i++) {  
        if (k > kCounter) {
          input.push([]);
        }
        for (let j = 0; j < yLen; j++) {
          let newValue = input[i][j] + k + m;
          if (newValue > 9) {
            newValue -= 9;
          }
          input[i + (xLen * k)].push(newValue);
        }
      }
      kCounter = k;
    }
  }

  findWay(input, 20);
}
part2();