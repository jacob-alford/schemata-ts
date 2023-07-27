import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const NotMutex = S.Union(
  S.Strict({
    a: S.String(),
    b: S.Nullable(S.Int()),
    c: S.DateFromInt,
  }),
  S.Strict({
    a: S.EmailAddress,
    c: S.DateFromUnixTime,
  }),
)

test('Struct types', () => {
  expectTypeOf(NotMutex).toEqualTypeOf<
    S.Schema<
      | {
          a: string
          b?: null | Integer | undefined
          c: Integer<-8640000000000000, 8640000000000000>
        }
      | {
          a: S.EmailAddress
          c: Float<-8640000000000, 8640000000000>
        },
      | {
          a: string
          b: null | Integer | undefined
          c: SafeDate
        }
      | {
          a: S.EmailAddress
          c: SafeDate
        }
    >
  >()
})

const testNumber = 69420
const testDate1 = new Date(testNumber)
const testDate2 = new Date(testNumber * 1000)

runStandardTestSuite(NotMutex, _ => ({
  decoderTests: [
    _.decoder.pass(
      {
        a: 'hello@hello.com',
        c: testNumber,
      },
      {
        a: 'hello@hello.com',
        c: testDate2,
      },
    ),
    _.decoder.pass(
      {
        a: 'not-an-email',
        c: testNumber,
      },
      {
        a: 'not-an-email',
        b: undefined,
        c: testDate1,
      },
    ),
    _.decoder.pass(
      {
        a: 'not-an-email',
        b: 1,
        c: testNumber,
      },
      {
        a: 'not-an-email',
        b: 1,
        c: testDate1,
      },
    ),
    _.decoder.fail({ a: 'hello@hello.com', b: 1, c: Number.MAX_VALUE }, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(
          '{ a: EmailAddress, c: Float<-8640000000000,8640000000000> }',
          TC.errorAtKey('b', TC.unexpectedValue(1)),
          TC.errorAtKey(
            'c',
            TC.typeMismatch('Float<-8640000000000,8640000000000>', Number.MAX_VALUE),
          ),
        ),
        TC.errorAtUnionMember(
          '{ a: string, b?: null | Integer?, c: Integer<-8640000000000000,8640000000000000> }',
          TC.errorAtKey(
            'c',
            TC.typeMismatch(
              'Integer<-8640000000000000,8640000000000000>',
              Number.MAX_VALUE,
            ),
          ),
        ),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      { a: 'not-an-email-address', b: null, c: _.c(testDate1) },
      {
        a: 'not-an-email-address',
        b: null,
        c: testNumber as Integer<-8640000000000000, 8640000000000000>,
      },
    ),
    _.encoder.pass(
      { a: 'hello@hello.com' as S.EmailAddress, c: _.c(testDate2) },
      {
        a: 'hello@hello.com' as S.EmailAddress,
        c: testNumber as Float<-8640000000000, 8640000000000>,
      },
    ),
    _.encoder.fail(_.c({}), () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(
          '{ a: EmailAddress, c: Float<-8640000000000,8640000000000> }',
          TC.typeMismatch(
            '{ a: EmailAddress, c: Float<-8640000000000,8640000000000> }',
            {},
          ),
        ),
        TC.errorAtUnionMember(
          '{ a: string, b?: null | Integer?, c: Integer<-8640000000000000,8640000000000000> }',
          TC.typeMismatch(
            '{ a: string, b?: null | Integer?, c: Integer<-8640000000000000,8640000000000000> }',
            {},
          ),
        ),
      ),
    ),
  ],
  jsonSchema: JS.union(
    JS.struct(
      {
        a: JS.string(),
        b: JS.union(JS.nullSchema, JS.integer()),
        c: JS.integer({
          minimum: -8640000000000000,
          maximum: 8640000000000000,
        }),
      },
      ['a', 'c'],
      false,
    ),
    JS.struct(
      {
        a: JS.string({
          pattern:
            '^(([A-Za-z0-9!#$%&\'*+\\x2d/=?\\x5e_`{|}~]+(\\.[A-Za-z0-9!#$%&\'*+\\x2d/=?\\x5e_`{|}~]+)*|"[^"\\x00-\\x1f]+")@(\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\]|([A-Za-z0-9\\x2d]{0,63}\\.)+[A-Za-z]{2,}))$',
        }),
        c: JS.number({
          minimum: -8640000000000,
          maximum: 8640000000000,
        }),
      },
      ['a', 'c'],
      false,
    ),
  ),
  typeString: `{ a: string, b?: null | Integer?, c: Integer<-8640000000000000,8640000000000000> } | { a: EmailAddress, c: Float<-8640000000000,8640000000000> } → { a: string, b: null | Integer?, c: Integer<-8640000000000000,8640000000000000> } | { a: EmailAddress, c: Date }`,
}))()

runStandardTestSuite(
  S.Union(
    S.Strict({
      a: S.String(),
      b: S.Natural,
    }),
  ),
  _ => ({
    decoderTests: [
      _.decoder.pass({
        a: 'hello',
        b: 1,
      }),
      _.decoder.fail(
        {
          a: 'hello',
          b: 1,
          c: NaN,
        },
        () => TC.transcodeErrors(TC.errorAtKey('c', TC.unexpectedValue(NaN))),
      ),
    ],
    typeString: `{ a: string, b: Integer<0,> }`,
    jsonSchema: JS.union(
      JS.struct(
        {
          a: JS.string(),
          b: JS.integer({
            minimum: 0,
          }),
        },
        ['a', 'b'],
        false,
      ),
    ),
  }),
)()

const beforeDateString = '2024-02-29T00:00:00.000Z'
const beforeDate = new Date(beforeDateString)
const afterDateString = '2020-02-29T00:00:00.000Z'
const afterDate = new Date(afterDateString)

const dateString = `Date<${afterDateString},${beforeDateString}>`

runStandardTestSuite(
  S.Union(
    S.Tuple(S.Literal('tag'), S.Date()),
    S.Tuple(
      S.String(),
      S.Date({
        beforeDate,
        afterDate,
      }),
    ),
  ),
  _ => ({
    decoderTests: [
      _.decoder.fail(['not-tag', new Date(2019, 1, 29, 0, 0, 0, 0)], () =>
        TC.transcodeErrors(
          TC.errorAtUnionMember(
            '[tag, Date]',
            TC.errorAtIndex(0, TC.typeMismatch('tag', 'not-tag')),
          ),
          TC.errorAtUnionMember(
            expect.stringMatching(/\[string, Date<(.*)>\]/),
            TC.errorAtIndex(
              1,
              TC.typeMismatch(dateString, new Date(2019, 1, 29, 0, 0, 0, 0)),
            ),
          ),
        ),
      ),
      _.decoder.pass(['tag', new Date(2019, 1, 14, 0, 0, 0, 0)]),
      _.decoder.pass(['not-tag', new Date(2021, 1, 14, 0, 0, 0, 0)]),
    ],
    jsonSchema: JS.union(
      JS.tuple(JS.literal('tag'), JS.emptySchema),
      JS.tuple(JS.string(), JS.emptySchema),
    ),
    typeString: `[tag, Date] | [string, ${dateString}]`,
  }),
  {
    skip: ['json-schema-validation'],
  },
)()
