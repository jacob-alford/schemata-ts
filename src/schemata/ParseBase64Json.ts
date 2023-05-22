/** @since 2.0.0 */
import * as E from 'fp-ts/Either'
import { identity } from 'fp-ts/function'
import { base64Decode, base64Encode } from 'schemata-ts/internal/util'
import * as SC from 'schemata-ts/Schema'
import { ParseEncodedJsonString } from 'schemata-ts/schemata/ParseEncodedJson'
import { type Base64 } from 'schemata-ts/schemata/string/Base64'

/**
 * Parses a base64-encoded and (URIComponent) escaped JSON string.
 *
 * @since 2.0.0
 */
export const ParseBase64Json: <I, O>(inner: SC.Schema<I, O>) => SC.Schema<Base64, O> =
  ParseEncodedJsonString(
    'Base64JsonString',
    E.tryCatchK(input => decodeURIComponent(base64Decode(input)), identity),
    E.tryCatchK(input => base64Encode(encodeURIComponent(input)), identity),
    {
      contentEncoding: 'base64',
      contentMediaType: 'application/json',
    },
  )
