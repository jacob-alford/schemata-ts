import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.Int(), _ => ({
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
  typeString: 'Integer',
}))()

runStandardTestSuite(S.Int().min(10), _ => ({
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
  jsonSchema: JS.integer({ minimum: 10 }),
  typeString: 'Integer<10,>',
}))()

runStandardTestSuite(S.Int().max(10), _ => ({
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
  jsonSchema: JS.integer({ maximum: 10 }),
  typeString: 'Integer<,10>',
}))()

runStandardTestSuite(
  S.Int({ min: 10, max: 20 }).errorName('Foo').brand(),
  _ => ({
    decoderTests: [
      _.decoder.pass(10),
      _.decoder.pass(11),
      _.decoder.pass(20),
      _.decoder.fail(9),
      _.decoder.fail(0),
      _.decoder.fail(-1),
      _.decoder.fail(21),
    ],
    encoderTests: [],
    guardTests: [],
    eqTests: [],
    jsonSchema: JS.integer({ minimum: 10, maximum: 20 }),
    typeString: 'Integer<10,20>',
  }),
  {
    makeDecodeError: _ => TC.transcodeErrors(TC.typeMismatch('Foo', _)),
  },
)()
