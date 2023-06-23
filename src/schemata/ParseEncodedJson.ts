/** @since 2.0.0 */
import * as E from 'fp-ts/Either'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import { type Schema, make } from 'schemata-ts/Schema'
import { type JsonString } from 'schemata-ts/schemables/parser/definition'

/**
 * Applies a fallible string mapping function to a schema which parses a Json string.
 * Useful for things like conversion between character encodings.
 *
 * @since 2.0.0
 * @category Printer Parsers
 */
export const ParseEncodedJsonString: (
  name: string,
  decode: (encoded: string) => E.Either<unknown, string>,
  encode: (jsonString: string) => E.Either<unknown, string>,
  jsonSchemaOptions?: {
    contentEncoding?: string
    contentMediaType?: string
    format?: string
  },
) => <I, O>(inner: Schema<I, O>) => Schema<JsonString, O> =
  (name, decode, encode, options = {}) =>
  inner => {
    const { contentEncoding, contentMediaType, format } = options
    return unsafeCoerce(
      make(_ =>
        pipe(
          inner.runSchema(_),
          _.parse(
            name,
            flow(decode, E.chain(J.parse)),
            flow(J.stringify, E.chain(encode)),
            contentEncoding,
            contentMediaType,
            format,
          ),
        ),
      ),
    )
  }
