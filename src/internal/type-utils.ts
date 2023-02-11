export type Combine<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never
