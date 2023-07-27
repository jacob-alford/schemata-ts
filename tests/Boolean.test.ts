import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.Boolean, _ => ({
  decoderTests: [
    _.decoder.pass(true),
    _.decoder.pass(false),
    _.decoder.fail(1),
    _.decoder.fail('true'),
    _.decoder.fail('false'),
    _.decoder.fail({}),
    _.decoder.fail([]),
    _.decoder.fail(null),
    _.decoder.fail(undefined),
    _.decoder.fail(NaN),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.booleanSchema,
  typeString: 'boolean',
}))()
