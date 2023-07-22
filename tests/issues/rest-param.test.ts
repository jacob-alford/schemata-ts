import { expectTypeOf } from 'expect-type'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import * as JS from 'schemata-ts/JsonSchema'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../../test-utils/test-suite'

// based on an example by @Ethan826:
// https://github.com/jacob-alford/schemata-ts/blob/b4a8255dc586c81483367cc1ec6a0f72256d5952/tests/schemables/WithStructM.test.ts#L860

// This is technically not a valid typescript struct,
// but it works for purposes of validation, and produces lawful artifacts
const WithRestParam = S.Struct(
  { date: S.OptionFromNullable(S.DateFromUnixTime) },
  S.OptionFromNullable(S.String()),
)

test('Struct types', () => {
  expectTypeOf(WithRestParam).toEqualTypeOf<
    S.Schema<
      {
        [x: string]: string | null | undefined
        // @ts-expect-error -- key signature is supposed to extend the union of all other keys
        date?: Float<-8640000000000, 8640000000000> | null | undefined
      },
      {
        [x: string]: O.Option<string>
        // @ts-expect-error -- key signature is supposed to extend the union of all other keys
        date: O.Option<NonNullable<SafeDate>>
      }
    >
  >()
})

runStandardTestSuite(WithRestParam, _ => ({
  jsonSchema: JS.struct(
    {
      date: JS.union(
        JS.nullSchema,
        JS.number({ minimum: S.minUnixTime, maximum: S.maxUnixTime }),
      ),
    },
    [],
    JS.union(JS.nullSchema, JS.string()),
  ),
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
    _.decoder.pass(
      { date: 367722000, catdog: null },
      {
        date: O.some(new Date(367722000 * 1000)),
        catdog: O.none,
      },
    ),
    _.decoder.pass(
      { date: null, catdog: null },
      {
        date: O.none,
        catdog: O.none,
      },
    ),
    _.decoder.fail({ date: '367722000', catdog: null }, () =>
      TC.transcodeErrors(
        TC.errorAtKey(
          'date',
          TC.errorAtUnionMember('null', TC.typeMismatch('null', '367722000')),
          TC.errorAtUnionMember(
            'Float<-8640000000000,8640000000000>?',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', '367722000')),
            TC.errorAtUnionMember(
              'Float<-8640000000000,8640000000000>',
              TC.typeMismatch('Float<-8640000000000,8640000000000>', '367722000'),
            ),
          ),
        ),
      ),
    ),
    _.decoder.fail({ date: 367722000, catdog: 367722000 }, () =>
      TC.transcodeErrors(
        TC.errorAtKey(
          'catdog',
          TC.errorAtUnionMember('null', TC.typeMismatch('null', 367722000)),
          TC.errorAtUnionMember(
            'string?',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 367722000)),
            TC.errorAtUnionMember('string', TC.typeMismatch('string', 367722000)),
          ),
        ),
      ),
    ),
    _.decoder.fail({ date: '367722000', catdog: 367722000 }, () =>
      TC.transcodeErrors(
        TC.errorAtKey(
          'date',
          TC.errorAtUnionMember('null', TC.typeMismatch('null', '367722000')),
          TC.errorAtUnionMember(
            'Float<-8640000000000,8640000000000>?',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', '367722000')),
            TC.errorAtUnionMember(
              'Float<-8640000000000,8640000000000>',
              TC.typeMismatch('Float<-8640000000000,8640000000000>', '367722000'),
            ),
          ),
        ),
        TC.errorAtKey(
          'catdog',
          TC.errorAtUnionMember('null', TC.typeMismatch('null', 367722000)),
          TC.errorAtUnionMember(
            'string?',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 367722000)),
            TC.errorAtUnionMember('string', TC.typeMismatch('string', 367722000)),
          ),
        ),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        dog: O.some('cat'),
      }),
      _.c({
        date: _.c(367722000),
        dog: 'cat',
      }),
    ),
    _.encoder.pass(
      _.c({
        date: O.none,
        catdog: O.some('what'),
      }),
      _.c({
        date: null,
        catdog: 'what',
      }),
    ),
    _.encoder.pass(
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        catdog: O.none,
      }),
      _.c({
        date: _.c(367722000),
        catdog: null,
      }),
    ),
    _.encoder.pass(
      _.c({
        date: O.none,
        catdog: O.none,
      }),
      _.c({
        date: null,
        catdog: null,
      }),
    ),
  ],
  eqTests: [
    _.eq.equate(
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        foo: O.some('cat'),
        bar: O.some('dog'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        foo: O.some('cat'),
        bar: O.some('dog'),
      }),
    ),
    _.eq.disequate(
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        dog: O.some('cat'),
        bar: O.some('cat'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        dog: O.some('dog'),
        bar: O.some('cat'),
      }),
    ),
    _.eq.disequate(
      _.c({
        date: O.some(_.c(new Date(367722000 * 100))),
        dog: O.some('cat'),
        bar: O.some('cat'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        dog: O.some('cat'),
        bar: O.none,
      }),
    ),
    _.eq.disequate(
      _.c({ date: O.none, dog: O.some('cat'), foo: O.some('cat') }),
      _.c({ date: O.none, cat: O.some('cat'), bar: O.some('dog') }),
    ),
    _.eq.disequate(
      _.c({ date: O.none, dog: O.some('cat'), foo: O.some('cat') }),
      _.c({ date: O.none, dog: O.some('cat'), foo: O.some('cat'), bar: O.some('dog') }),
    ),
  ],
  semigroupTests: [
    _.semigroup.combinesFirst(
      _.c({
        date: O.some(_.c(new Date(367722000 * 100))),
        foo: O.some('cat'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        bar: O.some('dog'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 100))),
        foo: O.some('cat'),
        bar: O.some('dog'),
      }),
    ),
    _.semigroup.combinesLast(
      _.c({
        date: O.some(_.c(new Date(367722000 * 100))),
        foo: O.some('cat'),
        quux: O.some('quux'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        bar: O.some('dog'),
        quux: O.some('quux2'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        foo: O.some('cat'),
        bar: O.some('dog'),
        quux: O.some('quux2'),
      }),
    ),
    _.semigroup.combinesWith({ fallback: 'last', string: Str.Semigroup })(
      _.c({
        date: O.some(_.c(new Date(367722000 * 100))),
        foo: O.some('cat'),
        quux: O.some('quux'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        bar: O.some('dog'),
        quux: O.some('quux2'),
      }),
      _.c({
        date: O.some(_.c(new Date(367722000 * 1000))),
        foo: O.some('cat'),
        bar: O.some('dog'),
        quux: O.some('quux2'),
      }),
    ),
  ],
  typeString:
    '{ [i: string]: null | string?, date?: null | Float<-8640000000000,8640000000000>? } → { [i: string]: Option<string>, date: Option<Date> }',
}))()
