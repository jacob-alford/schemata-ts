/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import { type Schema, SchemaImplementation } from 'schemata-ts/Schema'
import { type StringParams } from 'schemata-ts/schemables/primitives/definition'

/**
 * Represents string inputs / outputs
 *
 * @since 1.0.0
 * @category String
 */
export const String = (params?: StringParams): StringSchema => new StringSchema(params)

/**
 * The StringSchema transformer class, use instead `S.String` function to create a StringSchema
 *
 * @since 2.2.0
 * @category Transformations
 */
export class StringSchema extends SchemaImplementation<string> {
  constructor(private readonly params?: StringParams) {
    super(s => s.string(params))
  }

  /**
   * Brands this string schema with a certain brand
   *
   * @since 2.2.0
   */
  public readonly brand: <Brand>() => Schema<Branded<string, Brand>> = () =>
    unsafeCoerce(this)

  /**
   * Sets the minimum required length of the string
   *
   * @since 2.2.0
   */
  public readonly minLength: (minLength: number) => StringSchema = minLength =>
    new StringSchema({ ...this.params, minLength })

  /**
   * Sets the maximum required length of the string
   *
   * @since 2.2.0
   */
  public readonly maxLength: (maxLength: number) => StringSchema = maxLength =>
    new StringSchema({ ...this.params, maxLength })

  /**
   * Overrides the 'expected' field in TranscodeError > TypeMismatch
   *
   * @since 2.2.0
   * @default 'string<minLength?, maxLength?>'
   */
  public readonly errorName: (errorName: string) => StringSchema = errorName =>
    new StringSchema({ ...this.params, errorName })
}
