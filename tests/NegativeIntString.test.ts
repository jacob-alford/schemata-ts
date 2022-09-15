import { unsafeCoerce } from 'fp-ts/function'
import {
  Eq,
  Decoder,
  Guard,
  toNegativeInt,
  NegativeIntString,
  Type,
} from '../src/string/NegativeIntString'

const _: (n: string) => NegativeIntString = unsafeCoerce

const make: () => NegativeIntString = () => _(`-${(Math.random() * 100000 + 1) | 0}`)

describe('NegativeIntString', () => {
  describe('Decoder', () => {
    it('catches an invalid NegativeIntString', () => {
      const result = Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NegativeIntString', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NegativeIntStrings', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NegativeIntStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NegativeIntString', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid NegativeIntString', () => {
      expect(Guard.is(make())).toBe(true)
    })
    it('protects against bigNegativeIntStrings', () => {
      expect(Guard.is(`1234567890123456789012345678901234567890n`)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NegativeIntString', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NegativeIntString', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an NegativeIntString to an Natural', () => {
    const test = make()
    if (!Guard.is(test)) throw new Error('Unexpected result')
    const result = toNegativeInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })
})
