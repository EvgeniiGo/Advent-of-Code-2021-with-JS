let input = document.querySelector("#input");
input = input.textContent.split("\n    ");

let forwardCounter = 0
let downCounter = 0;
let directions = [, , "up"];


// Part 1
for (let i = 0; i < input.length; i++) {
  let [direction, units] = input[i].split(" ");
  if (direction === "down") {
    downCounter += Number(units);
  } else if (direction === "up") {
    downCounter -= Number(units);
  } else {
    forwardCounter += Number(units);
  }
}

console.log(forwardCounter * downCounter)

// Part 2
forwardCounter = 0
let aimCounter = 0;
let depthCounter = 0;

for (let i = 0; i < input.length; i++) {
  let [direction, units] = input[i].split(" ");
  if (direction === "down") {
    aimCounter += Number(units);
  } else if (direction === "up") {
    aimCounter -= Number(units);
  } else {
    forwardCounter += Number(units);
    depthCounter += (aimCounter * Number(units));
  }
}

console.log(forwardCounter * depthCounter)
