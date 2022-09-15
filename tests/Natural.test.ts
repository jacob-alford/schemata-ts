import { unsafeCoerce } from 'fp-ts/function'
import { Eq, Decoder, Guard, Natural, Type } from '../src/number/Natural'

const _: (n: number) => Natural = unsafeCoerce

describe('Natural', () => {
  describe('Decoder', () => {
    it('catches an invalid nat', () => {
      const result = Decoder.decode(-1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid nat', () => {
      const result = Decoder.decode(1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar nats', () => {
      expect(Eq.equals(_(1), _(1))).toBe(true)
    })
    it('returns false for dissimilar nats', () => {
      expect(Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid nat', () => {
      expect(Guard.is(-1.1)).toBe(false)
    })
    it('permits a valid nat', () => {
      expect(Guard.is(1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid nat', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid nat', () => {
      const result = Type.decode(1)
      expect(result._tag).toBe('Right')
    })
  })
})
