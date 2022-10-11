import { unsafeCoerce } from 'fp-ts/function'
import * as NegativeInt from '../../src/number/negativeInt'
import { validateArbitrary } from '../../test-utils'

const _: (n: number) => NegativeInt.NegativeInt = unsafeCoerce

describe('NegativeInt', () => {
  describe('Decoder', () => {
    it('catches an invalid NegativeInt', () => {
      const result = NegativeInt.Decoder.decode(-1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NegativeInt', () => {
      const result = NegativeInt.Decoder.decode(-1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NegativeInts', () => {
      expect(NegativeInt.Eq.equals(_(-1), _(-1))).toBe(true)
    })
    it('returns false for dissimilar NegativeInts', () => {
      expect(NegativeInt.Eq.equals(_(-1), _(-2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NegativeInt', () => {
      expect(NegativeInt.Guard.is(1)).toBe(false)
    })
    it('permits a valid NegativeInt', () => {
      expect(NegativeInt.Guard.is(-1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NegativeInt', () => {
      const result = NegativeInt.Type.decode(-1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NegativeInt', () => {
      const result = NegativeInt.Type.decode(-1)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid NegativeInts', () => {
      validateArbitrary(NegativeInt, NegativeInt.isNegativeInt)
    })
  })
})
