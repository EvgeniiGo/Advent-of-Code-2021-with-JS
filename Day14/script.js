let input = document.querySelector("#input");
input = input.textContent.split('\n\n');

let template = input[0];
let rules = input[1].split('\n')

let ruleDic = {}
rules.forEach(function (item) {
  let rule = item.split(' -> ');
  ruleDic[rule[0]] = rule[1];
})

// Part 1
let steps = 10;

for (let i = 0; i < steps; i++) {
  let updatedTemplate = template[0];
  for (let j = 0; j < template.length - 1; j++) {
    let pair = template[j] + template[j + 1];
    updatedTemplate += ruleDic[pair] + template[j + 1];
  }
  template = updatedTemplate;
}


let elements = {};
for (let i = 0; i < template.length; i++) {
  let letter = template[i];
  if (elements[letter] === undefined) {
    elements[letter] = 1;
  } else {
    elements[letter] += 1;
  }
};
console.log(elements);
console.log(Math.max(...Object.values(elements)) - Math.min(...Object.values(elements)));

// Part 2
let dicTemplate = {}
template = input[0];
function addFirstPairs(x) {
  if (dicTemplate[x[0] + ruleDic[x]] === undefined) {
    dicTemplate[x[0] + ruleDic[x]] = 1;
    
  } else {
    dicTemplate[x[0] + ruleDic[x]] += 1;
    
  }
  if (dicTemplate[ruleDic[x] + x[1]] === undefined) {
    dicTemplate[ruleDic[x] + x[1]] = 1;
  } else {
    dicTemplate[ruleDic[x] + x[1]] += 1;
  }
}
console.log(template);
// First step
for (let j = 0; j < template.length - 1; j++) {
  addFirstPairs(template[j] + template[j + 1]);
}

steps = 40;

// Next steps
for (let i = 0; i < steps - 1; i++) {
  let newTemplate = {};
  for (pair in dicTemplate) {
    const newLetter = ruleDic[pair];
    const value = dicTemplate[pair];
    if (newTemplate[pair[0] + newLetter] === undefined) {
      newTemplate[pair[0] + newLetter] = value;
    } else {
      newTemplate[pair[0] + newLetter] += value;
    }
    if (newTemplate[newLetter + pair[1]] === undefined) {
      newTemplate[newLetter + pair[1]] = value;
    } else {
      newTemplate[newLetter + pair[1]] += value;
    }
  }
  dicTemplate = newTemplate
}
elements = {};
for (pair in dicTemplate) {
  const first = pair[0];
  const second = pair[1];
  const value = dicTemplate[pair];
  if (elements[first] === undefined) {
    elements[first] = value;
  } else {
    elements[first] += value;
  }
  if (elements[second] === undefined) {
    elements[second] = value;
  } else {
    elements[second] += value;
  }
}

elements[template[0]] += 1;
elements[template[template.length - 1]] += 1;

for (letter in elements) {
  elements[letter] = elements[letter] / 2;
}

console.log(elements);
console.log(Math.max(...Object.values(elements)) - Math.min(...Object.values(elements)));