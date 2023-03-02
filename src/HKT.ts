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

/**
 * @since 2.0.0
 * @category Model
 */
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

/**
 * @since 2.0.0
 * @category Model
 */
export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly In: In
      readonly Out2: Out2
      readonly Out1: Out1
      readonly Target: Target
    })['type']
  : {
      readonly F: F
      readonly In: (_: In) => void
      readonly Out2: () => Out2
      readonly Out1: () => Out1
      readonly Target: (_: Target) => Target
    }
