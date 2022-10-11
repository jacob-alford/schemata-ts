import { unsafeCoerce } from 'fp-ts/function'
import * as PositiveInt from '../../src/number/positiveInt'
import { validateArbitrary } from '../../test-utils'

const _: (n: number) => PositiveInt.PositiveInt = unsafeCoerce

describe('PositiveInt', () => {
  describe('Decoder', () => {
    it('catches an invalid PositiveInt', () => {
      const result = PositiveInt.Decoder.decode(-1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid PositiveInt', () => {
      const result = PositiveInt.Decoder.decode(1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar PositiveInts', () => {
      expect(PositiveInt.Eq.equals(_(1), _(1))).toBe(true)
    })
    it('returns false for dissimilar PositiveInts', () => {
      expect(PositiveInt.Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid PositiveInt', () => {
      expect(PositiveInt.Guard.is(1.1)).toBe(false)
    })
    it('permits a valid PositiveInt', () => {
      expect(PositiveInt.Guard.is(1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid PositiveInt', () => {
      const result = PositiveInt.Type.decode(-4)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid PositiveInt', () => {
      const result = PositiveInt.Type.decode(4)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid PositiveInts', () => {
      validateArbitrary(PositiveInt, PositiveInt.isPositiveInt)
    })
  })
})
