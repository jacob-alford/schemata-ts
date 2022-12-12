/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import type { Arbitrary as Arbitrary_ } from 'fast-check'
import * as J from 'fp-ts/Json'

import * as Arb from '../../../base/ArbitraryBase'
import { JsonString, WithJson1 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Arbitrary: WithJson1<Arb.URI> = {
  json: {
    arbitrary: fc => fc.jsonValue() as Arbitrary_<J.Json>,
  },
  jsonString: {
    arbitrary: fc => fc.json() as Arbitrary_<JsonString>,
  },
}
