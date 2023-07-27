/**
 * The schemata-ts schema type
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import type * as hkt from 'schemata-ts/internal/schemable'
import { type Schemable } from 'schemata-ts/Schemable'

const SchemaSymbol = Symbol.for('schemata-ts/Schema')
type SchemaSymbol = typeof SchemaSymbol

/**
 * @since 1.0.0
 * @category Model
 */
export interface Schema<I, O = I> {
  readonly [SchemaSymbol]: SchemaSymbol
  readonly input: (_: I) => I
  readonly output: (_: O) => O
  readonly runSchema: <S extends hkt.SchemableLambda>(
    S: Schemable<S>,
  ) => hkt.SchemableKind<S, I, O>
}

/**
 * @since 2.0.0
 * @category Guards
 */
export const isSchema = (u: unknown): u is Schema<unknown, unknown> =>
  u !== null && typeof u === 'object' && !Array.isArray(u) && SchemaSymbol in u

/** @internal */
export const memoize = <A, B>(f: (a: A) => B): ((a: A) => B) => {
  const cache = new Map()
  return a => {
    if (!cache.has(a)) {
      const b = f(a)
      cache.set(a, b)
      return b
    }
    return cache.get(a)
  }
}

/** @internal */
export const make = <S extends Schema<any, any>['runSchema']>(
  f: S,
): S extends (...args: ReadonlyArray<any>) => {
  Input: (...args: ReadonlyArray<any>) => infer E
  Output: (...args: ReadonlyArray<any>) => infer A
}
  ? Schema<E, A>
  : never =>
  ({
    [SchemaSymbol]: SchemaSymbol,
    runSchema: memoize(f),
    input: identity,
    output: identity,
  } as any)

/**
 * Extract the output of a schema
 *
 * @since 1.0.0
 * @category Type Helpers
 */
export type TypeOf<S> = S extends Schema<any, infer A> ? A : never

/**
 * Extract the output of a schema.
 *
 * Alias of `TypeOf`
 *
 * @since 1.0.0
 * @category Type Helpers
 */
export type OutputOf<S> = TypeOf<S>

/**
 * Extract the input type of a schema.
 *
 * @since 1.0.0
 * @category Type Helpers
 */
export type InputOf<S> = S extends Schema<infer I, any> ? I : never

/**
 * Derives a typeclass instance from a Schema by supplying Schemable
 *
 * @since 1.0.0
 * @category Destructors
 */
export const interpret: <S extends hkt.SchemableLambda>(
  S: Schemable<S>,
) => <E, A>(schema: Schema<E, A>) => hkt.SchemableKind<S, E, A> = S => schema =>
  schema.runSchema(S)
