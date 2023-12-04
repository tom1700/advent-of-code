import fs from "node:fs";

const input = fs.readFileSync("../input.txt", "utf8");

const totalPoints = input.split("\n").reduce((acc, line) => {
  const [winningNumbersString, yourNumbersString] = line.split("|");
  const winningNumbersList = winningNumbersString
    .split(":")[1]
    .split(" ")
    .filter((number) => number !== "")
    .map((number) => parseInt(number));

  const yourNumbersList = yourNumbersString
    .split(" ")
    .filter((number) => number !== "")
    .map((number) => parseInt(number));

  const winningNumbersSet = new Set(winningNumbersList);

  let points = 0;

  yourNumbersList.forEach((number) => {
    if (winningNumbersSet.has(number)) {
      if (points === 0) {
        points = 1;
      } else {
        points = points * 2;
      }
    }
  });

  return acc + points;
}, 0);

console.log(totalPoints);
