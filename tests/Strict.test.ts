import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Strict({
  a: S.String(),
  b: S.Optional(S.Float()),
  c: S.Boolean,
})

test('Strict types', () => {
  expectTypeOf(Schema).toEqualTypeOf<
    S.Schema<
      {
        a: string
        b?: Float | undefined
        c: boolean
      },
      {
        a: string
        b: Float | undefined
        c: boolean
      }
    >
  >()
})

const expectedJsonSchema = JS.struct(
  {
    a: JS.string(),
    b: JS.number(),
    c: JS.booleanSchema,
  },
  ['a', 'c'],
  false,
)

const expectedTypeString = `{ a: string, b?: Float?, c: boolean } → { a: string, b: Float?, c: boolean }`

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass({ a: 'a', b: 1, c: true }),
    _.decoder.pass({ a: 'a', c: true }, { a: 'a', b: undefined, c: true }),
    _.decoder.fail({ a: 'a', b: 1, c: true, d: 1 }, () =>
      TC.transcodeErrors(TC.errorAtKey('d', TC.unexpectedValue(1))),
    ),
    _.decoder.fail(NaN, () =>
      TC.transcodeErrors(TC.typeMismatch('{ a: string, b?: Float?, c: boolean }', NaN)),
    ),
    _.decoder.fail(null, () =>
      TC.transcodeErrors(TC.typeMismatch('{ a: string, b?: Float?, c: boolean }', null)),
    ),
    _.decoder.fail([], () =>
      TC.transcodeErrors(TC.typeMismatch('{ a: string, b?: Float?, c: boolean }', [])),
    ),
  ],
  encoderTests: [_.encoder.pass({ a: 'a', b: _.c(1), c: true })],
  guardTests: [_.guard.isNot({ a: 'a', b: _.c(1), c: true, d: NaN })],
  semigroupTests: [
    _.semigroup.combinesFirst(
      { a: 'a', b: _.c(null), c: true },
      { a: 'a', b: _.c(undefined), c: false },
      { a: 'a', b: _.c(null), c: true },
    ),
    _.semigroup.combinesWith({ fallback: 'first' })(
      { a: 'a', b: _.c(null), c: true },
      { a: 'a', b: _.c(undefined), c: false },
      { a: 'a', b: _.c(null), c: true },
    ),
    _.semigroup.combinesLast(
      { a: 'a', b: _.c(null), c: true },
      { a: 'a', b: _.c(undefined), c: false },
      { a: 'a', b: _.c(undefined), c: false },
    ),
    _.semigroup.combinesWith()(
      { a: 'a', b: _.c(null), c: true },
      { a: 'a', b: _.c(undefined), c: false },
      { a: 'a', b: _.c(undefined), c: false },
    ),
  ],
  eq: [
    _.eq.disequate(
      { a: _.c({}), b: _.c({}), c: _.c({}) },
      { a: _.c({}), b: _.c({}), c: _.c({}) },
    ),
  ],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()

runStandardTestSuite(S.Strict({}), () => ({
  jsonSchema: JS.struct({}, [], false),
  typeString: `{}`,
}))()
