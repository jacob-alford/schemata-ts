import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite('String', S.String(), _ => ({
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
  typeString: 'string',
}))()

runStandardTestSuite('String<10,>', S.String({ minLength: 10 }), _ => ({
  decoderTests: [
    _.decoder.pass('abcdefghij'),
    _.decoder.pass('abcdefghijk'),
    _.decoder.fail('abc'),
    _.decoder.fail(''),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({ minLength: 10 }),
  typeString: 'string<10,>',
}))()

runStandardTestSuite('String<,10>', S.String({ maxLength: 10 }), _ => ({
  decoderTests: [
    _.decoder.fail('abcdefghijk'),
    _.decoder.pass('abcdefghij'),
    _.decoder.pass('abc'),
    _.decoder.pass(''),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({ maxLength: 10 }),
  typeString: 'string<,10>',
}))()

runStandardTestSuite('String<10,20>', S.String({ minLength: 10, maxLength: 20 }), _ => ({
  decoderTests: [
    _.decoder.pass('abcdefghij'),
    _.decoder.pass('abcdefghijk'),
    _.decoder.pass('abcdefghijklmnopqrst'),
    _.decoder.fail('abc'),
    _.decoder.fail(''),
    _.decoder.fail('abcdefghijklmnopqrstu'),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({ minLength: 10, maxLength: 20 }),
  typeString: 'string<10,20>',
}))()
