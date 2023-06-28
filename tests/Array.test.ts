import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  S.Array({ minLength: 1, maxLength: 4 })(
    S.Tuple(S.Float({ min: 0, max: 4 }), S.BigIntFromString()),
  ),
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
      _.decoder.fail([], () =>
        TC.transcodeErrors(
          TC.typeMismatch('Array[1,4]<[Float<0,4>, BigIntString*]>', []),
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
            TC.typeMismatch('Array[1,4]<[Float<0,4>, BigIntString*]>', [
              [0, '0'],
              [1, '1'],
              [2, '2'],
              [3, '3'],
              [4, '4'],
              [5, '5'],
            ]),
          ),
      ),
    ],
    semigroupTests: [
      _.semigroup.combines(
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
      'Array[1,4]<[Float<0,4>, BigIntString*]> → Array[1,4]<[Float<0,4>, bigint]>',
  }),
)()
