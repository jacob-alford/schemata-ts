import { expectTypeOf } from 'expect-type'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'

import { runStandardTestSuite } from '../../test-utils/test-suite'

// based on: https://github.com/jacob-alford/schemata-ts/blob/b4a8255dc586c81483367cc1ec6a0f72256d5952/tests/schemables/WithStructM.test.ts#L860

const WithRestParam = S.Struct(
  { date: S.OptionFromNullable(S.DateFromUnixTime) },
  S.OptionFromNullable(S.String()),
)

test('Struct types', () => {
  expectTypeOf(WithRestParam).toEqualTypeOf<
    S.Schema<
      {
        [x: string]: string | null | undefined
        // @ts-expect-error -- A desirable feature that doesn't make a ton of sense
        date?: Float<-8640000000000, 8640000000000> | null | undefined
      },
      {
        [x: string]: O.Option<string>
        // @ts-expect-error -- A desirable feature that doesn't make a ton of sense
        date: O.Option<NonNullable<SafeDate>>
      }
    >
  >()
})

runStandardTestSuite(WithRestParam, _ => ({
  decoderTests: [
    _.decoder.pass(
      { date: 367722000, dog: 'cat' },
      {
        date: O.some(new Date(367722000 * 1000)),
        dog: O.some('cat'),
      },
    ),
    _.decoder.pass(
      { date: null, catdog: 'what' },
      {
        date: O.none,
        catdog: O.some('what'),
      },
    ),
  ],
}))()
