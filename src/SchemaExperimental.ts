import { HKT2 } from 'fp-ts/HKT'

/**
 * @since 2.0.0
 * @category Model
 */
export interface Schema<R, E, A> {
  <S>(requirements: R): HKT2<S, E, A>
}

/**
 * @since 2.0.0
 * @category Constructors
 */
export const make: <R, E, A>(s: Schema<R, E, A>) => Schema<R, E, A> = s => s

/**
 * @since 2.0.0
 * @category Utilites
 */
export type RequirementsOf<S> = S extends Schema<infer R, unknown, unknown> ? R : never

/**
 * @since 2.0.0
 * @category Utilites
 */
export type InputOf<S> = S extends Schema<unknown, infer E, unknown> ? E : never

/**
 * @since 2.0.0
 * @category Utilites
 */
export type OutputOf<S> = S extends Schema<unknown, unknown, infer A> ? A : never
