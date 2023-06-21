import { expectTypeOf } from 'expect-type'
import type * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import {
  type SafeDate,
  type SafeDateString,
} from 'schemata-ts/schemables/date/definition'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Struct({
  a: S.Nullable(S.String()),
  b: S.Number,
  c: S.Boolean,
  d: S.DateFromUnixTime,
  e: S.Optional(S.Int({ min: 0, max: 2 })),
  f: S.Union('Optional Transitivity')(
    S.String(),
    S.Number,
    S.OptionFromNullable(S.DateFromString()),
  ),
})

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
        d: Date
        e: Integer<0, 2> | undefined
        f: string | Float | O.Option<NonNullable<SafeDate>>
      }
    >
  >()
})

runStandardTestSuite('Struct', Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      { a: 'a', b: 1, c: true, d: 1, e: 1, f: 'a' },
      { a: 'a', b: 1, c: true, d: new Date(1000), e: 1, f: 'a' },
    ),
  ],
  encoderTests: [],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.struct(
    {
      a: JS.union(JS.nullSchema, JS.string()),
      b: JS.number(),
      c: JS.booleanSchema,
      d: JS.number({ minimum: S.minUnixTime, maximum: S.maxUnixTime }),
      e: JS.integer({ minimum: 0, maximum: 2 }),
      f: JS.union(
        JS.string(),
        JS.number(),
        JS.union(JS.nullSchema, JS.string({ format: 'date' })),
      ),
    },
    ['b', 'c', 'd'],
  ),
}))()
