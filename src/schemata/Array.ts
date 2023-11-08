/** @since 1.4.0 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Schema, SchemaImplementation } from 'schemata-ts/Schema'
import { ArrayTypeString } from 'schemata-ts/schemables/array/instances/type-string'

type ArrayParams = {
  readonly minLength?: number
  readonly maxLength?: number
  readonly errorName?: string
}

/**
 * An array type of known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Array = <I, O>(
  codomain: Schema<I, O>,
  params?: ArrayParams,
): ArraySchema<I, O> => new ArraySchema(codomain, params)

/**
 * The ArraySchema schema transformer, to construct an ArraySchema use `S.Array` combinator instead.
 *
 * @since 2.2.0
 * @category Transformations
 */
export class ArraySchema<I, O> extends SchemaImplementation<
  ReadonlyArray<I>,
  ReadonlyArray<O>
> {
  constructor(
    private readonly codomain: Schema<I, O>,
    private readonly params: ArrayParams = {},
  ) {
    const { errorName: errorName_ } = params

    const expectedName =
      errorName_ ??
      pipe(
        deriveTypeString(codomain),
        ArrayTypeString.array({ ...params, expectedName: '' }),
      )[0]

    super(_ =>
      _.array({
        ...params,
        expectedName,
      })(codomain.runSchema(_)),
    )
  }

  /**
   * Requires a minimum array length
   *
   * Returns a new ArraySchema
   *
   * @since 2.2.0
   */
  public readonly minLength: (minLength: number) => ArraySchema<I, O> = minLength =>
    new ArraySchema(this.codomain, { ...this.params, minLength })

  /**
   * Requires a maximum array length
   *
   * Returns a new ArraySchema
   *
   * @since 2.2.0
   */
  public readonly maxLength: (maxLength: number) => ArraySchema<I, O> = maxLength =>
    new ArraySchema(this.codomain, { ...this.params, maxLength })

  /**
   * Converts an array schema to a non-empty array schema
   *
   * Returns a new Schema
   *
   * @since 2.2.0
   */
  public readonly nonEmpty: () => Schema<
    RNEA.ReadonlyNonEmptyArray<I>,
    RNEA.ReadonlyNonEmptyArray<O>
  > = () => unsafeCoerce(this.minLength(1))
}
