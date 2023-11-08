/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type Schema, SchemaImplementation } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'

type IntWithDefaults<
  Min extends number | undefined,
  Max extends number | undefined,
> = Integer<
  Min extends undefined ? MinSafeInt : Min,
  Max extends undefined ? MaxSafeInt : Max
>

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
 * @category Number
 */
export const Int = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: NumberParams<Min, Max>,
): IntSchema<Min, Max> => new IntSchema(params)

/**
 * The IntSchema transformer class, use instead `S.Int` function to create an IntSchema
 *
 * @since 2.2.0
 * @category Transformations
 */
export class IntSchema<
  Min extends number | undefined,
  Max extends number | undefined,
> extends SchemaImplementation<IntWithDefaults<Min, Max>> {
  constructor(private readonly params?: NumberParams<Min, Max>) {
    super(s => s.int(params))
  }

  /**
   * Brands this Int schema with a certain brand
   *
   * @since 2.2.0
   */
  public readonly brand: <Brand>() => Schema<Branded<IntWithDefaults<Min, Max>, Brand>> =
    () => unsafeCoerce(this)

  /**
   * Sets the minimum value of the IntSchema
   *
   * @since 2.2.0
   */
  public readonly min: <NewMin extends number>(
    minLength: NewMin,
  ) => IntSchema<NewMin, Max> = min => new IntSchema({ ...this.params, min })

  /**
   * Sets the maximum value of the IntSchema
   *
   * @since 2.2.0
   */
  public readonly max: <NewMax extends number>(
    maxLength: NewMax,
  ) => IntSchema<Min, NewMax> = max => new IntSchema({ ...this.params, max })

  /**
   * Overrides the 'expected' field in TranscodeError > TypeMismatch
   *
   * @since 2.2.0
   * @default 'string<minLength?, maxLength?>'
   */
  public readonly errorName: (errorName: string) => IntSchema<Min, Max> = errorName =>
    new IntSchema({ ...this.params, errorName })
}
