import { expectTypeOf } from 'expect-type'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Struct({
  a: S.String(),
  b: S.Number,
  c: S.Boolean,
  d: S.OptionFromNullable(S.DateFromInt),
})

const PickedStrip = Schema.pick('a', 'd')

test('Picked Strip types', () => {
  expectTypeOf(PickedStrip).toMatchTypeOf<
    S.Schema<
      {
        a: string
        d?: Integer<-8640000000000000, 8640000000000000> | null | undefined
      },
      {
        a: string
        d: O.Option<NonNullable<SafeDate>>
      }
    >
  >()
})

runStandardTestSuite(PickedStrip, _ => ({
  decoderTests: [
    _.decoder.pass({ a: 'a', b: 1, c: true, d: 1 }, { a: 'a', d: O.some(new Date(1)) }),
    _.decoder.pass({ a: 'a', b: 1, c: true, d: null }, { a: 'a', d: O.none }),
    _.decoder.pass({ a: 'a' }, { a: 'a', d: O.none }),
    _.decoder.fail({}, () =>
      TC.transcodeErrors(TC.errorAtKey('a', TC.typeMismatch('string', undefined))),
    ),
    _.decoder.pass(
      { a: 'a', b: NaN, c: Infinity, d: 1 },
      { a: 'a', d: O.some(new Date(1)) },
    ),
  ],
  encoderTests: [
    _.encoder.pass({ a: 'a', d: O.some(_.c(new Date(1))) }, { a: 'a', d: _.c(1) }),
    _.encoder.pass({ a: 'a', d: O.none }, { a: 'a', d: null }),
  ],
}))()
