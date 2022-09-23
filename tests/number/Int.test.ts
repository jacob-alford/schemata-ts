import { unsafeCoerce } from 'fp-ts/function'
import * as Int from '../../src/number/Int'
import { validateArbitrary } from '../../test-utils'

const _: (n: number) => Int.Int = unsafeCoerce

const make: () => Int.Int = () => _((Math.random() * 100000) | 0)

describe('Int', () => {
  describe('Decoder', () => {
    it('catches an invalid int', () => {
      const result = Int.Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid int', () => {
      const result = Int.Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar ints', () => {
      const test = make()
      expect(Int.Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar ints', () => {
      expect(Int.Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid int', () => {
      expect(Int.Guard.is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(Int.Guard.is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(Int.Guard.is(1234567890123456789012345678901234567890n)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid int', () => {
      const result = Int.Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid int', () => {
      const result = Int.Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid Ints', () => {
      validateArbitrary(Int, Int.isInt)
    })
  })
})
