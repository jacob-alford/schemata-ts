import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid: ReadonlyArray<string> = [
  'foobar',
  '0987654321',
  'test@example.com',
  '1234abcDEF',
]

const invalid: ReadonlyArray<string> = ['ｆｏｏbar', 'ｘｙｚ０９８', '１２３456', 'ｶﾀｶﾅ']

runStandardTestSuite(S.Ascii, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({ pattern: '^([\\x00-\\x7f]+?)$' }),
  typeString: 'Ascii',
}))()
