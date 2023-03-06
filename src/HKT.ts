/**
 * Defers evaluation of a resolved type to when parameters are known
 *
 * @since 2.0.0
 */
export interface SchemableLambda {
  readonly Input: unknown
  readonly Output: unknown
}

/**
 * Applies parameters to a type-lambda resolving it to a concrete type
 *
 * @since 2.0.0
 */
export type SchemableKind<F extends SchemableLambda, Input, Output> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly Input: Input
      readonly Output: Output
    })['type']
  : {
      readonly F: F
      readonly Input: (_: Input) => Input
      readonly Output: (_: Output) => Output
    }
