import { unsafeCoerce } from 'fp-ts/function'
import {
  Eq,
  Decoder,
  Guard,
  toNatural,
  NaturalString,
  Type,
} from '../src/string/NaturalString'

const _: (n: string) => NaturalString = unsafeCoerce

const make: () => NaturalString = () => _(`${(Math.random() * 100000) | 0}`)

describe('NaturalString', () => {
  describe('Decoder', () => {
    it('catches an invalid NaturalString', () => {
      const result = Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NaturalString', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NaturalStrings', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NaturalStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NaturalString', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid NaturalString', () => {
      expect(Guard.is(make())).toBe(true)
    })
    it('protects against bigNaturalStrings', () => {
      expect(Guard.is(`1234567890123456789012345678901234567890n`)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NaturalString', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NaturalString', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an NaturalString to an Natural', () => {
    const test = make()
    if (!Guard.is(test)) throw new Error('Unexpected result')
    const result = toNatural(test)
    expect(Number.isNaN(result)).toBe(false)
  })
})
