export enum GameEvents {
  UpdateLeaderboard = 'UPDATE_LEADERBOARD',
}

export enum GameDifficulty {
  Easy = 0,
  Hard = 1,
}

export enum GameMode {
  Singleplayer = 'SINGLEPLAYER',
  Multiplayer = 'MULTIPLAYER',
}

export type StatisticsData = {
  score: number
  hasPlayerWon: boolean
  time: number
}
