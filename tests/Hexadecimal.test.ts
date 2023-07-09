import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  'deadBEEF',
  'ff0044',
  '0xff0044',
  '0XfF0044',
  '0x0123456789abcDEF',
  '0X0123456789abcDEF',
  '0hfedCBA9876543210',
  '0HfedCBA9876543210',
  '0123456789abcDEF',
]

const invalid = [
  'abcdefg',
  '',
  '..',
  '0xa2h',
  '0xa20x',
  '0x0123456789abcDEFq',
  '0hfedCBA9876543210q',
  '01234q56789abcDEF',
]

runStandardTestSuite(S.Hexadecimal, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern: '^(((0x)|(0X)|(0h)|(0H))?[0-9A-Fa-f]+?)$',
  }),
  typeString: 'Hexadecimal',
}))()
