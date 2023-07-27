import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid: ReadonlyArray<string> = ['hello world']

const invalid: ReadonlyArray<unknown> = [
  '',
  NaN,
  0,
  Infinity,
  {},
  [],
  true,
  false,
  null,
  undefined,
  new Date(),
  new Error(),
]

runStandardTestSuite(S.NonEmptyString, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    minLength: 1,
  }),
  typeString: 'string<1,>',
}))()
