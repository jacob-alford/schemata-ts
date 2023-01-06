/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import type { Arbitrary as Arbitrary_ } from 'fast-check'
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { JsonString, SafeJson } from 'schemata-ts/base/PrinterBase'
import { WithJson1 } from 'schemata-ts/schemables/WithJson/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Arbitrary: WithJson1<Arb.URI> = {
  json: {
    arbitrary: fc => fc.jsonValue() as Arbitrary_<SafeJson>,
  },
  jsonString: {
    arbitrary: fc => fc.json() as Arbitrary_<JsonString>,
  },
}
