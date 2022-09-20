/**
 * Non-negative floating point branded newtype string.
 *
 * Represents non-negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= 0, f <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { isNonNegativeFloat, NonNegativeFloat } from '../number/NonNegativeFloat'

/**
 * @since 0.0.2
 * @category Internal
 */
interface NonNegativeFloatStringBrand {
  readonly NonNegativeFloatString: unique symbol
}

/**
 * Non-negative floating point branded newtype string.
 *
 * Represents non-negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= 0, f <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.2
 * @category Model
 */
export type NonNegativeFloatString = string & NonNegativeFloatStringBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT<S, NonNegativeFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NonNegativeFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonNegativeFloatString>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isNonNegativeFloatString = (s: string): s is NonNegativeFloatString =>
  typeof s === 'string' && pipe(s, parseFloat, isNonNegativeFloat)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNonNegativeFloatString, 'NonNegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(
  G.string,
  G.refine(isNonNegativeFloatString)
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNonNegativeFloatString, 'NonNegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNonNegativeFloatString, 'NonNegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Utilities
 */
export const toNonNegativeFloat: (s: NonNegativeFloatString) => NonNegativeFloat = s =>
  unsafeCoerce(parseFloat(s))
