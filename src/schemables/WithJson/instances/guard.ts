/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as G from 'schemata-ts/Guard'
import { JsonString, SafeJson, toJson } from 'schemata-ts/Printer'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Guard as P } from 'schemata-ts/schemables/WithPrimitives/instances/guard'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Guard: WithJson<G.SchemableLambda> = {
  json: {
    is: (input): input is SafeJson => pipe(input, toJson, E.isRight),
  },
  jsonString: {
    is: (u): u is JsonString => P.string().is(u) && pipe(J.parse(u), E.isRight),
  },
}
