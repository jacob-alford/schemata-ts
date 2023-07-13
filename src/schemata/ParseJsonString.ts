/** @since 2.0.0 */
import { type Const } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { type Schema } from 'schemata-ts/Schema'
import { type JsonString } from 'schemata-ts/schemables/parser/definition'
import { ParseEncodedJsonString } from 'schemata-ts/schemata/ParseEncodedJson'

/**
 * Parses a Json string using supplied schema
 *
 * @since 2.0.0
 * @category Printer Parsers
 */
export const ParseJsonString: <I, O>(
  inner: Schema<I, O>,
) => Schema<Const<JsonString, I>, O> = ParseEncodedJsonString(E.right, E.right, {
  contentMediaType: 'application/json',
})
