import { unsafeCoerce } from 'fp-ts/function'

import { PositiveInt } from '../../../src/schemata/number/PositiveInt'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const _: (n: number) => PositiveInt = unsafeCoerce

const { Decoder, Eq, Guard, Arbitrary, Type } = getAllInstances(PositiveInt)

describe('PositiveInt', () => {
  describe('Decoder', () => {
    it('catches an invalid PositiveInt', () => {
      const result = Decoder.decode(-1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid PositiveInt', () => {
      const result = Decoder.decode(1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar PositiveInts', () => {
      expect(Eq.equals(_(1), _(1))).toBe(true)
    })
    it('returns false for dissimilar PositiveInts', () => {
      expect(Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid PositiveInt', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid PositiveInt', () => {
      expect(Guard.is(1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid PositiveInt', () => {
      const result = Type.decode(-4)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid PositiveInt', () => {
      const result = Type.decode(4)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid PositiveInts', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
