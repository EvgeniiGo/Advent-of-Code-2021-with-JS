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
let totalValue = 0;
let maxPosition = line.length;
let maxSubs = Infinity;
let posDif = 0;

function readValue(typeId, values) {
  console.log('Values = ', values, 'Case =', typeId);
  let value;
  switch(typeId) {
    case 0:
      value = values.reduce(function (sum, value) {
        return sum + value;
      });
      console.log(value);
      return value;
    case 1:
      value = values.reduce(function (product, value) {
        return product * value;
        
      });
      console.log(value);
      return value;
    case 2:
      value = Math.min(...values);
      console.log(value);
      return value;
    case 3:
      value = Math.max(...values);
      console.log(value);
      return value;
    case 5:
      if (values[0] > values [1]) {
        value = 1;
      } else {value = 0;}
      console.log(value);
      return value;
    case 6:
      if (values[0] < values[1]) {
        value = 1;
      } else { value = 0; }
      console.log(value);
      return value;
    case 7:
      if (values[0] === values[1]) {
        value = 1;
      } else { value = 0; }
      console.log(value);
      return value;
    default:
      console.log(values);
      return values;
  }
}

function read(maxPosition, typeId = 4, maxSubs = Infinity) {
  console.log('Reading...')
  const dadId = typeId;
  console.log('posDif', posDif);
  let subs = 0;
  let totalSubLen = line.length;
  let values = [];
  let subNum = Infinity;
  while (true) {
    console.log('Subs =', subs, 'maxSubs =', maxSubs);
    console.log('maxPosition =', maxPosition, 'Position = ', position)
    console.log('TypeId = ', dadId);
    subs += 1;
    if ((maxPosition - position < 11) || (subs > maxSubs)) {
      console.log('Values = ', values);
      return readValue(dadId, values);
    }
    const version = parseInt(line.slice(position, position + 3), 2);
    versionSum += version;
    position += 3;
    const typeId = parseInt(line.slice(position, position + 3), 2);
    console.log('Type ID =', typeId);
    position += 3;
    if (typeId === 4) {
      let numberBin = 0;
      console.log(line.slice(position, position + 15));
      while (Number(line[position]) === 1) {
        console.log(line.slice(position, position + 5));
        position += 1;
        numberBin += (line.slice(position, position + 4));
        position += 4;
      }
      position += 1;
      numberBin += (line.slice(position, position + 4));
      position += 4;
      const number = parseInt(numberBin, 2);
      console.log('Number =', number);
      // if (maxPosition - position < 11) {
      //   position = maxPosition;
      // }
      values.push(number);
      console.log('Values = ', values);

    } else {
      if (Number(line[position]) === 0) {
        console.log('length type ID =', 0);
        position += 1;
        totalSubLen = parseInt(line.slice(position, position + 15), 2) + position + 15;
        console.log('total length in bits of the sub-packets =', totalSubLen - position - 15);
        position += 15;
        posDif = totalSubLen - position;
        values.push(read(totalSubLen, typeId));
        if (maxPosition - totalSubLen >= 11) {
          maxPosition = maxPosition + posDif;
        }
        posDif = 0;
      }
      else if (Number(line[position]) === 1) {
        console.log('length type ID =', 1);
        position += 1;
        subNum = parseInt(line.slice(position, position + 11), 2);
        console.log('number of sub-packets = ', subNum);
        position += 11;
        values.push(read(maxPosition, typeId, subNum));
        console.log('Values = ', values);
      }
    }
  }
}

const values = read(maxPosition);
console.log('Total of values =', ...values);




