import { NegativeInt } from '../../../src/schemata/number/NegativeInt'
import { getAllInstances, validateArbitrary } from '../../../test-utils'
import { unsafeCoerce } from 'fp-ts/function'

const _: (n: number) => NegativeInt = unsafeCoerce

const { Decoder, Eq, Guard, Arbitrary, Type } = getAllInstances(NegativeInt)

describe('NegativeInt', () => {
  describe('Decoder', () => {
    it('catches an invalid NegativeInt', () => {
      const result = Decoder.decode(-1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NegativeInt', () => {
      const result = Decoder.decode(-1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NegativeInts', () => {
      expect(Eq.equals(_(-1), _(-1))).toBe(true)
    })
    it('returns false for dissimilar NegativeInts', () => {
      expect(Eq.equals(_(-1), _(-2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NegativeInt', () => {
      expect(Guard.is(1)).toBe(false)
    })
    it('permits a valid NegativeInt', () => {
      expect(Guard.is(-1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NegativeInt', () => {
      const result = Type.decode(-1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NegativeInt', () => {
      const result = Type.decode(-1)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid NegativeInts', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
