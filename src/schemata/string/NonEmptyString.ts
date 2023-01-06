/**
 * A string with length greater than one
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/** @internal */
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
 * @since 1.0.0
 * @category Model
 */
export type NonEmptyStringS = SchemaExt<string, NonEmptyString>

/**
 * A string with length greater than one
 *
 * @since 1.0.0
 * @category Schema
 */
export const NonEmptyString: NonEmptyStringS = make(S =>
  pipe(
    S.string,
    S.refine((s): s is NonEmptyString => s.length > 0, 'NonEmptyString'),
    S.brand<NonEmptyStringBrand>(),
  ),
)
