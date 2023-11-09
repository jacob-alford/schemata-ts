/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import {
  type Float as Floating,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Schema, SchemaImplementation } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'

type FloatWithDefault<
  Min extends number | undefined,
  Max extends number | undefined,
> = Floating<
  Min extends undefined ? MaxNegativeFloat : Min,
  Max extends undefined ? MaxPositiveFloat : Max
>

/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Number
 */
export const Float = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: NumberParams<Min, Max>,
): FloatSchema<Min, Max> => new FloatSchema(params)

/**
 * The FloatSchema transformer class, use instead `S.Float` function to create a FloatSchema
 *
 * @since 2.2.0
 * @category Transformations
 */
export class FloatSchema<
  Min extends number | undefined,
  Max extends number | undefined,
> extends SchemaImplementation<FloatWithDefault<Min, Max>> {
  constructor(private readonly params?: NumberParams<Min, Max>) {
    super(s => s.float(params))
  }

  /**
   * Brands this FloatSchema with a certain brand
   *
   * @since 2.2.0
   */
  public readonly brand: <Brand>() => Schema<Branded<FloatWithDefault<Min, Max>, Brand>> =
    () => unsafeCoerce(this)

  /**
   * Sets the minimum value of the FloatSchema
   *
   * @since 2.2.0
   */
  public readonly min: <NewMin extends number>(
    minLength: NewMin,
  ) => FloatSchema<NewMin, Max> = min => new FloatSchema({ ...this.params, min })

  /**
   * Sets the maximum value of the FloatSchema
   *
   * @since 2.2.0
   */
  public readonly max: <NewMax extends number>(
    maxLength: NewMax,
  ) => FloatSchema<Min, NewMax> = max => new FloatSchema({ ...this.params, max })

  /**
   * Overrides the 'expected' field in TranscodeError > TypeMismatch
   *
   * @since 2.2.0
   * @default 'string<minLength?, maxLength?>'
   */
  public readonly errorName: (errorName: string) => FloatSchema<Min, Max> = errorName =>
    new FloatSchema({ ...this.params, errorName })
}
