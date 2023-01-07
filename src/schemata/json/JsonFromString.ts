/**
 * Represents Json values converted from strings
 *
 * @since 1.1.0
 */
import { pipe } from 'fp-ts/function'
import * as P from 'schemata-ts/base/PrinterBase'
import * as Json from 'schemata-ts/schemables/WithJson/instances/guard'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/**
 * @since 1.1.0
 * @category Model
 */
export type JsonFromStringS = SchemaExt<string, P.SafeJson>

/**
 * @since 1.1.0
 * @category Schema
 */
export const JsonFromString: JsonFromStringS = make(S =>
  pipe(S.jsonString, S.imap(Json.Guard.json, 'Json')(P.safeParse, P.safeStringify)),
)
