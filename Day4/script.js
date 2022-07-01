let input = document.querySelector("#input");
input = input.textContent.split("\n\n    ");

let chosenNumbers = input[0].slice(5).split(",");
let boards = input.slice(1);
for (let board = 0; board < boards.length; board++) {
  boards[board] = boards[board].split("\n    ");
  for (let line = 0; line < boards[board].length; line++) {
    boards[board][line] = boards[board][line].split(" ");
  }
}

function bingo(numbers) {
  // checking every board
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < boards[i].length; j++) {
      let xCounter = 0;
      let yCounter = 0;
      let line = [];
      let column = [];
      // checking every number
      for (let z = 0; z < boards[i][j].length; z++) {
        // check in line
        if (numbers.includes(boards[i][j][z])) {
          xCounter += 1;
          line.push(boards[i][j][z])
        }
        // check in column
        if (numbers.includes(boards[i][z][j])) {
          yCounter += 1;
          column.push(boards[i][z][j])
        }
      }
      if (xCounter === 5) {
        console.log("We have a winner! Board: " + i + ", row: " + j + ", numbers: " + line);
        return [i, line];
      }
      if (yCounter === 5) {
        console.log("We have a winner! Board: " + i + ", column: " + j + ", numbers: " + column);
        return [i, column];
      }
    }
  }
  return 0;
}

let winner = 0
let lastNumber;
let currentNumbers;
for (let x = 5; x <= chosenNumbers.length; x++) {
  currentNumbers = [];
  for (let y = 0; y < x; y++) {
    currentNumbers.push(chosenNumbers[y])
  }
  winner = bingo(currentNumbers);
  console.log(winner);
  if (winner != 0) {
    console.log(winner, x);
    lastNumber = x - 1;
    break;
  }
}
let numberSum = 0;
for (let line = 0; line < boards[winner[0]].length; line++) {
  for (let column = 0; column < boards[winner[0]][line].length; column++) {
    if (!currentNumbers.includes(boards[winner[0]][line][column])) {
      numberSum += Number(boards[winner[0]][line][column]);
    }
  }
}
console.log("Result: " + (numberSum * chosenNumbers[lastNumber]));


