import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Struct({
  a: S.Float({ min: 0, max: 4 }),
  b: S.Optional(S.Int({ min: 0, max: 4 }), 3 as Integer<0, 4>),
})

const Readonly = Schema.readonly()

runStandardTestSuite(Readonly, () => ({
  jsonSchema: {
    type: 'object',
    readOnly: true,
    properties: {
      a: { type: 'number', minimum: 0, maximum: 4 },
      b: { type: 'integer', minimum: 0, maximum: 4, default: 3 },
    },
    required: ['a'],
  },
}))()
