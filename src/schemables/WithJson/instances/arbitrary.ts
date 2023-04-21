import type { Arbitrary as Arbitrary_ } from 'fast-check'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { JsonString, SafeJson } from 'schemata-ts/Printer'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

export const WithJsonArbitrary: WithJson<Arb.SchemableLambda> = {
  json: {
    arbitrary: fc => fc.jsonValue() as Arbitrary_<SafeJson>,
  },
  jsonString: {
    arbitrary: fc => fc.json() as Arbitrary_<JsonString>,
  },
}
