import { validateArbitrary } from '../../test-utils'
import * as Json from '../../test-utils/schemable-exports/WithJson'

describe('WithJson > json', () => {
  describe('Arbitrary', () => {
    it('generates valid Json', () => {
      validateArbitrary({ Arbitrary: Json.Arbitrary.json }, Json.Guard.json.is)
    })
  })
  describe('Eq', () => {
    it('checks equality', () => {
      expect(
        Json.Eq.json.equals({ a: [{ b: null, c: [] }] }, { a: [{ b: null, c: [] }] }),
      ).toBe(true)
      expect(
        Json.Eq.json.equals({ a: [{ b: null, c: [] }] }, { a: [{ b: null, c: ['h'] }] }),
      ).toBe(false)
    })
  })
  describe('Type', () => {
    it('validates valid json strings', () => {
      const result = Json.Type.json.decode('{"a": 1}')
      expect(result._tag).toBe('Right')
    })
    it('invalidates invalid json strings', () => {
      const result = Json.Type.json.decode(undefined)
      expect(result._tag).toBe('Left')
    })
  })
})
