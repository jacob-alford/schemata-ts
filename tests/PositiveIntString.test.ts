import { unsafeCoerce } from 'fp-ts/function'
import {
  Eq,
  Decoder,
  Guard,
  toPositiveInt,
  PositiveIntString,
  Type,
} from '../src/string/PositiveIntString'

const _: (n: string) => PositiveIntString = unsafeCoerce

const make: () => PositiveIntString = () => _(`${(Math.random() * 100000 + 1) | 0}`)

describe('PositiveIntString', () => {
  describe('Decoder', () => {
    it('catches an invalid PositiveIntString', () => {
      const result = Decoder.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid PositiveIntString', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar PositiveIntStrings', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar PositiveIntStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid PositiveIntString', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid PositiveIntString', () => {
      expect(Guard.is(make())).toBe(true)
    })
    it('protects against bigPositiveIntStrings', () => {
      expect(Guard.is(`1234567890123456789012345678901234567890n`)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid PositiveIntString', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid PositiveIntString', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an PositiveIntString to an Natural', () => {
    const test = make()
    if (!Guard.is(test)) throw new Error('Unexpected result')
    const result = toPositiveInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })
})
