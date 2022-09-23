import { unsafeCoerce } from 'fp-ts/function'
import * as NegativeIntString from '../../src/string/NegativeIntString'
import { validateArbitrary } from '../../test-utils'

const _: (n: string) => NegativeIntString.NegativeIntString = unsafeCoerce

const make: () => NegativeIntString.NegativeIntString = () =>
  _(`-${(Math.random() * 100000 + 1) | 0}`)

describe('NegativeIntString', () => {
  describe('Decoder', () => {
    it('catches an invalid NegativeIntString', () => {
      const result = NegativeIntString.Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NegativeIntString', () => {
      const result = NegativeIntString.Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NegativeIntStrings', () => {
      const test = make()
      expect(NegativeIntString.Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NegativeIntStrings', () => {
      expect(NegativeIntString.Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NegativeIntString', () => {
      expect(NegativeIntString.Guard.is(1.1)).toBe(false)
    })
    it('permits a valid NegativeIntString', () => {
      expect(NegativeIntString.Guard.is(make())).toBe(true)
    })
    it('protects against bigNegativeIntStrings', () => {
      expect(
        NegativeIntString.Guard.is(`1234567890123456789012345678901234567890n`)
      ).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NegativeIntString', () => {
      const result = NegativeIntString.Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NegativeIntString', () => {
      const result = NegativeIntString.Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an NegativeIntString to an Natural', () => {
    const test = make()
    if (!NegativeIntString.Guard.is(test)) throw new Error('Unexpected result')
    const result = NegativeIntString.toNegativeInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })

  describe('Arbitrary', () => {
    it('generates valid NegativeIntStrings', () => {
      validateArbitrary(NegativeIntString, NegativeIntString.isNegativeIntString)
    })
  })
})
