/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import { unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Eq_ from 'schemata-ts/Eq'
import { SafeJson } from 'schemata-ts/Printer'
import { WithJson1 } from 'schemata-ts/schemables/WithJson/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Eq: WithJson1<Eq_.URI> = {
  json: {
    equals: (x, y) =>
      x === y ||
      (Array.isArray(x) &&
        Array.isArray(y) &&
        x.length === y.length &&
        RA.getEq<SafeJson>(Eq.json).equals(x, y)) ||
      (typeof x === 'object' &&
        typeof y === 'object' &&
        x !== null &&
        y !== null &&
        !Array.isArray(x) &&
        !Array.isArray(y) &&
        RR.getEq<string, SafeJson>(Eq.json).equals(unsafeCoerce(x), unsafeCoerce(y))),
  },
  jsonString: {
    equals: (x, y) => x === y || Eq.json.equals(JSON.parse(x), JSON.parse(y)),
  },
}
