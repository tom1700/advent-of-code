const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf8");

const isInteger = (value) => {
  return !Number.isNaN(parseInt(value));
};

const answer = input.split("\n").reduce((sum, line) => {
  const charactersArray = Array.from(line);
  const firstDigitCharacter = charactersArray.find(isInteger);
  const secondDigitCharacter = charactersArray.reverse().find(isInteger);

  const number = parseInt(`${firstDigitCharacter}${secondDigitCharacter}`);

  return sum + number;
}, 0);

console.log(answer);
