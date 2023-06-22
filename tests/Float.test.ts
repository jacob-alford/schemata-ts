import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite('Float', S.Float(), _ => ({
  decoderTests: [
    _.decoder.pass(1),
    _.decoder.pass(0),
    _.decoder.pass(-1),
    _.decoder.pass(1.1),
    _.decoder.pass(0.1),
    _.decoder.pass(-1.1),
    _.decoder.pass(1.1e1),
    _.decoder.pass(-0.1e1),
    _.decoder.pass(0x160),
    _.decoder.pass(0b100110),
    _.decoder.pass(0o160),
    _.decoder.pass(Number.MAX_SAFE_INTEGER),
    _.decoder.pass(Number.MIN_SAFE_INTEGER),
    _.decoder.pass(Number.MAX_VALUE),
    _.decoder.pass(Number.MIN_VALUE),
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
  jsonSchema: JS.number(),
  typeString: 'Float',
}))()

runStandardTestSuite('Float<10,>', S.Float({ min: 10 }), _ => ({
  decoderTests: [
    _.decoder.pass(10),
    _.decoder.pass(11),
    _.decoder.pass(156e10),
    _.decoder.fail(9),
    _.decoder.fail(0),
    _.decoder.fail(-1),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.number({ minimum: 10 }),
  typeString: 'Float<10,>',
}))()

runStandardTestSuite('Float<,10>', S.Float({ max: 10 }), _ => ({
  decoderTests: [
    _.decoder.fail(11),
    _.decoder.fail(156e10),
    _.decoder.pass(10),
    _.decoder.pass(9),
    _.decoder.pass(0),
    _.decoder.pass(-1),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.number({ maximum: 10 }),
  typeString: 'Float<,10>',
}))()

runStandardTestSuite('Float<10,20>', S.Float({ min: 10, max: 20 }), _ => ({
  decoderTests: [
    _.decoder.pass(10),
    _.decoder.pass(11),
    _.decoder.pass(20),
    _.decoder.pass(19),
    _.decoder.pass(10.1),
    _.decoder.pass(19.9),
    _.decoder.fail(9),
    _.decoder.fail(0),
    _.decoder.fail(-1),
    _.decoder.fail(21),
    _.decoder.fail(156e10),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.number({ minimum: 10, maximum: 20 }),
  typeString: 'Float<10,20>',
}))()
