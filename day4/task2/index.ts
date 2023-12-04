import fs from "node:fs";

const input = fs.readFileSync("../input.txt", "utf8");

const cardMatchingNumbers = input.split("\n").map((line) => {
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

  let matchingNumbers = 0;

  yourNumbersList.forEach((number) => {
    if (winningNumbersSet.has(number)) {
      matchingNumbers += 1;
    }
  });

  return matchingNumbers;
});

const cardsWonPerCard = new Array(cardMatchingNumbers.length).fill(0);

for (let i = cardMatchingNumbers.length - 1; i >= 0; i--) {
  const matchingNumbers = cardMatchingNumbers[i];
  cardsWonPerCard[i] = 1;

  for (
    let j = i + 1;
    j < i + matchingNumbers + 1 && j < cardMatchingNumbers.length;
    j++
  ) {
    cardsWonPerCard[i] += cardsWonPerCard[j];
  }
}

const totalCardsWon = cardsWonPerCard.reduce((acc, cardsWon) => {
  return acc + cardsWon;
}, 0);

console.log(totalCardsWon);
