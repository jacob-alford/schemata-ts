import { Decoder, Eq, Guard, TaskDecoder, Type } from '../src/string/ASCII'

describe('ASCII', () => {
  describe('Decoder', () => {
    it('catches an invalid string', () => {
      const result = Decoder.decode('ｆｏｏbar')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid ASCII string', () => {
      const result = Decoder.decode('foobar123')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar strings', () => {
      const str1 = '1234abcDEF'
      const str2 = '1234abcDEF'
      if (!Guard.is(str1) || !Guard.is(str2)) throw new Error('Unexpected result')
      expect(Eq.equals(str1, str2)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const str1 = 'abc@abc.abc'
      const str2 = 'def@def.abc'
      if (!Guard.is(str1) || !Guard.is(str2)) throw new Error('Unexpected result')
      expect(Eq.equals(str1, str2)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid ASCII characters', () => {
      expect(Guard.is('ｆｏｏbar')).toBe(false)
    })
    it('permits a valid ASCII characters', () => {
      expect(Guard.is('abc@abc.abc')).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid ASCII string', async () => {
      const result = await TaskDecoder.decode('ｆｏｏbar')()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid ASCII string', async () => {
      const result = await TaskDecoder.decode('abc@abc.abc')()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid ASCII string', () => {
      const result = Type.decode('ｆｏｏbar')
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid ASCII string', () => {
      const result = Type.decode('abc@abc.abc')
      expect(result._tag).toBe('Right')
    })
  })
})
