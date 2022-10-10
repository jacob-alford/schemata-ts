import { unsafeCoerce } from 'fp-ts/function'
import * as IntString from '../../src/string/intString'
import { validateArbitrary } from '../../test-utils'

const _: (n: string) => IntString.IntString = unsafeCoerce

describe('IntString', () => {
  describe('Decoder', () => {
    it('catches an invalid IntString', () => {
      const result = IntString.Decoder.decode('1.1')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid IntString', () => {
      const result = IntString.Decoder.decode('1')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar IntStrings', () => {
      expect(IntString.Eq.equals(_('1'), _('1'))).toBe(true)
    })
    it('returns false for dissimilar IntStrings', () => {
      expect(IntString.Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid IntString', () => {
      expect(IntString.Guard.is('1.1')).toBe(false)
    })
    it('permits a valid IntString', () => {
      expect(IntString.Guard.is('1')).toBe(true)
    })
    it('protects against bigIntStrings', () => {
      expect(IntString.Guard.is('1234567890123456789012345678901234567890n')).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid IntString', () => {
      const result = IntString.Type.decode('1.1')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid IntString', () => {
      const result = IntString.Type.decode('1')
      expect(result._tag).toBe('Right')
    })
  })
  it('converts an IntString to an Int', () => {
    const test = `${(Math.random() * 1000 + 1) | 0}`
    if (!IntString.Guard.is(test)) throw new Error('Unexpected result')
    const result = IntString.toInt(test)
    expect(Number.isNaN(result)).toBe(false)
  })

  describe('Arbitrary', () => {
    it('generates valid IntStrings', () => {
      validateArbitrary(IntString, IntString.isIntString)
    })
  })
})
