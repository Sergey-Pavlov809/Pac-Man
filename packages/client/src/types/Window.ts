export type AppWindow = typeof window & {
  __PRELOADED_STATE__?: Record<string, Record<string, unknown>>
}
