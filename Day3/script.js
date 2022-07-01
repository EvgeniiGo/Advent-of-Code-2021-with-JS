let input = document.querySelector("#input");
input = input.textContent.split("\n    ");

let gamma = "";
let epsilon = "";
let bits = input[0].length;

// Function to count 1 and 0 inside array for specific position
function count(someArray, elementNum) {
  let oneCounter = 0;
  let zeroCounter = 0;

  for (let j = 0; j < someArray.length; j++) {
    if (Number(someArray[j][elementNum]) === 1) {
      oneCounter += 1;
    } else {
      zeroCounter += 1;
    }
  }

  // Return how many 1 and how many 0 were in chosen position
  return ([oneCounter, zeroCounter]);
}

// Part 1
for (let i = 0; i < bits; i++) {
  let [oneCounter, zeroCounter] = count(input, i);

  if (oneCounter > zeroCounter) {
    gamma += 1;
    epsilon += 0;
  } else {
    gamma += 0;
    epsilon += 1;
  }
}

let power = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(power);

// Part 2

// Function to return an Array with Numbers that have most common Number in chosen position
function rating(someArray, commonNum, elementNum) {
  let boxArray = [];
  for (let j = 0; j < someArray.length; j++) {
    if (Number(someArray[j][elementNum]) === commonNum) {
      boxArray.push(someArray[j]);
    }
  }
  if (boxArray.length > 0) {
    return boxArray;
  } else {
    return someArray;
  }
}

let numbers = [...input];
let bin;

// Calculation of Oxygen generator rating
for (let i = 0; i < bits; i++) {
  let [oneCounter, zeroCounter] = count(numbers, i);
  // Checking what number is more common
  if (oneCounter >= zeroCounter) {
    bin = 1;
  } else {
    bin = 0;
  }

  numbers = [...rating(numbers, bin, i)];

  // Stop if only one number left
  if (numbers.length === 1) {
    break;
  }
}

let oxygen = parseInt(numbers[0], 2);

// Calculation of CO2 scrubber rating
numbers = [...input];

for (let i = 0; i < bits; i++) {
  let [oneCounter, zeroCounter] = count(numbers, i);

  // Checking what number is more common
  if (oneCounter >= zeroCounter) {
    bin = 0;
  } else {
    bin = 1;
  }

  numbers = [...rating(numbers, bin, i)];
  console.log(numbers);
  // Stop if only one number left
  if (numbers.length === 1) {
    break;
  }
}

let scrubber = parseInt(numbers[0], 2);
console.log(scrubber * oxygen);