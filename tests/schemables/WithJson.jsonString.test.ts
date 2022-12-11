import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import { getDecoder } from '../../src/Decoder'
import { validateArbitrary } from '../../test-utils'
import * as Json from '../../test-utils/schemable-exports/WithJson'

// Valid Json strings
const valid: ReadonlyArray<string> = [
  '{"a": 1}',
  '{"a": 1, "b": 2}',
  '{"a": 1, "b": 2, "c": 3}',
  '[1, 2, 3]',
  '[1, 2, 3, 4]',
  '{ "a": [{ "b": false }] }',
  '{ "c": null }',
]

// Invalid Json strings
const invalid: ReadonlyArray<string> = ['a', 'undefined']

describe('WithJson > jsonString', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid json strings, %s', str => {
      const result = Json.Decoder.jsonString.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid json strings, %s', str => {
      const result = Json.Decoder.jsonString.decode(str)
      if (result._tag === 'Right') console.log({ str, result: result.right })
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        Json.Decoder.jsonString.decode,
        E.map(Json.Encoder.jsonString.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(JSON.parse(original)).toStrictEqual(JSON.parse(roundtrip))
    })
  })

  describe('Eq', () => {
    test.each(valid)('determines two strings are equal', str1 => {
      const guard = Json.Guard.jsonString.is
      const eq = Json.Eq.jsonString.equals
      if (!guard(str1)) {
        throw new Error('Unexpected result')
      }
      expect(eq(str1, str1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(valid)('validates valid json strings, %s', str => {
      const result = Json.Guard.jsonString.is(str)
      expect(result).toBe(true)
    })
    test.each(invalid)('invalidates invalid json strings, %s', str => {
      const result = Json.Guard.jsonString.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid json strings, %s', async str => {
      const result = await Json.TaskDecoder.jsonString.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid json strings, %s', async str => {
      const result = await Json.TaskDecoder.jsonString.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid json strings, %s', str => {
      const result = Json.Type.jsonString.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid json strings, %s', str => {
      const result = Json.Type.jsonString.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid Json', () => {
      validateArbitrary({ Arbitrary: Json.Arbitrary.jsonString }, Json.Guard.json.is)
    })
  })

  describe('Schema', () => {
    it('derives a decoder', () => {
      const decoder = getDecoder(Json.Schema.jsonString)
      expect(
        decoder.decode(`{"a": { "b": [{"c": "d"}, {"e": null}, {"f": null}] }}`),
      ).toStrictEqual({
        _tag: 'Right',
        right: `{"a": { "b": [{"c": "d"}, {"e": null}, {"f": null}] }}`,
      })
      expect(decoder.decode(`a: "foo"`)._tag).toStrictEqual('Left')
    })
  })
})
