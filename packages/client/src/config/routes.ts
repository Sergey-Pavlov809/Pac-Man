export const routes = {
  app: (): string => '/',
  signin: (): string => '/sign-in',
  signup: (): string => '/sign-up',
  profile: (): string => '/profile',
  main: (): string => '/main',
  game: (): string => '/game',
  leaderboard: (): string => '/leaderboard',
  forum: (): string => '/chat',
  topic: (): string => '/forum/:forumId',
}
