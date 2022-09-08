/**
 * Integer branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.1
 */
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.1
 * @category Internal
 */
interface IntBrand {
  readonly Int: unique symbol
}

/**
 * @since 0.0.1
 * @category Model
 */
export type Int = number & IntBrand

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isInt(n: number): n is Int {
  return G.number.is(n) && Number.isInteger(n)
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: D.Decoder<unknown, Int> = pipe(D.number, D.refine(isInt, 'Int'))

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: Eq_.Eq<Int> = N.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: G.Guard<unknown, Int> = pipe(G.number, G.refine(isInt))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: TD.TaskDecoder<unknown, Int> = pipe(
  TD.number,
  TD.refine(isInt, 'Int')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: t.Type<Int> = pipe(t.number, t.refine(isInt, 'Int'))
