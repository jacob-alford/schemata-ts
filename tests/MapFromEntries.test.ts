import { expectTypeOf } from 'expect-type'
import * as Str from 'fp-ts/string'
import * as S from 'schemata-ts'
import { type Float } from 'schemata-ts/float'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.MapFromEntries(
  Str.Ord,
  S.CamelCaseString(),
  S.Tuple(S.BooleanFromNumber, S.IntFromString),
  'first',
)

test('MapFromEntry types', () => {
  expectTypeOf(Schema).toEqualTypeOf<
    S.Schema<
      ReadonlyArray<readonly [S.CamelCase, readonly [Float, S.IntString]]>,
      ReadonlyMap<S.CamelCase, readonly [boolean, Integer]>
    >
  >()
})

const jsonSchema = JS.array()(
  JS.tuple(
    JS.string(),
    JS.tuple(
      JS.number(),
      JS.string({
        pattern: '^((0b)[0-1]{1,53}|(0o)[0-7]{1,18}|-?\\d{1,16}|(0x)[0-9A-Fa-f]{1,14})$',
      }),
    ),
  ),
)

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      [
        ['foo-bar', [1.1, '1']],
        ['FOO_BAR', [1, '0']],
        ['baz_quuux', [0, '0']],
      ],
      new Map([
        ['fooBar', [true, 1]],
        ['bazQuuux', [false, 0]],
      ]),
    ),
    _.decoder.fail(
      [
        ['foo-bar', [1.1, '1']],
        ['FOO_BAR', [0, '0']],
        ['baz_quuux', [0, 'abc']],
      ],
      () =>
        TC.transcodeErrors(
          TC.errorAtIndex(
            2,
            TC.errorAtIndex(1, TC.errorAtIndex(1, TC.typeMismatch('IntString', 'abc'))),
          ),
        ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      _.c(
        new Map([
          ['fooBar', [true, 1]],
          ['fooBar', [false, 0]],
          ['bazQuuux', [false, 0]],
        ]),
      ),
      _.c([
        ['bazQuuux', [0, '0']],
        ['fooBar', [0, '0']],
      ]),
    ),
  ],
  jsonSchema,
  typeString: 'Array<[string,[Float, IntString]]> → Map<string,[boolean, Integer]>',
}))()
