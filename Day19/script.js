let input = document.querySelector("#input");
input = input.textContent.split('\n\n');
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split('\n');
  for (let j = 0; j < input[i].length; j++) {
    if (j !== 0) {
      input[i][j] = input[i][j].split(',');
      for (let z = 0; z < input[i][j].length; z++) {
        input[i][j][z] = Number(input[i][j][z]);
      }
    }
  }
}
console.log(input);

function part1();
