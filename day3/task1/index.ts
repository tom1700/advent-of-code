import fs from "node:fs";

const input = fs.readFileSync("../input.txt", "utf8");

class GridLens {
  constructor(private grid: string[][]) {}

  public get(x: number, y: number) {
    return this.grid[y][x];
  }

  public getTop(x: number, y: number) {
    return this.grid[y - 1]?.[x];
  }

  public getBottom(x: number, y: number) {
    return this.grid[y + 1]?.[x];
  }

  public getLeft(x: number, y: number) {
    return this.grid[y][x - 1];
  }

  public getRight(x: number, y: number) {
    return this.grid[y][x + 1];
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

const numbers: { x: number; y: number; number: number }[] = [];

input.split("\n").forEach((row, y) => {
  const regex = /\b\d+\b/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(row)) !== null) {
    numbers.push({
      x: match.index,
      y,
      number: parseInt(match[0]),
    });
  }
});

const isInteger = (value) => {
  return !Number.isNaN(parseInt(value));
};

const isSymbol = (value) =>
  value !== "." && value !== undefined && !isInteger(value);

const isPartNumber = (startX: number, y: number) => {
  let currentX = startX;

  while (isInteger(gridLens.get(currentX, y))) {
    if (
      isSymbol(gridLens.getLeft(currentX, y)) ||
      isSymbol(gridLens.getRight(currentX, y)) ||
      isSymbol(gridLens.getTop(currentX, y)) ||
      isSymbol(gridLens.getBottom(currentX, y)) ||
      isSymbol(gridLens.getTopLeft(currentX, y)) ||
      isSymbol(gridLens.getTopRight(currentX, y)) ||
      isSymbol(gridLens.getBottomLeft(currentX, y)) ||
      isSymbol(gridLens.getBottomRight(currentX, y))
    ) {
      return true;
    }

    currentX++;
  }

  return false;
};

// console.log("Is part number", isPartNumber(6, 0));

const partNumbers = numbers.filter((number) =>
  isPartNumber(number.x, number.y)
);

console.log(
  "Sum of all numbers",
  numbers.reduce((acc, number) => acc + number.number, 0)
);

console.log(
  "Sum of all part numbers",
  partNumbers.reduce((acc, number) => acc + number.number, 0)
);
