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
import { Branded } from 'io-ts'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/** @internal */
interface NaturalBrand {
  readonly Natural: unique symbol
}

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
export type Natural = Branded<number, NaturalBrand>

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
  pipe(S.int({ min: 0 }), S.brand<NaturalBrand>()),
)
