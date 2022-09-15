import { unsafeCoerce } from 'fp-ts/function'
import { Eq, Decoder, Guard, Int, Type } from '../src/number/Int'

const _: (n: number) => Int = unsafeCoerce

const make: () => Int = () => _((Math.random() * 100000) | 0)

describe('Int', () => {
  describe('Decoder', () => {
    it('catches an invalid int', () => {
      const result = Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid int', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar ints', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar ints', () => {
      expect(Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid int', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(Guard.is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(Guard.is(1234567890123456789012345678901234567890n)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid int', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid int', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
})
