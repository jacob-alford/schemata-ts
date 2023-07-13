import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import {
  type SafeDate,
  type SafeDateString,
} from 'schemata-ts/schemables/date/definition'

import { runStandardTestSuite } from '../test-utils/test-suite'

const UnlawfulSchema = S.CamelCaseKeys(
  {
    'prickly-pear': S.FloatFromString(),
    'apple-banana': S.Int(),
    APPLE_BANANA: S.Int(),
    'foo bar baz': S.String(),
    'baz-quux-foo': S.Float(),
    foo_bar_baz: S.Nullable(S.Boolean),
    BAZ_QUUX_FOO: S.DateFromIsoString(),
  },
  'strip',
  'last',
)

test('Unlawful Camelcase types', () => {
  expectTypeOf(UnlawfulSchema).toEqualTypeOf<
    S.Schema<
      {
        'prickly-pear': S.FloatString
        'apple-banana': Integer
        APPLE_BANANA: Integer
        'foo bar baz': string
        'baz-quux-foo': Float
        foo_bar_baz?: boolean | null | undefined
        BAZ_QUUX_FOO: SafeDateString
      },
      {
        pricklyPear: Float
        appleBanana: Integer
        fooBarBaz: string | boolean | null | undefined
        bazQuuxFoo: Float | SafeDate
      }
    >
  >()
})

const expectedTypeString = `{
    APPLE_BANANA: Integer,
    BAZ_QUUX_FOO: IsoDateTimeStringZ,
    apple-banana: Integer,
    baz-quux-foo: Float,
    foo bar baz: string,
    foo_bar_baz?: null | boolean?,
    prickly-pear: FloatFromString
} → {
    appleBanana: (:apple-banana)Integer | (:APPLE_BANANA)Integer,
    bazQuuxFoo: (:BAZ_QUUX_FOO)SafeDate | (:baz-quux-foo)Float,
    fooBarBaz: (:foo_bar_baz)null | boolean? | (:foo bar baz)string,
    [prickly-pear->pricklyPear]: Float
}`

runStandardTestSuite(
  UnlawfulSchema,
  _ => ({
    decoderTests: [
      _.decoder.pass(
        {
          APPLE_BANANA: 1,
          BAZ_QUUX_FOO: '2021-01-01T00:00:00.000Z',
          'apple-banana': 2,
          'baz-quux-foo': 3.14,
          'foo bar baz': 'foo',
          foo_bar_baz: null,
          'prickly-pear': '-1234567890.1234567',
        },
        {
          appleBanana: 2,
          bazQuuxFoo: 3.14,
          fooBarBaz: null,
          pricklyPear: -1234567890.1234567,
        },
      ),
    ],
    encoderTests: [
      _.encoder.pass(
        {
          appleBanana: _.c(2),
          bazQuuxFoo: _.c(new Date('2021-01-01T00:00:00.000Z')),
          fooBarBaz: true,
          pricklyPear: _.c(-1234567890.1234567),
        },
        // @ts-expect-error -- no way to make this bijective
        {
          // APPLE_BANANA: _.c(2),
          BAZ_QUUX_FOO: _.c('2021-01-01T00:00:00.000Z'),
          foo_bar_baz: _.c(true),
          'prickly-pear': _.c('-1234567890.1234567'),
          'apple-banana': _.c(2),
          // 'baz-quux-foo': _.c(-1234567890.1234567),
          // 'foo bar baz': _.c(true),
        },
      ),
    ],
    jsonSchema: JS.struct(
      {
        'apple-banana': JS.integer(),
        APPLE_BANANA: JS.integer(),
        'foo bar baz': JS.string(),
        'baz-quux-foo': JS.number(),
        foo_bar_baz: JS.union(JS.nullSchema, JS.booleanSchema),
        BAZ_QUUX_FOO: JS.string({
          pattern:
            '^(((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d|[2]\\d|3[0-1]))|((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2])))|\\d{4}|[+\\x2d]\\d{6})(T| )(((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))\\.(\\d+?)|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))(Z|[+\\x2d]((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d))))$',
        }),
        'prickly-pear': JS.string({
          pattern:
            '^((-\\d{1,308}(\\.\\d*?)?|-\\d{0,308}(\\.\\d+?)?|\\d{1,308}(\\.\\d*?)?|\\d{0,308}(\\.\\d+?)?)(e(\\+?(\\d|[1-8]\\d|9\\d|[1-2]\\d\\d|3(0[0-8]))|-(\\d+?)))?)$',
        }),
      },
      [
        'APPLE_BANANA',
        'BAZ_QUUX_FOO',
        'apple-banana',
        'baz-quux-foo',
        'foo bar baz',
        'prickly-pear',
      ],
    ),
    typeString: expectedTypeString,
  }),
  { skipArbitraryChecks: true },
)()

// ----------------------------------------------

const LawfulSchema = S.CamelCaseKeys(
  {
    'one-two': S.Float(),
    ThreeFour: S.Nullable(S.Boolean),
    FIVE_SIX: S.Boolean,
  },
  'strip',
  'last',
)

test('Lawful Camelcase types', () => {
  expectTypeOf(LawfulSchema).toEqualTypeOf<
    S.Schema<
      {
        'one-two': Float
        ThreeFour?: boolean | null | undefined
        FIVE_SIX: boolean
      },
      {
        oneTwo: Float
        threeFour: boolean | null | undefined
        fiveSix: boolean
      }
    >
  >()
})

const expectedLawfulTypeString = `{
    FIVE_SIX: boolean,
    ThreeFour?: null | boolean?,
    one-two: Float
} → {
    [FIVE_SIX->fiveSix]: boolean,
    [one-two->oneTwo]: Float,
    [ThreeFour->threeFour]: null | boolean?
}`

runStandardTestSuite(LawfulSchema, _ => ({
  decoderTests: [
    _.decoder.pass(
      {
        FIVE_SIX: true,
        ThreeFour: null,
        'one-two': 1234567890.1234567,
      },
      {
        fiveSix: true,
        threeFour: null,
        oneTwo: 1234567890.1234567,
      },
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      {
        fiveSix: true,
        threeFour: _.c(true),
        oneTwo: _.c(-1234567890.1234567),
      },
      {
        FIVE_SIX: true,
        ThreeFour: _.c(true),
        'one-two': _.c(-1234567890.1234567),
      },
    ),
  ],
  jsonSchema: JS.struct(
    {
      'one-two': JS.number(),
      ThreeFour: JS.union(JS.nullSchema, JS.booleanSchema),
      FIVE_SIX: JS.booleanSchema,
    },
    ['FIVE_SIX', 'one-two'],
  ),
  typeString: expectedLawfulTypeString,
}))()
