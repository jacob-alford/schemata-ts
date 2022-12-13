import { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @since 2.0.0
 * @category Model
 */
export interface Schemable<S extends TypeLambda> extends TypeClass<S> {}

/**
 * @since 2.0.0
 * @category Model
 */
export interface Schema<I, A> {
  <S extends TypeLambda>(requirements: Schemable<S>): Kind<S, I, never, never, A>
}

/**
 * @since 2.0.0
 * @category Constructors
 */
export const makeSchema: <I, A>(s: Schema<I, A>) => Schema<I, A> = s => s

/**
 * @since 2.0.0
 * @category Utilities
 */
export const interpret: <S extends TypeLambda, I, A>(
  schemable: Schemable<S>,
) => (s: Schema<I, A>) => Kind<S, I, never, never, A> = schemable => s => s(schemable)

/**
 * @since 2.0.0
 * @category Utilities
 */
export type InputOf<S> = S extends Schema<infer I, unknown> ? I : never

/**
 * @since 2.0.0
 * @category Utilities
 */
export type OutputOf<S> = S extends Schema<unknown, infer A> ? A : never
