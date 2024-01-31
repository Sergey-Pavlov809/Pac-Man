declare const __SERVER_PORT__: number
declare const contributors: Array<{
  name: string
  email: string
  url?: string
}>
declare const __BASE_URL__: string

declare type TupleArray<T, len extends number> = [T, ...T[]] & { length: len }

declare type Nullable<T> = T | null
