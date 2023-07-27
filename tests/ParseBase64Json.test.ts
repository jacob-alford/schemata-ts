import { expectTypeOf } from 'expect-type'
import { type Const } from 'fp-ts/Const'
import * as O from 'fp-ts/Option'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'
import * as JS from 'schemata-ts/JsonSchema'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.ParseBase64Json(
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
        S.Base64,
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
  contentEncoding: 'base64',
  contentSchema: expectedInnerSchema,
})

const expectedTypeString = `Base64 → { age: Integer<0,120>, birthday: Option<Integer<-8640000000000000,8640000000000000>>, isAlive: boolean, name: string }`

const circular: any = {
  name: 'John',
  age: 100n,
  birthday: O.none,
}

circular.isAlive = circular

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      'JTdCJTIybmFtZSUyMiUzQSUyMkpvaG4lMjIlMkMlMjJhZ2UlMjIlM0E0MiUyQyUyMmlzQWxpdmUlMjIlM0ElMjJ0cnVlJTIyJTdE',
      {
        name: 'John',
        age: 42,
        isAlive: true,
        birthday: O.none,
      },
    ),
    _.decoder.pass(
      'JTdCJTIybmFtZSUyMiUzQSUyMkpvaG4lMjIlMkMlMjJhZ2UlMjIlM0E0MiUyQyUyMmlzQWxpdmUlMjIlM0ElMjJ0cnVlJTIyJTJDJTIyYmlydGhkYXklMjIlM0FudWxsJTdE',
      {
        name: 'John',
        age: 42,
        isAlive: true,
        birthday: O.none,
      },
    ),
    _.decoder.pass(
      'JTdCJTIybmFtZSUyMiUzQSUyMkpvaG4lMjIlMkMlMjJhZ2UlMjIlM0E0MiUyQyUyMmlzQWxpdmUlMjIlM0ElMjJ0cnVlJTIyJTJDJTIyYmlydGhkYXklMjIlM0EwJTdE',
      {
        name: 'John',
        age: 42,
        isAlive: true,
        birthday: O.some(new Date(0)),
      },
    ),
    _.decoder.fail(
      'JTdCJTIybmFtZSUyMiUzQSUyMkpvaG4lMjIlMkMlMjJhZ2UlMjIlM0E0MiUyQyUyMmJpcnRoZGF5JTIyJTNBMS41JTdE',
      () =>
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
    _.decoder.fail(
      // eslint-disable-next-line no-useless-escape
      `{\"age\":42,\"birthday\":null,\"isAlive\":\"true\",\"name\":\"John\"}`,
      () =>
        TC.transcodeErrors(
          TC.serializationError(
            'Base64',
            new SyntaxError('Unexpected token j in JSON at position 0'),
            // eslint-disable-next-line no-useless-escape
            `{\"age\":42,\"birthday\":null,\"isAlive\":\"true\",\"name\":\"John\"}`,
          ),
        ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      { name: 'John', age: _.c(42), isAlive: true, birthday: O.none },
      _.c(
        'JTdCJTIyYWdlJTIyJTNBNDIlMkMlMjJiaXJ0aGRheSUyMiUzQW51bGwlMkMlMjJpc0FsaXZlJTIyJTNBJTIydHJ1ZSUyMiUyQyUyMm5hbWUlMjIlM0ElMjJKb2huJTIyJTdE',
      ),
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
