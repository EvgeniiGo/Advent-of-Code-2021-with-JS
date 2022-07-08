let input = document.querySelector("#input");
input = input.textContent.split(",");

let positions = input.map(num => Number(num));
let fuel = 0

// Part 1
// positions.sort(function (a, b) {
//   return a - b;
// });
// let median;

// if (positions.length % 2 === 1) {
//   median = (positions[(positions.length - 1) / 2] + positions[(positions.length + 1) / 2]) / 2;
// } else {
//   median = positions[positions.length / 2];
// }

// console.log(positions);

// positions.forEach(function (position) {
//   fuel += Math.abs(position - median);
// })

// console.log(fuel);


// Part 2
const aver = Math.round(positions.reduce((i, y) => { return i + y }) / positions.length);

function countFuel(x) {
  let total = 0;
  for (i = 1; i <= x; i++) {
    total += i;
  }
  return total;
}

let options = []
for (let i = aver - 10; i <= aver + 10; i++) {
  fuel = 0;
  positions.forEach(function (position) {
    fuel += countFuel(Math.abs(position - i));
  })
  options.push(fuel)
}

console.log(Math.min(...options));