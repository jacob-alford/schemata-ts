import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema1 = S.Struct({
  a: S.String(),
  b: S.Optional(S.String()),
})

const Intersected = Schema1.extend({
  b: S.Optional(S.Natural),
  c: S.String(),
}).readonly()

test('types', () => {
  expectTypeOf(Intersected).toEqualTypeOf<
    S.Schema<
      {
        readonly a: string
        readonly b?: Integer<0> | undefined
        readonly c: string
      },
      {
        readonly a: string
        readonly b: Integer<0> | undefined
        readonly c: string
      }
    >
  >()
})

runStandardTestSuite(Intersected, _ => ({
  decoderTests: [
    _.decoder.pass({
      a: 'banana',
      b: 1,
      c: 'foo',
    }),
    _.decoder.fail(
      {
        a: 'apple',
        b: 'foo',
        c: 'foo',
      },
      () =>
        TC.transcodeErrors(
          TC.errorAtKey(
            'b',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 'foo')),
            TC.errorAtUnionMember('Integer<0,>', TC.typeMismatch('Integer<0,>', 'foo')),
          ),
        ),
    ),
  ],
  encoderTests: [
    _.encoder.pass({
      a: 'banana',
      b: _.c(1),
      c: 'foo',
    }),
  ],
  jsonSchema: {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'integer', minimum: 0 },
      c: { type: 'string' },
    },
    required: ['a', 'c'],
    readOnly: true,
  },
  typeString: '{ a: string, b?: Integer<0,>?, c: string }',
}))()
