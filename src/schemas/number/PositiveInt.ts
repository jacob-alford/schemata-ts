/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, TypeOf } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type PositiveIntBrand = Brand<{ readonly PositiveInt: unique symbol }['PositiveInt']>

/**
 * @since 1.0.0
 * @category Schema
 */
export const PositiveInt = make(S => pipe(S.int({ min: 0 }), S.brand<PositiveIntBrand>()))

/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
export type PositiveInt = TypeOf<typeof PositiveInt>
