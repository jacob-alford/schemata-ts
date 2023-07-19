import { expectTypeOf } from 'expect-type'
import { type Const } from 'fp-ts/Const'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import {
  type SafeDate,
  type SafeDateString,
} from 'schemata-ts/schemables/date/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Struct({
  a: S.Nullable(S.String()),
  b: S.Number,
  c: S.Boolean,
  d: S.DateFromUnixTime,
  e: S.Optional(S.Int({ min: 0, max: 2 })),
  f: S.Union(S.String(), S.Number, S.OptionFromNullable(S.DateFromString())),
})

const expectedJsonSchema: Const<JS.JsonSchema, S.InputOf<typeof Schema>> = JS.struct(
  {
    a: JS.union(JS.nullSchema, JS.string()),
    b: JS.number(),
    c: JS.booleanSchema,
    d: JS.number({ minimum: S.minUnixTime, maximum: S.maxUnixTime }),
    e: JS.integer({ minimum: 0, maximum: 2 }),
    f: JS.union(
      JS.string(),
      JS.number(),
      JS.union(
        JS.nullSchema,
        JS.union(JS.string({ format: 'date-time' }), JS.string({ format: 'date' })),
      ),
    ),
  },
  ['b', 'c', 'd'],
)

const expectedTypeString =
  //
  `{ a?: null | string?, b: Float, c: boolean, d: Float<-8640000000000,8640000000000>, e?: Integer<0,2>?, f?: string | Float | null | DateString? } → { a: null | string?, b: Float, c: boolean, d: Date, e: Integer<0,2>?, f: string | Float | Option<Date> }`

test('Struct types', () => {
  expectTypeOf(Schema).toEqualTypeOf<
    S.Schema<
      {
        a?: string | null | undefined
        b: Float
        c: boolean
        d: Float<S.MinUnixTime, S.MaxUnixTime>
        e?: Integer<0, 2> | undefined
        f?: string | Float | SafeDateString | null | undefined
      },
      {
        a: string | null | undefined
        b: Float
        c: boolean
        d: SafeDate
        e: Integer<0, 2> | undefined
        f: string | Float | O.Option<NonNullable<SafeDate>>
      }
    >
  >()
})

const testDate = new Date() as SafeDate

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      {
        a: 'a',
        b: 1,
        c: true,
        d: 1,
        e: 1,
        f: 'a',
        __proto__: { 'who-cares': 'extra-param' },
      },
      { a: 'a', b: 1, c: true, d: new Date(1000), e: 1, f: 'a' },
    ),
    _.decoder.pass(
      { b: Number.MAX_VALUE, c: false, d: S.maxUnixTime },
      {
        a: undefined,
        b: Number.MAX_VALUE,
        c: false,
        d: new Date(S.maxUnixTime * 1000),
        e: undefined,
        f: O.none,
      },
    ),
    _.decoder.pass(
      {
        a: undefined,
        b: Number.MIN_VALUE,
        c: false,
        d: S.minUnixTime,
        e: 0,
        f: 'September 13, 1995',
      },
      {
        a: undefined,
        b: Number.MIN_VALUE,
        c: false,
        d: new Date(S.minUnixTime * 1000),
        e: 0,
        f: O.some(new Date('September 13, 1995')),
      },
    ),
    _.decoder.fail(
      {
        a: null,
        b: NaN,
        c: 0,
        d: Number.MAX_VALUE,
        e: undefined,
        f: 'September 13, 1995',
      },
      () =>
        TC.transcodeErrors(
          TC.errorAtKey('b', TC.typeMismatch('Float', NaN)),
          TC.errorAtKey('c', TC.typeMismatch('boolean', 0)),
          TC.errorAtKey(
            'd',
            TC.typeMismatch('Float<-8640000000000,8640000000000>', Number.MAX_VALUE),
          ),
        ),
    ),
    _.decoder.fail(
      {
        a: 0o777,
        b: 0x1fffffffffffff,
        c: null,
        d: 0,
        e: 0b01,
        f: NaN,
      },
      () =>
        TC.transcodeErrors(
          TC.errorAtKey(
            'a',
            TC.errorAtUnionMember('null', TC.typeMismatch('null', 511)),
            TC.errorAtUnionMember(
              'string?',
              TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 511)),
              TC.errorAtUnionMember('string', TC.typeMismatch('string', 511)),
            ),
          ),
          TC.errorAtKey('c', TC.typeMismatch('boolean', null)),
          TC.errorAtKey(
            'f',
            TC.errorAtUnionMember(
              'null | DateString?',
              TC.errorAtUnionMember('null', TC.typeMismatch('null', NaN)),
              TC.errorAtUnionMember(
                'DateString?',
                TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', NaN)),
                TC.errorAtUnionMember('DateString', TC.typeMismatch('DateString', NaN)),
              ),
            ),
            TC.errorAtUnionMember('string', TC.typeMismatch('string', NaN)),
            TC.errorAtUnionMember('Float', TC.typeMismatch('Float', NaN)),
          ),
        ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      {
        a: null,
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: O.none,
      },
      {
        a: null,
        b: Number.MAX_VALUE as Float,
        c: true,
        d: (testDate.getTime() / 1000) as Float<S.MinUnixTime, S.MaxUnixTime>,
        e: undefined,
        f: null,
      },
    ),
    _.encoder.pass(
      {
        a: 'a',
        b: Number.MIN_VALUE as Float,
        c: false,
        d: testDate,
        e: 2 as Integer<0, 2>,
        f: O.some(testDate as SafeDate),
      },
      {
        a: 'a',
        b: Number.MIN_VALUE as Float,
        c: false,
        d: (testDate.getTime() / 1000) as Float<S.MinUnixTime, S.MaxUnixTime>,
        e: 2 as Integer<0, 2>,
        f: testDate.toISOString(),
      },
    ),
    _.encoder.pass(
      {
        a: undefined,
        b: 0 as Float,
        c: false,
        d: testDate,
        e: undefined,
        f: Math.PI as Float,
      },
      {
        a: undefined,
        b: 0 as Float,
        c: false,
        d: (testDate.getTime() / 1000) as Float<S.MinUnixTime, S.MaxUnixTime>,
        e: undefined,
        f: Math.PI as Float,
      },
    ),
    _.encoder.pass(
      {
        a: null,
        b: Math.E as Float,
        c: true,
        d: testDate,
        e: 1 as Integer<0, 2>,
        f: 'Hello!',
      },
      {
        a: null,
        b: Math.E as Float,
        c: true,
        d: (testDate.getTime() / 1000) as Float<S.MinUnixTime, S.MaxUnixTime>,
        e: 1 as Integer<0, 2>,
        f: 'Hello!',
      },
    ),
  ],
  guardTests: [],
  eqTests: [
    _.eq.disequate(
      {
        a: 'a',
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: 'a',
      },
      {
        a: 'a',
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: O.none,
      },
    ),
    _.eq.disequate(
      {
        a: null,
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: O.some(testDate as SafeDate),
      },
      {
        a: null,
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: Math.PI as Float,
      },
    ),
    _.eq.disequate(
      {
        a: 'a',
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: 'Hello!!',
      },
      {
        a: 'a',
        b: Number.MAX_VALUE as Float,
        c: true,
        d: testDate,
        e: undefined,
        f: Math.E as Float,
      },
    ),
  ],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()
