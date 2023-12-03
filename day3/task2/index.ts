import fs from "node:fs";

const input = fs.readFileSync("../input.txt", "utf8");

class GridLens {
  constructor(private grid: string[][]) {}

  public get(x: number, y: number) {
    return this.grid[y]?.[x];
  }

  public getTop(x: number, y: number) {
    return this.grid[y - 1]?.[x];
  }

  public getBottom(x: number, y: number) {
    return this.grid[y + 1]?.[x];
  }

  public getLeft(x: number, y: number) {
    return this.grid[y]?.[x - 1];
  }

  public getRight(x: number, y: number) {
    return this.grid[y]?.[x + 1];
  }

  public getTopLeft(x: number, y: number) {
    return this.grid[y - 1]?.[x - 1];
  }

  public getTopRight(x: number, y: number) {
    return this.grid[y - 1]?.[x + 1];
  }

  public getBottomLeft(x: number, y: number) {
    return this.grid[y + 1]?.[x - 1];
  }

  public getBottomRight(x: number, y: number) {
    return this.grid[y + 1]?.[x + 1];
  }
}

const grid = input.split("\n").map((line) => line.split(""));

const gridLens = new GridLens(grid);

const isInteger = (value) => {
  return !Number.isNaN(parseInt(value));
};

const extractNumber = (x: number, y: number) => {
  if (!isInteger(gridLens.get(x, y))) {
    return undefined;
  }

  let leftIndex = x - 1;
  let rightIndex = x + 1;

  while (isInteger(gridLens.get(leftIndex, y))) {
    leftIndex--;
  }
  leftIndex++;

  while (isInteger(gridLens.get(rightIndex, y))) {
    rightIndex++;
  }
  rightIndex--;

  let number = parseInt(grid[y].slice(leftIndex, rightIndex + 1).join(""));

  return number;
};

let potentialGearsCount = 0;
let gearsCount = 0;
let totalGearsRatio = 0;

grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "*") {
      potentialGearsCount++;
      const partNumbers = [
        extractNumber(x - 1, y),
        extractNumber(x + 1, y),
        ...(isInteger(gridLens.getTop(x, y))
          ? [extractNumber(x, y - 1)]
          : [extractNumber(x - 1, y - 1), extractNumber(x + 1, y - 1)]),
        ...(isInteger(gridLens.getBottom(x, y))
          ? [extractNumber(x, y + 1)]
          : [extractNumber(x - 1, y + 1), extractNumber(x + 1, y + 1)]),
      ].filter((n) => n !== undefined);

      if (partNumbers.length === 2) {
        gearsCount++;
        const [partNumber1, partNumber2] = partNumbers as [number, number];
        const ratio = partNumber1 * partNumber2;
        totalGearsRatio += ratio;
      }
    }
  });
});

console.log(potentialGearsCount, gearsCount, totalGearsRatio);
