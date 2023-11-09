/** @since 1.0.0 */
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { String } from 'schemata-ts/schemata/String'

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

/**
 * A string with length greater than one
 *
 * @since 1.0.0
 * @category Model
 */
export type NonEmptyString = Branded<string, NonEmptyStringBrand>

/**
 * A string with length greater than one
 *
 * @since 1.0.0
 * @category String
 */
export const NonEmptyString: Schema<NonEmptyString> = String({
  minLength: 1,
}).brand<NonEmptyStringBrand>()
