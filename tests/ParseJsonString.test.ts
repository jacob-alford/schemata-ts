import { expectTypeOf } from 'expect-type'
import { type Const } from 'fp-ts/Const'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import { type JsonString } from 'schemata-ts/schemables/parser/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.ParseJsonString(
  S.Struct({
    name: S.String(),
    age: S.Int({ min: 0, max: 120 }),
    isAlive: S.BooleanFromString,
    birthday: S.OptionFromNullable(S.DateFromInt),
  }),
)

test('Parser types', () => {
  expectTypeOf(Schema).toEqualTypeOf<
    S.Schema<
      Const<
        JsonString,
        {
          name: string
          age: Integer<0, 120>
          isAlive: string
          birthday?: Integer<-8640000000000000, 8640000000000000> | null | undefined
        }
      >,
      {
        name: string
        age: Integer<0, 120>
        isAlive: boolean
        birthday: O.Option<SafeDate>
      }
    >
  >()
})

const expectedInnerSchema = JS.struct(
  {
    name: JS.string(),
    age: JS.integer({ minimum: 0, maximum: 120 }),
    isAlive: JS.string({ pattern: '^((true)|(false))$' }),
    birthday: JS.union(
      JS.nullSchema,
      JS.integer({ minimum: -8640000000000000, maximum: 8640000000000000 }),
    ),
  },
  ['age', 'isAlive', 'name'],
)

const expectedJsonSchema = JS.string({
  contentMediaType: 'application/json',
  contentSchema: expectedInnerSchema,
})

const expectedTypeString = `{ age: Integer<0,120>, birthday?: null | Integer<-8640000000000000,8640000000000000>?, isAlive: 'true' | 'false', name: string } → { age: Integer<0,120>, birthday: Option<Integer<-8640000000000000,8640000000000000>>, isAlive: boolean, name: string }`

const circular: any = {
  name: 'John',
  age: 100n,
  birthday: O.none,
}

circular.isAlive = circular

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass('{"name":"John","age":42,"isAlive":"true"}', {
      name: 'John',
      age: 42,
      isAlive: true,
      birthday: O.none,
    }),
    _.decoder.pass('{"name":"John","age":42,"isAlive":"true","birthday":null}', {
      name: 'John',
      age: 42,
      isAlive: true,
      birthday: O.none,
    }),
    _.decoder.pass('{"name":"John","age":42,"isAlive":"true","birthday":0}', {
      name: 'John',
      age: 42,
      isAlive: true,
      birthday: O.some(new Date(0)),
    }),
    _.decoder.fail('{"name":"John","age":42,"birthday":1.5}', () =>
      TC.transcodeErrors(
        TC.errorAtKey(
          'birthday',
          TC.errorAtUnionMember('null', TC.typeMismatch('null', 1.5)),
          TC.errorAtUnionMember(
            'Integer<-8640000000000000,8640000000000000>?',
            TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 1.5)),
            TC.errorAtUnionMember(
              'Integer<-8640000000000000,8640000000000000>',
              TC.typeMismatch('Integer<-8640000000000000,8640000000000000>', 1.5),
            ),
          ),
        ),
        TC.errorAtKey('isAlive', TC.typeMismatch("'true' | 'false'", undefined)),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      { name: 'John', age: _.c(42), isAlive: true, birthday: O.none },
      // eslint-disable-next-line no-useless-escape
      _.c(`{\"age\":42,\"birthday\":null,\"isAlive\":\"true\",\"name\":\"John\"}`),
    ),
    _.encoder.fail(circular, () =>
      TC.transcodeErrors(
        TC.errorAtKey('age', TC.typeMismatch('Integer<0,120>', 100n)),
        TC.errorAtKey('isAlive', TC.typeMismatch("'true' | 'false'", circular)),
      ),
    ),
  ],
  jsonSchema: expectedJsonSchema,
  typeString: expectedTypeString,
}))()
