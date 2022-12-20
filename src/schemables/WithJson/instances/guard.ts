/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'

import * as G from '../../../base/GuardBase'
import { JsonString, SafeJson, toJson } from '../../../base/PrinterBase'
import { WithJson1 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Guard: WithJson1<G.URI> = {
  json: {
    is: (input): input is SafeJson => pipe(input, toJson, E.isRight),
  },
  jsonString: {
    is: (u): u is JsonString => G.string.is(u) && pipe(J.parse(u), E.isRight),
  },
}
