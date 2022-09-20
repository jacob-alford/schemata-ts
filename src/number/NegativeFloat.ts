/**
 * Negative floating point branded newtype.
 *
 * Represents negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -2 ** 53 + 1 }
 * ```
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as N from 'fp-ts/number'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.2
 * @category Internal
 */
interface NegativeFloatBrand {
  readonly NegativeFloat: unique symbol
}

/**
 * Negative floating point branded newtype.
 *
 * Represents negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -2 ** 53 + 1 }
 * ```
 *
 * @since 0.0.2
 * @category Model
 */
export type NegativeFloat = number & NegativeFloatBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT<S, NegativeFloat>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NegativeFloat>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeFloat>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isNegativeFloat = (f: number): f is NegativeFloat =>
  typeof f === 'number' && G.number.is(f) && f < 0 && f >= Number.MIN_SAFE_INTEGER

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.number,
  D.refine(isNegativeFloat, 'NegativeFloat')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = N.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.number, G.refine(isNegativeFloat))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.number,
  TD.refine(isNegativeFloat, 'NegativeFloat')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.number,
  t.refine(isNegativeFloat, 'NegativeFloat')
)
