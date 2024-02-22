export enum Cell {
  Blank = 0,

  MazeCell01 = 226,
  MazeCell02 = 227,
  MazeCell03 = 228,
  MazeCell04 = 229,
  MazeCell05 = 230,
  MazeCell06 = 231,
  MazeCell07 = 246,
  MazeCell08 = 248,
  MazeCell09 = 249,
  MazeCell10 = 251,
  MazeCell11 = 266,
  MazeCell12 = 267,
  MazeCell13 = 268,
  MazeCell14 = 269,
  MazeCell15 = 270,
  MazeCell16 = 271,
  MazeCell17 = 286,
  MazeCell18 = 287,
  MazeCell19 = 288,
  MazeCell20 = 289,
  MazeCell21 = 290,
  MazeCell22 = 291,
  MazeCell23 = 308,
  MazeCell24 = 309,
  MazeCell25 = 311,
  MazeCell26 = 326,
  MazeCell27 = 327,
  MazeCell28 = 328,
  MazeCell29 = 329,
  MazeCell30 = 330,
  MazeCell31 = 331,
  MazeCell32 = 346,
  MazeCell33 = 347,
  MazeCell34 = 366,
  MazeCell35 = 367,

  BaseCell01 = 349,
  BaseCell02 = 350,
  BaseCell03 = 351,
  BaseCell04 = 369,
  BaseCell05 = 371,
  BaseCell06 = 386,
  BaseCell07 = 387,
  BaseCell08 = 389,
  BaseCell09 = 390,
  BaseCell10 = 391,

  GateCell01 = 388,

  Player1 = 18,
  Player2 = 19,

  Ghost1 = 14,
  Ghost2 = 15,
  Ghost3 = 16,
  Ghost4 = 17,

  Pellet = 109,
  Power = 129,

  Life1 = 158,
  Life2 = 38,

  Score = 401,
  Score1 = 402,
  Score2 = 403,
}

export const wallCells: Cell[] = [
  Cell.MazeCell01,
  Cell.MazeCell02,
  Cell.MazeCell03,
  Cell.MazeCell04,
  Cell.MazeCell05,
  Cell.MazeCell06,
  Cell.MazeCell07,
  Cell.MazeCell08,
  Cell.MazeCell09,
  Cell.MazeCell10,
  Cell.MazeCell11,
  Cell.MazeCell12,
  Cell.MazeCell13,
  Cell.MazeCell14,
  Cell.MazeCell15,
  Cell.MazeCell16,
  Cell.MazeCell17,
  Cell.MazeCell18,
  Cell.MazeCell19,
  Cell.MazeCell20,
  Cell.MazeCell21,
  Cell.MazeCell22,
  Cell.MazeCell23,
  Cell.MazeCell24,
  Cell.MazeCell25,
  Cell.MazeCell26,
  Cell.MazeCell27,
  Cell.MazeCell28,
  Cell.MazeCell29,
  Cell.MazeCell30,
  Cell.MazeCell31,
  Cell.MazeCell32,
  Cell.MazeCell33,
  Cell.MazeCell34,
  Cell.MazeCell35,
]

export const baseWallCells: Cell[] = [
  Cell.BaseCell01,
  Cell.BaseCell02,
  Cell.BaseCell03,
  Cell.BaseCell04,
  Cell.BaseCell05,
  Cell.BaseCell06,
  Cell.BaseCell07,
  Cell.BaseCell08,
  Cell.BaseCell09,
  Cell.BaseCell10,
]

export const gateWallCells: Cell[] = [Cell.GateCell01]

export const pacman: Cell[] = [Cell.Player1, Cell.Player2]

export const life: Cell[] = [Cell.Life1, Cell.Life2]

export const score: Cell[] = [Cell.Score, Cell.Score1, Cell.Score2]

export const ghost: Cell[] = [
  Cell.Ghost1,
  Cell.Ghost2,
  Cell.Ghost3,
  Cell.Ghost4,
]

export const food: Cell[] = [Cell.Pellet, Cell.Power]
