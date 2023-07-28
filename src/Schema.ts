/**
 * The schemata-ts schema type
 *
 * @since 1.0.0
 */
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
