import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import { type Schema } from 'schemata-ts/Schema'

import { runStandardTestSuite } from '../test-utils/test-suite'

type One = {
  two: Two
}

type OneOut = {
  two: TwoOut
}

type Two = {
  one?: One | null
}

type TwoOut = {
  one: OneOut | null | undefined
}

const One_: Schema<One, OneOut> = S.Struct({
  two: S.Lazy('two', () => Two_),
})

const Two_ = S.Struct({
  one: S.Nullable(S.Lazy('one', () => One_)),
})

const One = pipe(
  One_,
  S.Annotate({
    references: {
      one: One_,
      two: Two_,
    },
  }),
)

const expectedJsonSchema = JS.annotate({
  references: {
    one: JS.struct(
      {
        two: JS.ref('two'),
      },
      ['two'],
    ),
    two: JS.struct(
      {
        one: JS.union(JS.nullSchema, JS.ref('one')),
      },
      [],
    ),
  },
})(
  JS.struct(
    {
      two: JS.ref('two'),
    },
    ['two'],
  ),
)

runStandardTestSuite(
  One,
  _ => ({
    decoderTests: [
      _.decoder.pass({
        two: {
          one: null,
        },
      }),
      _.decoder.pass({
        two: {
          one: {
            two: {
              one: null,
            },
          },
        },
      }),
    ],
    encoderTests: [],
    guardTests: [],
    eqTests: [],
    jsonSchema: expectedJsonSchema,
    typeString: '{\n    two: Lazy<two>\n}',
  }),
  {
    skipArbitraryChecks: true,
  },
)()

runStandardTestSuite(S.Annotate({})(S.Lazy('Float', () => S.Float())), _ => ({
  decoderTests: [
    _.decoder.pass(0),
    _.decoder.pass(1),
    _.decoder.pass(1.1),
    _.decoder.pass(1.1e1),
    _.decoder.pass(1.1e-1),
    _.decoder.pass(1.1e1),
    _.decoder.pass(-1),
    _.decoder.pass(-1.1),
    _.decoder.pass(-1.1e1),
    _.decoder.pass(-1.1e-1),
    _.decoder.pass(-1.1e1),
  ],
  encoderTests: [
    _.decoder.pass(0),
    _.decoder.pass(1),
    _.decoder.pass(1.1),
    _.decoder.pass(1.1e1),
    _.decoder.pass(1.1e-1),
    _.decoder.pass(1.1e1),
    _.decoder.pass(-1),
    _.decoder.pass(-1.1),
    _.decoder.pass(-1.1e1),
    _.decoder.pass(-1.1e-1),
    _.decoder.pass(-1.1e1),
  ] as any,
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.ref('Float'),
  typeString: 'Lazy<Float>',
}))()
