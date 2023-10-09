/**
 * The schemata-ts schema type
 *
 * @since 1.0.0
 */
import { identity, unsafeCoerce } from 'fp-ts/function'
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
 * @since 2.1.0
 * @category Implementation
 */
export class SchemaImplementation<I, O = I> implements Schema<I, O> {
  /** @since 2.0.0 */
  readonly [SchemaSymbol]: SchemaSymbol = SchemaSymbol

  /** @since 2.0.0 */
  readonly input: (_: I) => I = identity

  /** @since 2.0.0 */
  readonly output: (_: O) => O = identity

  /** @since 2.0.0 */
  readonly runSchema: <S extends hkt.SchemableLambda>(
    S: Schemable<S>,
  ) => hkt.SchemableKind<S, I, O>

  protected constructor(
    runSchema: <S extends hkt.SchemableLambda>(
      S: Schemable<S>,
    ) => hkt.SchemableKind<S, I, O>,
  ) {
    this.runSchema = memoize(runSchema)
  }

  /** @internal */
  public static make = <S extends Schema<any, any>['runSchema']>(
    f: S,
  ): S extends (...args: ReadonlyArray<any>) => {
    Input: (...args: ReadonlyArray<any>) => infer I
    Output: (...args: ReadonlyArray<any>) => infer O
  }
    ? Schema<I, O>
    : never => unsafeCoerce(new SchemaImplementation(f))
}

/**
 * @since 2.0.0
 * @category Guards
 */
export const isSchema = (u: unknown): u is Schema<unknown, unknown> =>
  u !== null && typeof u === 'object' && !Array.isArray(u) && SchemaSymbol in u

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
 * @since 1.0.0
 * @category Utilities
 */
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
