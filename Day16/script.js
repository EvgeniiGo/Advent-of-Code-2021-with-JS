let input = document.querySelector("#input");
input = input.textContent;

const dic = {
  0 : '0000',
  1 : '0001',
  2 : '0010',
  3 : '0011',
  4 : '0100',
  5 : '0101',
  6 : '0110',
  7 : '0111',
  8 : '1000',
  9 : '1001',
  A : '1010',
  B : '1011',
  C : '1100',
  D : '1101',
  E : '1110',
  F : '1111'
}

// Converting input to binary
let line = '';
for (let i = 0; i < input.length; i++) {
  line += dic[input[i]];
}
console.log(line);

let versionSum = 0;
let position = 0;

function read(position = 0) {
  let totalSubLen = line.length;
  let packetsNum = 0;
  let subNum = Infinity;
  while (position < line.length) {
    if (line.length - position < 11) {
      break;
    }
    const version = parseInt(line.slice(position, position + 3), 2);
    versionSum += version;
    console.log('Version =', version);
    position += 3;
    const typeId = parseInt(line.slice(position, position + 3), 2);
    console.log('Type ID =', typeId);
    position += 3;
    if (typeId === 4) {
      let numberBin = 0;
      let posCounter = 0;
      while (Number(line[position]) === 1) {
        position += 1;
        numberBin += (line.slice(position, position + 4));
        position += 4;
        posCounter += 5;
      }
      position += 1;
      numberBin += (line.slice(position, position + 4));
      position += 4;
      const number = parseInt(numberBin, 2);
      console.log('Number =', number);
      if (totalSubLen - position < 11) {
        position = totalSubLen;
        totalSubLen = line.length;
      }

    } else {
      if (Number(line[position]) === 0) {
        console.log('length type ID =', 0);
        position += 1;
        totalSubLen = parseInt(line.slice(position, position + 15), 2) + position + 15;
        console.log('total length in bits of the sub-packets =', totalSubLen - position);
        position += 15;
      }
      else if (Number(line[position]) === 1) {
        console.log('length type ID =', 1);
        position += 1;
        subNum = parseInt(line.slice(position, position + 11), 2);
        console.log('number of sub-packets = ', subNum);
        position += 11;
      }
    }
  }
}

read(position);
console.log('versionSum =', versionSum);




