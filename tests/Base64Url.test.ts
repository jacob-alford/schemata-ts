import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  '',
  'bGFkaWVzIGFuZCBnZW50bGVtZW4sIHdlIGFyZSBmbG9hdGluZyBpbiBzcGFjZQ',
  '1234',
  'bXVtLW5ldmVyLXByb3Vk',
  'PDw_Pz8-Pg',
  'VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw',
]

const invalid = [
  ' AA',
  '\tAA',
  '\rAA',
  '\nAA',
  'This+isa/bad+base64Url==',
  '0K3RgtC+INC30LDQutC+0LTQuNGA0L7QstCw0L3QvdCw0Y8g0YHRgtGA0L7QutCw',
]

runStandardTestSuite(S.Base64Url, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({ pattern: '^([A-Za-z0-9_\\x2d]*)$' }),
  typeString: 'Base64Url',
}))()
