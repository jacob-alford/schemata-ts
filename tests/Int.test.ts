import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite('int', S.Int(), _ => ({
  decoderTests: [
    _.decoder.pass(1),
    _.decoder.pass(0),
    _.decoder.pass(-1),
    _.decoder.fail(1.1),
    _.decoder.fail(0.1),
    _.decoder.fail(-1.1),
    _.decoder.fail(1.101e1),
    _.decoder.pass(-0.1e1),
    _.decoder.pass(0x160),
    _.decoder.pass(0b100110),
    _.decoder.pass(0o160),
    _.decoder.pass(156e10),
    _.decoder.pass(Number.MAX_SAFE_INTEGER),
    _.decoder.pass(Number.MIN_SAFE_INTEGER),
    _.decoder.fail(Number.MAX_VALUE),
    _.decoder.fail(Number.MIN_VALUE),
    _.decoder.fail(Number.POSITIVE_INFINITY),
    _.decoder.fail(Number.NEGATIVE_INFINITY),
    _.decoder.fail(NaN),
    _.decoder.fail(''),
    _.decoder.fail('a'),
    _.decoder.fail(true),
    _.decoder.fail({}),
    _.decoder.fail([]),
    _.decoder.fail(null),
    _.decoder.fail(undefined),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.integer(),
}))()
