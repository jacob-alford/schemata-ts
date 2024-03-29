import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  S.Unknown,
  _ => ({
    decoderTests: [
      _.decoder.pass(''),
      _.decoder.pass('a'),
      _.decoder.pass(1),
      _.decoder.pass(true),
      _.decoder.pass({}),
      _.decoder.pass([]),
      _.decoder.pass(null),
      _.decoder.pass(undefined),
      _.decoder.pass(NaN),
    ],
    encoderTests: [_.encoder.pass(Number.NaN)],
    guardTests: [],
    eqTests: [],
    jsonSchema: JS.emptySchema,
    typeString: 'unknown',
  }),
  {
    skip: [
      'semigroup-first-associativity',
      'semigroup-last-associativity',
      'semigroup-many-associativity',
    ],
  },
)()
