/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import type { Arbitrary as Arbitrary_ } from 'fast-check'
import * as Arb from 'schemata-ts/Arbitrary'
import { JsonString, SafeJson } from 'schemata-ts/Printer'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Arbitrary: WithJson<Arb.SchemableLambda> = {
  json: {
    arbitrary: fc => fc.jsonValue() as Arbitrary_<SafeJson>,
  },
  jsonString: {
    arbitrary: fc => fc.json() as Arbitrary_<JsonString>,
  },
}
