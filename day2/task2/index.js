const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf8");

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
  let maxRedInTheSet = 0;
  let maxGreenInTheSet = 0;
  let maxBlueInTheSet = 0;

  sets.forEach((set) => {
    maxRedInTheSet = Math.max(maxRedInTheSet, set.red ?? 0);
    maxGreenInTheSet = Math.max(maxGreenInTheSet, set.green ?? 0);
    maxBlueInTheSet = Math.max(maxBlueInTheSet, set.blue ?? 0);
  });

  const setPower = maxRedInTheSet * maxGreenInTheSet * maxBlueInTheSet;

  return sum + setPower;
}, 0);

console.log(answer);
