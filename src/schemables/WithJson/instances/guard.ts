/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as Pred from 'fp-ts/Predicate'
import * as RR from 'fp-ts/ReadonlyRecord'

import * as G from '../../../base/GuardBase'
import { JsonString, WithJson1 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Guard: WithJson1<G.URI> = {
  json: {
    is: (u): u is J.Json =>
      pipe(
        // Boolean
        G.boolean.is,
        // Number
        Pred.or(G.number.is),
        // String
        Pred.or(G.string.is),
        // Null
        Pred.or(u => u === null),
        // Json Array
        Pred.or(u => Array.isArray(u) && u.every(Guard.json.is)),
        // Json Record
        Pred.or(
          u =>
            typeof u === 'object' &&
            u !== null &&
            pipe(u as Readonly<Record<string, unknown>>, RR.every(Guard.json.is)),
        ),
      )(u),
  },
  jsonString: {
    is: (u): u is JsonString => G.string.is(u) && pipe(J.parse(u), E.isRight),
  },
}
