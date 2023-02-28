/**
 * Represents Json values converted from strings
 *
 * @since 1.1.0
 */
import { pipe } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { make, Schema } from 'schemata-ts/Schema'
import * as Json from 'schemata-ts/schemables/WithJson/instances/guard'

/**
 * @since 1.1.0
 * @category Model
 */
export type JsonFromStringS = Schema<string, P.SafeJson>

/**
 * @since 1.1.0
 * @category Schema
 */
export const JsonFromString: JsonFromStringS = make(S =>
  pipe(S.jsonString, S.imap(Json.Guard.json, 'Json')(P.safeParse, P.safeStringify)),
)
