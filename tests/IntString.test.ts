import { unsafeCoerce } from 'fp-ts/function'
import { Eq, Decoder, Guard, IntString, Type, toInt } from '../src/string/IntString'

const _: (n: string) => IntString = unsafeCoerce

describe('IntString', () => {
  describe('Decoder', () => {
    it('catches an invalid IntString', () => {
      const result = Decoder.decode('1.1')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid IntString', () => {
      const result = Decoder.decode('1')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar IntStrings', () => {
      expect(Eq.equals(_('1'), _('1'))).toBe(true)
    })
    it('returns false for dissimilar IntStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid IntString', () => {
      expect(Guard.is('1.1')).toBe(false)
    })
    it('permits a valid IntString', () => {
      expect(Guard.is('1')).toBe(true)
    })
    it('protects against bigIntStrings', () => {
      expect(Guard.is('1234567890123456789012345678901234567890n')).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid IntString', () => {
      const result = Type.decode('1.1')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid IntString', () => {
      const result = Type.decode('1')
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an IntString to an Int', () => {
    const test = `${(Math.random() * 1000 + 1) | 0}`
    if (!Guard.is(test)) throw new Error('Unexpected result')
    const result = toInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })
})
