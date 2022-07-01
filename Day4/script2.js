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

let winner = [[0, 0], [0, 0]];
let winnerBoards = [];

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
      if (xCounter === 5 && !winnerBoards.includes(i)) {
        console.log("We have a winner! Board: " + i + ", row: " + j + ", numbers: " + line);
        winner.push([i, line]);
        winnerBoards.push(i);
      }
      if (yCounter === 5 && !winnerBoards.includes(i)) {
        console.log("We have a winner! Board: " + i + ", column: " + j + ", numbers: " + column);
        winner.push([i, column]);
        winnerBoards.push(i);
      }
    }
  }
}

let lastNumber;
let currentNumbers;
let previousBingo = [[0, 0]];
for (let x = 5; x <= chosenNumbers.length; x++) {
  currentNumbers = [];
  for (let y = 0; y < x; y++) {
    currentNumbers.push(chosenNumbers[y])
  }
  bingo(currentNumbers);
  if (winner[winner.length - 1][0] !== previousBingo[0]) {
    previousBingo = [...winner[winner.length - 1]]
    console.log(winner, x);
    lastNumber = x - 1;
  }
}
let numberSum = 0;
currentNumbers = chosenNumbers.slice(0, lastNumber + 1);
for (let line = 0; line < boards[previousBingo[0]].length; line++) {
  for (let column = 0; column < boards[previousBingo[0]][line].length; column++) {
    if (!currentNumbers.includes(boards[previousBingo[0]][line][column])) {
      numberSum += Number(boards[previousBingo[0]][line][column]);
    }
  }
}
console.log("Result: " + (numberSum * Number(chosenNumbers[lastNumber])));


