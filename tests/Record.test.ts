import * as E from 'fp-ts/Either'
import * as Str from 'fp-ts/string'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Record(
  S.String(),
  S.Struct({
    a: S.ParseEncodedJsonString(E.right, E.right)(S.Struct({ quux: S.Int() })),
    b: S.SetFromArray(Str.Ord)(S.String()),
  }),
)

const expectedJsonSchema = JS.record(
  JS.struct(
    {
      a: JS.string(),
      b: JS.array()(JS.string()),
    },
    ['a', 'b'],
  ),
)

const expectedTypeString = `Record<string, { a: { quux: Integer }, b: Array<string> }>`

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      {
        foo: {
          a: '{"quux": 1}',
          b: ['bar', 'baz', 'bar'],
        },
        bar: {
          a: '{"quux": 2}',
          b: ['foo', 'foo', 'baz'],
        },
      },
      {
        foo: {
          a: { quux: 1 },
          b: new Set(['bar', 'baz']),
        },
        bar: {
          a: { quux: 2 },
          b: new Set(['foo', 'baz']),
        },
      },
    ),
  ],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()
