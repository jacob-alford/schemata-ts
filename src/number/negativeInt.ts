/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
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
interface NegativeIntBrand {
  readonly NegativeInt: unique symbol
}

/**
 * @since 0.0.1
 * @category Model
 */
export type NegativeInt = number & NegativeIntBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT<S, NegativeInt>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NegativeInt>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeInt>

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isNegativeInt(n: number): n is NegativeInt {
  return isInt(n) && n < 0
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: D.Decoder<unknown, NegativeInt> = pipe(
  D.number,
  D.refine(isNegativeInt, 'NegativeInt')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: Eq_.Eq<NegativeInt> = N.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: G.Guard<unknown, NegativeInt> = pipe(
  G.number,
  G.refine(isNegativeInt)
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: TD.TaskDecoder<unknown, NegativeInt> = pipe(
  TD.number,
  TD.refine(isNegativeInt, 'NegativeInt')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: t.Type<NegativeInt> = pipe(
  t.number,
  t.refine(isNegativeInt, 'NegativeInt')
)
