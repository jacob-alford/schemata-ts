/** @since 2.0.0 */
import { type Const } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { identity, pipe, unsafeCoerce } from 'fp-ts/function'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { base64Decode, base64Encode } from 'schemata-ts/internal/util'
import { type Schema } from 'schemata-ts/Schema'
import { Annotate } from 'schemata-ts/schemata/Annotate'
import { type Base64 } from 'schemata-ts/schemata/Base64'
import { ParseEncodedJsonString } from 'schemata-ts/schemata/ParseEncodedJson'

/**
 * Parses a base64-encoded and (URIComponent) escaped JSON string.
 *
 * @since 2.0.0
 * @category Printer Parsers
 */
export const ParseBase64Json: <I, O>(
  inner: Schema<I, O>,
) => Schema<Const<Base64, I>, O> = inner =>
  pipe(
    inner,
    ParseEncodedJsonString(
      E.tryCatchK(input => decodeURIComponent(base64Decode(input)), identity),
      E.tryCatchK(input => base64Encode(encodeURIComponent(input)), identity),
      {
        contentEncoding: 'base64',
        contentMediaType: 'application/json',
        nameOverride: 'Base64',
      },
    ),
    Annotate({
      typeString: ['Base64', getTypeString(inner)[1]],
    }),
    _ => unsafeCoerce(_),
  )
