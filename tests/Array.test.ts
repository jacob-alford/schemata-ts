import { expectTypeOf } from 'expect-type'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  S.Array(S.Tuple(S.Float({ min: 0, max: 4 }), S.BigIntFromString), {
    minLength: 1,
    maxLength: 4,
  }),
  _ => ({
    decoderTests: [
      _.decoder.pass(
        [
          [0, '0'],
          [1, '1'],
          [2, '2'],
          [3, '3'],
        ],
        [
          [0, 0n],
          [1, 1n],
          [2, 2n],
          [3, 3n],
        ],
      ),
      _.decoder.fail('not-an-array', () =>
        TC.transcodeErrors(
          TC.typeMismatch('Array[1,4]<[Float<0,4>, BigIntString]>', 'not-an-array'),
        ),
      ),
      _.decoder.fail(['not-a-tuple'], () =>
        TC.transcodeErrors(
          TC.errorAtIndex(
            0,
            TC.typeMismatch('[Float<0,4>, BigIntString]', 'not-a-tuple'),
          ),
        ),
      ),
      _.decoder.fail([[]], () =>
        TC.transcodeErrors(
          TC.errorAtIndex(0, TC.typeMismatch('[Float<0,4>, BigIntString]', [])),
        ),
      ),
      _.decoder.fail([], () =>
        TC.transcodeErrors(
          TC.typeMismatch('Array[1,4]<[Float<0,4>, BigIntString]>', 'Array(0)'),
        ),
      ),
      _.decoder.fail(
        [
          [0, '0'],
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
          [5, '5'],
        ],
        () =>
          TC.transcodeErrors(
            TC.typeMismatch('Array[1,4]<[Float<0,4>, BigIntString]>', 'Array(6)'),
            TC.errorAtIndex(5, TC.errorAtIndex(0, TC.typeMismatch('Float<0,4>', 5))),
          ),
      ),
    ],
    encoderTests: [_.encoder.pass([[_.c(0), 0n]], [[_.c(0), _.c('0')]])],
    semigroupTests: [
      _.semigroup.combinesFirst(
        [[_.c(0), 0n]],
        [[_.c(1), 1n]],
        [
          [_.c(0), 0n],
          [_.c(1), 1n],
        ],
      ),
    ],
    jsonSchema: JS.array({ minItems: 1, maxItems: 4 })(
      JS.tuple(
        JS.number({ minimum: 0, maximum: 4 }),
        JS.string({ pattern: '^((0b)[0-1]+?|(0o)[0-7]+?|-?\\d+?|(0x)[0-9A-Fa-f]+?)$' }),
      ),
    ),
    typeString:
      'Array[1,4]<[Float<0,4>, BigIntString]> → Array[1,4]<[Float<0,4>, bigint]>',
  }),
)()

runStandardTestSuite(S.Array(S.Union(S.Natural, S.String())), _ => ({
  encoderTests: [
    _.encoder.fail([_.c({})], () =>
      TC.transcodeErrors(
        TC.errorAtIndex(
          0,
          TC.errorAtUnionMember('Integer<0,>', TC.typeMismatch('Integer<0,>', {})),
          TC.errorAtUnionMember('string', TC.typeMismatch('string', {})),
        ),
      ),
    ),
  ],
  jsonSchema: JS.array()(JS.union(JS.integer({ minimum: 0 }), JS.string())),
  typeString: 'Array<Integer<0,> | string>',
}))()

runStandardTestSuite(S.Tuple(), () => ({
  typeString: '[]',
  jsonSchema: JS.tuple(),
}))()

const SchemaModiferTest_ = S.Array(S.Natural).maxLength(5)

test('SchemaModiferTest_', () => {
  expectTypeOf(SchemaModiferTest_).toMatchTypeOf<S.Schema<ReadonlyArray<Integer<0>>>>()
})

const SchemaModiferTest = SchemaModiferTest_.nonEmpty()

test('SchemaModiferTest', () => {
  expectTypeOf(SchemaModiferTest).toMatchTypeOf<
    S.Schema<RNEA.ReadonlyNonEmptyArray<Integer<0>>>
  >()
})

runStandardTestSuite(SchemaModiferTest, _ => ({
  decoderTests: [
    _.decoder.pass([0]),
    _.decoder.pass([1, 2, 3, 4, 5]),
    _.decoder.fail([1, 2, 3, 4, 5, 6], () =>
      TC.transcodeErrors(TC.typeMismatch('Array[1,5]<Integer<0,>>', 'Array(6)')),
    ),
  ],
}))()
