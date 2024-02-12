/** @since 2.0.0 */
import { type Const } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { type Schema } from 'schemata-ts/Schema'
import type * as _ from 'schemata-ts/schemables/parser/definition'
import { ParseEncodedJsonString } from 'schemata-ts/schemata/ParseEncodedJson'

/**
 * A branded string representing a parsable JSON string
 *
 * @since 2.2.3
 * @category Model
 */
export type JsonString = _.JsonString

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
