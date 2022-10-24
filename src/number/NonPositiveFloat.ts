/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 0.0.4
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as fc from 'fast-check'
import * as G from 'io-ts/Guard'
import * as N from 'fp-ts/number'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Arb from '../internal/ArbitraryBase'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.4
 * @internal
 */
interface NonPositiveFloatBrand {
  readonly NonPositiveFloat: unique symbol
}

/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 0.0.4
 * @category Model
 */
export type NonPositiveFloat = number & NonPositiveFloatBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, number, NonPositiveFloat>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveFloat>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, number, NonPositiveFloat>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveFloat>

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isNonPositiveFloat = (n: number): n is NonPositiveFloat =>
  typeof n === 'number' && G.number.is(n) && n <= 0 && n >= -Number.MAX_VALUE

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.number,
  D.refine(isNonPositiveFloat, 'NonPositiveFloat')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.4
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = N.Eq

/**
 * @since 0.0.4
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.number, G.refine(isNonPositiveFloat))

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.number,
  TD.refine(isNonPositiveFloat, 'NonPositiveFloat')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.number,
  t.refine(isNonPositiveFloat, 'NonPositiveFloat')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .float({ max: 0 })
  .filter(isNonPositiveFloat)
