/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import * as J from 'fp-ts/Json'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'

import * as Eq_ from '../../../base/EqBase'
import { WithJson1 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Eq: WithJson1<Eq_.URI> = {
  json: {
    equals: (x, y) =>
      x === y ||
      (Array.isArray(x) &&
        Array.isArray(y) &&
        x.length === y.length &&
        RA.getEq<J.Json>(Eq.json).equals(x, y)) ||
      (typeof x === 'object' &&
        typeof y === 'object' &&
        x !== null &&
        y !== null &&
        !Array.isArray(x) &&
        !Array.isArray(y) &&
        RR.getEq<string, J.Json>(Eq.json).equals(x as J.JsonRecord, y as J.JsonRecord)),
  },
  jsonString: {
    equals: (x, y) => x === y || Eq.json.equals(JSON.parse(x), JSON.parse(y)),
  },
}
