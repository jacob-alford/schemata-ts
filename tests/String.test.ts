import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite('string', S.String(), _ => ({
  decoderTests: [
    _.decoder.pass(''),
    _.decoder.pass('a'),
    _.decoder.fail(1),
    _.decoder.fail(true),
    _.decoder.fail({}),
    _.decoder.fail([]),
    _.decoder.fail(null),
    _.decoder.fail(undefined),
    _.decoder.fail(NaN),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string(),
}))()
