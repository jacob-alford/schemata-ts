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
import { make, TypeOf } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NaturalBrand = Brand<{ readonly Natural: unique symbol }['Natural']>

/**
 * @since 1.0.0
 * @category Schema
 */
export const Natural = make(S => pipe(S.int({ min: 0 }), S.brand<NaturalBrand>()))

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
export type Natural = TypeOf<typeof Natural>
