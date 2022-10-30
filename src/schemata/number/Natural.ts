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
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type Natural = number & NaturalBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type NaturalS = SchemaExt<number, Natural>

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
export const Natural: NaturalS = make(S =>
  pipe(S.int({ min: 0 }), S.brand<NaturalBrand>())
)
