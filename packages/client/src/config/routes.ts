export const routes = {
  app: (): string => '/',
  signin: (): string => '/sign-in',
  signup: (): string => '/sign-up',
  profile: (): string => '/profile',
  game: (): string => '/game',
  leaderboard: (): string => '/leaderboard',
  forum: (): string => '/forum',
  topic: (): string => '/forum/:forumId',
}
