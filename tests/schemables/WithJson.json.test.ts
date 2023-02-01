import * as J from 'fp-ts/Json'

import { SafeJson } from '../../src/base/PrinterBase'
import { validateArbitrary } from '../../test-utils'
import * as Json from '../../test-utils/schemable-exports/WithJson'

const _ = (arg: J.Json): SafeJson => arg as any

describe('WithJson > json', () => {
  describe('Arbitrary', () => {
    it('generates valid Json', () => {
      validateArbitrary({ Arbitrary: Json.Arbitrary.json }, Json.Guard.json.is)
    })
  })
  describe('Eq', () => {
    it('checks equality', () => {
      expect(
        Json.Eq.json.equals(
          _({ a: [{ b: null, c: [] }] }),
          _({ a: [{ b: null, c: [] }] }),
        ),
      ).toBe(true)
      expect(
        Json.Eq.json.equals(
          _({ a: [{ b: null, c: [] }] }),
          _({ a: [{ b: null, c: ['h'] }] }),
        ),
      ).toBe(false)
    })
  })
  describe('Type', () => {
    it('validates valid json strings', () => {
      const result = Json.Type.json.decode('{"a": 1}')
      expect(result._tag).toBe('Right')
    })
    it('invalidates invalid json strings', () => {
      const result = Json.Type.json.decode(0n)
      expect(result).toEqual({
        _tag: 'Left',
        left: [
          {
            context: [],
            message: 'Json',
            value: 0n,
          },
        ],
      })
    })
  })
  describe('Guard', () => {
    it('validates valid json arrays', () => {
      expect(Json.Guard.json.is('{"a": 1}')).toBe(true)
    })
  })
})
