const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf8");

const searchTree = {
  o: {
    n: {
      e: true,
    },
  },
  t: {
    w: {
      o: true,
    },
    h: {
      r: {
        e: {
          e: true,
        },
      },
    },
  },
  f: {
    o: {
      u: {
        r: true,
      },
    },
    i: {
      v: {
        e: true,
      },
    },
  },
  s: {
    i: {
      x: true,
    },
    e: {
      v: {
        e: {
          n: true,
        },
      },
    },
  },
  e: {
    i: {
      g: {
        h: {
          t: true,
        },
      },
    },
  },
  n: {
    i: {
      n: {
        e: true,
      },
    },
  },
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

const stringToDigitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ["1"]: 1,
  ["2"]: 2,
  ["3"]: 3,
  ["4"]: 4,
  ["5"]: 5,
  ["6"]: 6,
  ["7"]: 7,
  ["8"]: 8,
  ["9"]: 9,
};

const extractDigit = (line, startIndex) => {
  let currentIndex = startIndex;
  let currentTreeNode = searchTree;
  let currentCharacter = line[currentIndex];

  while (currentTreeNode[currentCharacter] !== undefined) {
    if (currentTreeNode[currentCharacter] === true) {
      return line.slice(startIndex, currentIndex + 1);
    }
    currentTreeNode = currentTreeNode[currentCharacter];
    currentIndex += 1;
    currentCharacter = line[currentIndex];
  }

  return undefined;
};

console.log(extractDigit("1", 0)); // 1
console.log(extractDigit("a9", 0)); // undefined
console.log(extractDigit("a8", 1)); // 8
console.log(extractDigit("eightsdf8", 0)); // eight
console.log(extractDigit("eightsdf8", 1)); // undefined

const extractAllDigits = (line) => {
  let digits = [];
  for (let i = 0; i < line.length; i++) {
    const digit = extractDigit(line, i);
    if (digit !== undefined) {
      digits.push(digit);
    }
  }
  return digits;
};

const answer = input.split("\n").reduce((sum, line) => {
  const digits = extractAllDigits(line);
  const firstDigitString = digits[0];
  const lastDigitString = digits[digits.length - 1];

  const firstDigit = stringToDigitMap[firstDigitString];
  const lastDigit = stringToDigitMap[lastDigitString];

  const number = parseInt(`${firstDigit}${lastDigit}`);

  return sum + number;
}, 0);

console.log(answer);
