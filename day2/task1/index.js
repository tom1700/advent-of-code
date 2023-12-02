const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf8");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const answer = input.split("\n").reduce((sum, line) => {
  const [gameAndId, setsString] = line.split(":");
  const [, id] = gameAndId.split(" ");
  const sets = setsString
    .split(";")
    .map((set) =>
      Object.fromEntries(
        set.split(",").map((cube) => cube.trim().split(" ").reverse())
      )
    );
  const isGameImpossible = sets.some(
    (set) => set.red > MAX_RED || set.green > MAX_GREEN || set.blue > MAX_BLUE
  );

  return isGameImpossible ? sum : sum + parseInt(id);
}, 0);

console.log(answer);
