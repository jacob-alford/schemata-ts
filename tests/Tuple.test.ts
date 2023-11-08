import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const SchemaBase = S.Tuple(S.String(), S.Natural)

const Schema = SchemaBase.prepend(S.Boolean).append(S.String())

test('Tuple Types', () => {
  expectTypeOf(Schema).toMatchTypeOf<
    S.Schema<readonly [boolean, string, Integer<0>, string]>
  >()
})

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass([true, 'foo', 1, 'bar']),
    _.decoder.fail(['a', 1], () =>
      TC.transcodeErrors(
        TC.typeMismatch('[boolean, string, Integer<0,>, string]', ['a', 1]),
      ),
    ),
  ],
  jsonSchema: JS.tuple(
    JS.booleanSchema,
    JS.string(),
    JS.integer({ minimum: 0 }),
    JS.string(),
  ),
  jsonSchema2020: {
    type: 'array',
    prefixItems: [JS.booleanSchema, JS.string(), JS.integer({ minimum: 0 }), JS.string()],
    items: false,
    maxItems: 4,
    minItems: 4,
  },
  typeString: '[boolean, string, Integer<0,>, string]',
}))()
