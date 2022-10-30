/**
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { SchemaExt, make } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NaturalBrand = Brand<{ readonly Natural: unique symbol }['Natural']>

/**
 * @since 1.0.0
 * @category Model
 */
export type Natural = number & NaturalBrand

/**
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const Natural: SchemaExt<number, Natural> = make(S =>
  pipe(S.int({ min: 0 }), S.brand<NaturalBrand>())
)
