import { expectTypeOf } from 'expect-type'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import * as Nt from 'schemata-ts/newtype'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

interface TestNt extends Nt.Newtype<'TestNt', Integer<69, 420>> {}

const testIso = Nt.iso<TestNt>()

const Schema_ = S.Struct({
  a: S.NonEmptyArray(S.String()),
  b: S.Newtype(testIso, 'TestNt')(S.Int({ min: 69, max: 420 })),
  c: S.RGB,
})

const Schema = Schema_.omit('c').partial()

const CombinedSchema = S.Annotate({
  title: 'Test Schema',
  description: 'This is a test schema',
  readOnly: true,
})(Schema)

const expectedJsonSchema = JS.annotate({
  title: 'Test Schema',
  description: 'This is a test schema',
  readOnly: true,
})(
  JS.struct({
    a: JS.array({ minItems: 1 })(JS.string()),
    b: JS.integer({ minimum: 69, maximum: 420 }),
  }),
)

const expectedTypeString = `{ a?: Array[1,]<string>?, b?: Integer<69,420>? } → { a: Array[1,]<string>?, b: TestNt? }`

test('types', () => {
  expectTypeOf(CombinedSchema).toEqualTypeOf<
    S.Schema<
      {
        a?: RNEA.ReadonlyNonEmptyArray<string> | undefined
        b?: Integer<69, 420>
      },
      {
        a?: RNEA.ReadonlyNonEmptyArray<string> | undefined
        b?: TestNt | undefined
      }
    >
  >()
})

runStandardTestSuite(CombinedSchema, _ => ({
  decoderTests: [
    _.decoder.pass({ a: ['test'], b: testIso.wrap(_.c(69)) }),
    _.decoder.pass({ a: ['test'] }, { a: ['test'], b: undefined }),
    _.decoder.pass(
      { b: testIso.wrap(_.c(69)) },
      { a: undefined, b: testIso.wrap(_.c(69)) },
    ),
    _.decoder.fail({ a: [] }, () =>
      TC.transcodeErrors(
        TC.errorAtKey(
          'a',
          TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', [])),
          TC.errorAtUnionMember(
            'Array[1,]<string>',
            TC.typeMismatch('Array[1,]<string>', 'Array(0)'),
          ),
        ),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass({ a: ['test'], b: testIso.wrap(_.c(69)) }),
    _.encoder.pass({ a: ['test'], b: undefined }),
    _.encoder.pass({ a: undefined, b: testIso.wrap(_.c(69)) }),
    _.encoder.pass({ a: undefined, b: undefined }),
  ],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()
