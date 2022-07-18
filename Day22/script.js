let input = document.querySelector("#input");
input = input.textContent.split('\n');
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split(' ');
  input[i][1] = input[i][1].split(',');
  for (let j = 0; j < 3; j++) {
    input[i][1][j] = input[i][1][j].slice(2).split('..');
  }
}

console.log(input);

let map = {};

const maxMinus = -50;
const maxPlus = 50;

function part1(input) {
  for (let i = 0; i < input.length; i++) {
    console.log('Cuboid #', i);
    let cuboid = input[i];
    let flag = 0;
    for (let j = 0, z = 0; j < 3, z < 2; j++, z++) {
      if (cuboid[1][j][z] < -50 || cuboid[1][j][z] > 50) {
        flag = 1;
      }
    }
    if (flag === 1) {
      continue;
    }
    for (let x = Number(cuboid[1][0][0]); x <= Number(cuboid[1][0][1]); x++) {
      for (let y = Number(cuboid[1][1][0]); y <= Number(cuboid[1][1][1]); y++) {
        for (let z = Number(cuboid[1][2][0]); z <= Number(cuboid[1][2][1]); z++) {
          cube = [x, y, z];
          map[cube] = cuboid[0];
        }
      }
    }
  }
  console.log(map);
  let counter = 0;
  for (cube in map) {
    if (map[cube] === 'on') {
      counter +=1;
    }
  }
  console.log(counter);
}

part1(input);
