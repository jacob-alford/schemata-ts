import { expectTypeOf } from 'expect-type'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const TestParser = pipe(
  S.String(),
  S.Parse(
    'TestParser',
    E.fromPredicate(
      s => s !== 'apple',
      () => new Error('Received apple!!!'),
    ),
    J.stringify,
  ),
)

const Schema = S.Annotate({ title: 'Parser-Intersection', deprecated: true })(
  S.Intersect(
    S.Struct({
      a: TestParser,
    }),
    S.Record(S.String(), S.String(), 'last'),
  ),
)

const expectedJsonSchema = JS.annotate({
  title: 'Parser-Intersection',
  deprecated: true,
})(
  JS.intersection(JS.record(JS.string()))(
    JS.struct(
      {
        a: JS.string(),
      },
      ['a'],
    ),
  ),
)

const expectedTypeString = `{ a: TestParser } & Record<string, string> → { a: string } & Record<string, string>`

test('types', () => {
  expectTypeOf(Schema).toEqualTypeOf<
    S.Schema<
      {
        a: string
      } & Readonly<Record<string, string>>,
      {
        a: string
      } & Readonly<Record<string, string>>
    >
  >()
})

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass({
      a: 'banana',
      b: 'foo',
    }),
    _.decoder.fail(
      {
        a: 'apple',
        b: 'foo',
      },
      () =>
        TC.transcodeErrors(
          TC.errorAtKey(
            'a',
            TC.serializationError('TestParser', new Error('Received apple!!!'), 'apple'),
          ),
        ),
    ),
  ],
  encoderTests: [],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()

runStandardTestSuite(
  S.Intersect(S.String() as any, S.String() as any),
  () => ({
    decoderTests: [],
    jsonSchema: JS.intersection(JS.string())(JS.string()),
    typeString: 'string & string',
  }),
  {
    skip: ['json-schema-validation', 'transcoder-idempotence', 'arbitrary-guard'],
  },
)()
