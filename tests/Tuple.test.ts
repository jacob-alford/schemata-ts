import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.Tuple(S.String(), S.Natural), () => ({
  jsonSchema: JS.tuple(JS.string(), JS.integer({ minimum: 0 })),
  jsonSchema2020: {
    type: 'array',
    prefixItems: [JS.string(), JS.integer({ minimum: 0 })],
    items: false,
    maxItems: 2,
    minItems: 2,
  },
  typeString: '[string, Integer<0,>]',
}))()
