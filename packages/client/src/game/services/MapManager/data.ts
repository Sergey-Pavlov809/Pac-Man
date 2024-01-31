export enum Cell {
  Blank = 0,

  Wall = 1,
  WallHorizontal = 2,
  WallVertical = 3,
  WallTop = 4,
  WallRight = 5,
  WallBottom = 6,
  WallLeft = 7,
  WallTopLeft = 8,
  WallTopRight = 9,
  WallBottomLeft = 10,
  WallBottomRight = 11,
}

export const wallCells: Cell[] = [
  Cell.Wall,
  Cell.WallHorizontal,
  Cell.WallVertical,
  Cell.WallTop,
  Cell.WallRight,
  Cell.WallBottom,
  Cell.WallLeft,
  Cell.WallTopLeft,
  Cell.WallTopRight,
  Cell.WallBottomLeft,
  Cell.WallBottomRight,
]
