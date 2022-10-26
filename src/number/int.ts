/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as Enc from 'io-ts/Encoder'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 1.0.0
 * @internal
 */
interface IntBrand {
  readonly Int: unique symbol
}

/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type Int = number & IntBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type IntParams = {
  readonly min?: number
  readonly max?: number
}

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = (params?: IntParams) => HKT2<S, number, Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (params?: IntParams) => Kind<S, Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = (
  params?: IntParams
) => Kind2<S, number, Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  params?: IntParams
) => Kind2<S, unknown, Int>

/**
 * @since 1.0.0
 * @category Refinements
 */
export const isInt =
  ({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: IntParams = {}) =>
  (n: number): n is Int =>
    typeof n === 'number' &&
    !Number.isNaN(n) &&
    Number.isSafeInteger(n) &&
    n >= min &&
    n <= max

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = params =>
  pipe(D.number, D.refine(isInt(params), 'int'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = () => N.Eq

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = params =>
  pipe(G.number, G.refine(isInt(params)))

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = params =>
  pipe(TD.number, TD.refine(isInt(params), 'int'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = params =>
  pipe(t.number, t.refine(isInt(params), 'int'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = () => Enc.id()

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = (params = {}) => {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
  return fc
    .integer({
      min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
      max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
    })
    .filter(isInt(params))
}
