let input = document.querySelector("#input");
input = input.textContent.split(",");

let day = input.map(num => Number(num));

// for (let i = 1; i <= 80; i++) {
//   let newDay = [];
//   day.forEach(function (fish) {
//     const updatedFish = fish - 1;
//     if (updatedFish < 0) {
//       newDay.push(6, 8);
//     } else {
//       newDay.push(updatedFish);
//     }
//   });
//   day = [...newDay];
// }

// console.log(day.length);

// Part 2
let fishPop = {};
for (let i = 8; i >= 0; i--) {
  fishPop[i] = 0
}
function updateFishPop() {
  let numToAdd = fishPop[8];
  let numToRemember;
  for (let daysLeft = 8; daysLeft >= 0; daysLeft--) {
    if (daysLeft !== 0) {
      numToRemember = fishPop[daysLeft - 1];
      fishPop[daysLeft - 1] = numToAdd;
      numToAdd = numToRemember;
    } else {
      fishPop[6] += numToAdd;
      fishPop[8] = numToAdd;
    }
  }
}

day.forEach(function (fish) {
  fishPop[fish] += 1;
});

const days = 256;
for (let i = 0; i < days; i++) {
  updateFishPop()
}

counter = 0;
for (fish in fishPop) {
  counter += fishPop[fish];
}
console.log(counter);