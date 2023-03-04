/**
 * Represents a union of string, number, boolean, and null literal values
 *
 * @since 1.0.0
 */
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { make, Schema } from 'schemata-ts/Schema'

/**
 * Represents a union of string, number, boolean, and null literal values
 *
 * @since 1.0.0
 * @category Constructors
 */
export const Literal = <
  Literals extends ReadonlyNonEmptyArray<string | number | boolean | null>,
>(
  ...values: Literals
): Schema<Literals[number], Literals[number]> => make(s => s.literal(...(values as any)))
