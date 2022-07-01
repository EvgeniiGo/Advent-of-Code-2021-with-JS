let input = document.querySelector("#input");
input = input.textContent.split("\n    ");

let increaseCounter = 0;

// Part 1
for (let i = 1; i < input.length; i++) {
  if (Number(input[i]) > Number(input[i - 1])) {
    increaseCounter += 1;
  }
}

console.log(increaseCounter)

// Part 2
increaseCounter = 0;
for (let i = 3; i < input.length; i++) {
  let x = Number(input[i]) + Number(input[i - 1]) + Number(input[i - 2]);
  let y = Number(input[i - 1]) + Number(input[i - 2]) + Number(input[i - 3]);
  if (x > y) {
    increaseCounter += 1;
  }
}

console.log(increaseCounter)