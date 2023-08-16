/** @since 2.0.0 */
import { type Const } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Either } from 'schemata-ts/internal/either'
import { type Schema } from 'schemata-ts/Schema'
import { type JsonString } from 'schemata-ts/schemables/parser/definition'
import { type ParserOptions, Parse } from 'schemata-ts/schemata/Parse'

/**
 * Applies a fallible string mapping function to a schema which parses a Json string.
 * Useful for things like conversion between character encodings.
 *
 * @since 2.0.0
 * @category Printer Parsers
 */
export const ParseEncodedJsonString: (
  decode: (encoded: string) => Either<unknown, string>,
  encode: (jsonString: string) => Either<unknown, string>,
  options?: ParserOptions & { readonly nameOverride?: string },
) => <I, O>(inner: Schema<I, O>) => Schema<Const<JsonString, I>, O> =
  (decode, encode, options = {}) =>
  inner =>
    pipe(
      inner,
      Parse(
        options.nameOverride ?? deriveTypeString(inner)[0],
        flow(decode, E.chain(J.parse)),
        flow(J.stringify, E.chain(encode)),
        options,
      ),
      _ => unsafeCoerce(_),
    )
