/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
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
interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.2
 * @category Model
 */
export type PositiveFloat = number & PositiveFloatBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, number, PositiveFloat>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, PositiveFloat>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, number, PositiveFloat>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveFloat>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isPositiveFloat = (f: number): f is PositiveFloat =>
  typeof f === 'number' && G.number.is(f) && f > 0 && f <= Number.MAX_SAFE_INTEGER

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.number,
  D.refine(isPositiveFloat, 'PositiveFloat')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.number, G.refine(isPositiveFloat))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.number,
  TD.refine(isPositiveFloat, 'PositiveFloat')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.number,
  t.refine(isPositiveFloat, 'PositiveFloat')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()
