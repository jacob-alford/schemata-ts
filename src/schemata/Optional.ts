/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type ImplicitOptional } from 'schemata-ts/internal/struct'
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * A schema that widens a schema to include `undefined`. Also marks the input property of
 * a struct as optional.
 *
 * Optional property `fallbackInput` is used to provide a default value for transcoders
 * and json-schemas.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Optional = <I, O, Fallback extends I | undefined = undefined>(
  target: Schema<I, O>,
  fallbackInput?: Fallback,
): Fallback extends undefined
  ? ImplicitOptional & Schema<I | undefined, O | undefined>
  : ImplicitOptional & Schema<I | undefined, O> =>
  unsafeCoerce(
    make(_ =>
      _.optional(target.runSchema(_), deriveTypeString(target)[0], { fallbackInput }),
    ),
  )
