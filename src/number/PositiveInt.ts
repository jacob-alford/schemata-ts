/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

import { isInt } from './Int'

/**
 * @since 0.0.1
 * @category Internal
 */
interface PositiveIntBrand {
  readonly PositiveInt: unique symbol
}

/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.1
 * @category Model
 */
export type PositiveInt = number & PositiveIntBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT<S, PositiveInt>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, PositiveInt>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveInt>

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isPositiveInt(n: number): n is PositiveInt {
  return isInt(n) && n > 0
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.number,
  D.refine(isPositiveInt, 'PositiveInt')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = N.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.number, G.refine(isPositiveInt))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.number,
  TD.refine(isPositiveInt, 'PositiveInt')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.number,
  t.refine(isPositiveInt, 'PositiveInt')
)
