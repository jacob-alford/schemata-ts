/** @since 2.2.0 */
import { type Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'

/**
 * A schema combinator which transforms the output type of a schema to a specified class
 *
 * @since 2.2.0
 * @category Combinators
 */
export const Class = <T, O>(
  constructor: new (...args: ReadonlyArray<any>) => T,
  toClass: (output: O) => T,
  fromClass: (class_: T) => O,
): (<I>(schema: Schema<I, O>) => Schema<I, T>) =>
  Imap(
    {
      is: (input: unknown): input is T => input instanceof constructor,
    },
    toClass,
    fromClass,
  )
