import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'

import { JsonString } from '../../../src/base/PrinterBase'
import { Json } from '../../../src/schemata'
import { JsonFromString as Schema } from '../../../src/schemata/json/JsonFromString'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const JsonFromString = getAllInstances(Schema)

describe('JsonFromString', () => {
  describe('Decoder', () => {
    it('validates valid json strings', () => {
      const result = JsonFromString.Decoder.decode('{"a": 1}')
      expect(result._tag).toBe('Right')
    })
    it('invalidates invalid json strings', () => {
      const result = JsonFromString.Decoder.decode('a')
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test('encoding a decoded value yields original value', () => {
      const input = '{"a": 1}'
      const roundtrip = pipe(
        input,
        JsonFromString.Decoder.decode,
        E.map(JsonFromString.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(JSON.parse(input)).toStrictEqual(JSON.parse(roundtrip))
    })
  })

  describe('Eq', () => {
    it('is reflexive', () => {
      const input = '{"a": 1}'
      const result = pipe(
        input,
        JsonFromString.Decoder.decode,
        E.map(a => JsonFromString.Eq.equals(a, a)),
      )
      expect(result).toStrictEqual(E.right(true))
    })
  })

  describe('Type', () => {
    it('validates valid json strings', () => {
      const result = JsonFromString.Type.decode('{"a": 1}')
      expect(result._tag).toBe('Right')
    })
    it('invalidates invalid json strings', () => {
      const result = JsonFromString.Type.decode('a')
      expect(result._tag).toBe('Left')
    })
  })

  describe('TaskDecoder', () => {
    it('validates valid json strings', async () => {
      const result = await JsonFromString.TaskDecoder.decode('{"a": 1}')()
      expect(result._tag).toBe('Right')
    })
    it('invalidates invalid json strings', async () => {
      const result = await JsonFromString.TaskDecoder.decode('a')()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    test('generates valid json strings', () => {
      validateArbitrary({ Arbitrary: JsonFromString.Arbitrary }, JsonFromString.Guard.is)
    })
    it('has correspondence between JSON strings and Jsons', () => {
      const json = getAllInstances(Json.json)
      const jsonString = getAllInstances(Json.jsonString)
      validateArbitrary(
        { Arbitrary: jsonString.Arbitrary },
        (s): s is JsonString =>
          typeof s === 'string' &&
          pipe(
            J.parse(s),
            E.filterOrElseW(json.Guard.is, () => 'Unexpected Result'),
            E.isRight,
          ),
      )
    })
  })

  describe('Printer', () => {
    it('prints a safe json', () => {
      const value = { a: 1 }
      if (!JsonFromString.Guard.is(value)) throw new Error('Unexpected Result')
      const result = JsonFromString.Printer.print(value)
      expect(result).toStrictEqual(E.right({ a: 1 }))
    })
    it('prints any string', () => {
      const result = JsonFromString.Printer.printLeft(
        '{ im: "just a regular string"!, NaN: Infinity }',
      )
      expect(result).toStrictEqual(
        E.right('{ im: "just a regular string"!, NaN: Infinity }'),
      )
    })
  })
})
