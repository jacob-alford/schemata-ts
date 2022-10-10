import { unsafeCoerce } from 'fp-ts/function'
import * as PositiveIntString from '../../src/string/positiveIntString'
import { validateArbitrary } from '../../test-utils'

const _: (n: string) => PositiveIntString.PositiveIntString = unsafeCoerce

const make: () => PositiveIntString.PositiveIntString = () =>
  _(`${(Math.random() * 100000 + 1) | 0}`)

describe('PositiveIntString', () => {
  describe('Decoder', () => {
    it('catches an invalid PositiveIntString', () => {
      const result = PositiveIntString.Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid PositiveIntString', () => {
      const result = PositiveIntString.Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar PositiveIntStrings', () => {
      const test = make()
      expect(PositiveIntString.Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar PositiveIntStrings', () => {
      expect(PositiveIntString.Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid PositiveIntString', () => {
      expect(PositiveIntString.Guard.is(1.1)).toBe(false)
    })
    it('permits a valid PositiveIntString', () => {
      expect(PositiveIntString.Guard.is(make())).toBe(true)
    })
    it('protects against bigPositiveIntStrings', () => {
      expect(
        PositiveIntString.Guard.is(`1234567890123456789012345678901234567890n`)
      ).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid PositiveIntString', () => {
      const result = PositiveIntString.Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid PositiveIntString', () => {
      const result = PositiveIntString.Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an PositiveIntString to an Natural', () => {
    const test = make()
    if (!PositiveIntString.Guard.is(test)) throw new Error('Unexpected result')
    const result = PositiveIntString.toPositiveInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })

  describe('Arbitrary', () => {
    it('generates valid PositiveIntStrings', () => {
      validateArbitrary(PositiveIntString, PositiveIntString.isPositiveIntString)
    })
  })
})
