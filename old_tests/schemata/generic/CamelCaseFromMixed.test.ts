import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as DE from 'io-ts/DecodeError'
import * as Fsg from 'io-ts/FreeSemigroup'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getDecoder } from 'schemata-ts/Decoder'
import { getEncoder } from 'schemata-ts/Encoder'
import { getEq } from 'schemata-ts/Eq'
import { getGuard } from 'schemata-ts/Guard'
import { getJsonDeserializer } from 'schemata-ts/JsonDeserializer'
import { stripIdentity } from 'schemata-ts/JsonSchema'
import { getJsonSchema } from 'schemata-ts/JsonSchema'
import { getJsonSerializer } from 'schemata-ts/JsonSerializer'
import * as S from 'schemata-ts/schemata'

const TestSchema = S.CamelCaseFromMixed({
  __test: S.String,
  'foo-bar': S.Natural,
  FOO_BAZ: S.OptionFromNullable(S.BooleanFromNumber),
  '_-_-_foo_Qux-----': S.String,
  'foo.baz': S.String,
  'some random sentence': S.Array(S.Ascii),
})

describe('CamelCaseFromMixed', () => {
  const arbitrary = getArbitrary(TestSchema)
  const encoder = getEncoder(TestSchema)
  const eq = getEq(TestSchema)
  const decoder = getDecoder(TestSchema)
  const guard = getGuard(TestSchema)
  const deserializer = getJsonDeserializer(TestSchema)
  const serializer = getJsonSerializer(TestSchema)
  const jsonSchema = getJsonSchema(TestSchema)
  test('encoder', () => {
    const valid: S.TypeOf<typeof TestSchema> = {
      test: 'test',
      fooBar: 5 as any,
      fooBaz: O.some(false),
      fooQux: 'test',
      'foo.baz': 'test',
      someRandomSentence: ['test' as any],
    }
    const result = encoder.encode(valid)
    expect(result).toEqual({
      __test: 'test',
      'foo-bar': 5,
      FOO_BAZ: 0,
      '_-_-_foo_Qux-----': 'test',
      'foo.baz': 'test',
      'some random sentence': ['test'],
    })
  })
  test('encoder / guard', () => {
    fc.assert(fc.property(arbitrary.arbitrary(fc), guard.is))
  })
  test('eq', () => {
    fc.assert(
      fc.property(arbitrary.arbitrary(fc), a => {
        expect(eq.equals(a, a)).toBe(true)
      }),
    )
  })
  describe('decoder', () => {
    it('should invalidate invalid inputs', () => {
      const valid: S.InputOf<typeof TestSchema> = {
        __test: 'test',
        'foo-bar': 5.5,
        FOO_BAZ: -1,
        '_-_-_foo_Qux-----': 'test',
        'foo.baz': 'test',
        'some random sentence': ['ｶﾀｶﾅ'],
      }
      const result = decoder.decode(valid)
      expect(result).toEqual(
        E.left(
          Fsg.concat(
            Fsg.of(DE.key('foo-bar', DE.required, Fsg.of(DE.leaf(5.5, 'int')))),
            Fsg.of(
              DE.key(
                'some random sentence',
                DE.required,
                Fsg.of(DE.index(0, DE.optional, Fsg.of(DE.leaf('ｶﾀｶﾅ', 'Ascii')))),
              ),
            ),
          ),
        ),
      )
    })
    it('should validate valid inputs', () => {
      const valid: S.InputOf<typeof TestSchema> = {
        __test: 'test',
        'foo-bar': 5,
        FOO_BAZ: 0,
        '_-_-_foo_Qux-----': 'test',
        'foo.baz': 'test',
        'some random sentence': ['test'],
      }
      const result = decoder.decode(valid)
      expect(result).toEqual({
        _tag: 'Right',
        right: {
          test: 'test',
          fooBar: 5,
          fooBaz: O.some(false),
          fooQux: 'test',
          'foo.baz': 'test',
          someRandomSentence: ['test'],
        },
      })
    })
  })
  test('serializer / deserializer', () => {
    fc.assert(
      fc.property(arbitrary.arbitrary(fc), a => {
        const serialized = serializer.print(a)
        const deserialized = pipe(serialized, E.chainW(deserializer.parse))
        expect(deserialized).toEqual(E.right(a))
      }),
    )
  })
  test('json schema', () => {
    expect(stripIdentity(jsonSchema)).toEqual({
      type: 'object',
      properties: {
        __test: { type: 'string' },
        'foo-bar': { type: 'integer', minimum: 0, maximum: 9007199254740991 },
        FOO_BAZ: { oneOf: [{ type: 'number' }, { type: 'null', const: null }] },
        '_-_-_foo_Qux-----': { type: 'string' },
        'foo.baz': { type: 'string' },
        'some random sentence': {
          type: 'array',
          items: { type: 'string', description: 'Ascii', pattern: '^([\\x00-\\x7f]+?)$' },
        },
      },
      required: [
        'FOO_BAZ',
        '_-_-_foo_Qux-----',
        '__test',
        'foo-bar',
        'foo.baz',
        'some random sentence',
      ],
    })
  })
})
