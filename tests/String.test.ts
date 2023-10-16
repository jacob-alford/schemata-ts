import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Branded } from 'schemata-ts/brand'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.String(), _ => ({
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

runStandardTestSuite(S.String({ minLength: 10 }), _ => ({
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

runStandardTestSuite(S.String({ maxLength: 10 }), _ => ({
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

runStandardTestSuite(S.String({ minLength: 10, maxLength: 20 }), _ => ({
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

interface TestBrand_ {
  readonly Brand: unique symbol
}

const TestTBase = S.String().minLength(1).maxLength(5).errorName('TestT')

test('string-transformations', () => {
  expectTypeOf(TestTBase).toMatchTypeOf<S.Schema<string>>()
})

const TestT = TestTBase.brand<TestBrand_>()

test('.brand()', () => {
  expectTypeOf(TestT).toEqualTypeOf<
    S.Schema<Branded<string, TestBrand_>, Branded<string, TestBrand_>>
  >()
})

runStandardTestSuite(TestT, _ => ({
  decoderTests: [
    _.decoder.pass('abcd'),
    _.decoder.fail('', () => TC.transcodeErrors(TC.typeMismatch('TestT', ''))),
    _.decoder.fail('abcdef', _ => TC.transcodeErrors(TC.typeMismatch('TestT', _))),
  ],
}))()
