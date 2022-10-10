import * as ASCII from '../../src/string/ascii'
import { validateArbitrary } from '../../test-utils'

describe('ASCII', () => {
  describe('Decoder', () => {
    it('catches an invalid string', () => {
      const result = ASCII.Decoder.decode('ｆｏｏbar')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid ASCII string', () => {
      const result = ASCII.Decoder.decode('foobar123')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar strings', () => {
      const str1 = '1234abcDEF'
      const str2 = '1234abcDEF'
      if (!ASCII.Guard.is(str1) || !ASCII.Guard.is(str2))
        throw new Error('Unexpected result')
      expect(ASCII.Eq.equals(str1, str2)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const str1 = 'abc@abc.abc'
      const str2 = 'def@def.abc'
      if (!ASCII.Guard.is(str1) || !ASCII.Guard.is(str2))
        throw new Error('Unexpected result')
      expect(ASCII.Eq.equals(str1, str2)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid ASCII characters', () => {
      expect(ASCII.Guard.is('ｆｏｏbar')).toBe(false)
    })
    it('permits a valid ASCII characters', () => {
      expect(ASCII.Guard.is('abc@abc.abc')).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid ASCII string', async () => {
      const result = await ASCII.TaskDecoder.decode('ｆｏｏbar')()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid ASCII string', async () => {
      const result = await ASCII.TaskDecoder.decode('abc@abc.abc')()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid ASCII string', () => {
      const result = ASCII.Type.decode('ｆｏｏbar')
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid ASCII string', () => {
      const result = ASCII.Type.decode('abc@abc.abc')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid ASCII strings', () => {
      validateArbitrary(ASCII, ASCII.isAscii)
    })
  })
})
