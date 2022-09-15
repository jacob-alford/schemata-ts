import { Decoder, Eq, Guard, TaskDecoder, Type } from '../src/string/EmailAddress'

describe('EmailAddress', () => {
  describe('Decoder', () => {
    it('catches an invalid email', () => {
      const result = Decoder.decode('abc')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid email', () => {
      const result = Decoder.decode('abc@abc.abc')
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar dates', () => {
      const email = 'abc@abc.abc'
      if (!Guard.is(email)) throw new Error('Unexpected result')
      expect(Eq.equals(email, email)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const date1 = 'abc@abc.abc'
      const date2 = 'def@def.abc'
      if (!Guard.is(date1) || !Guard.is(date2)) throw new Error('Unexpected result')
      expect(Eq.equals(date1, date2)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid email', () => {
      expect(Guard.is('abc')).toBe(false)
    })
    it('permits a valid email', () => {
      expect(Guard.is('abc@abc.abc')).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid email', async () => {
      const result = await TaskDecoder.decode('abc')()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid email', async () => {
      const result = await TaskDecoder.decode('abc@abc.abc')()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid email', () => {
      const result = Type.decode('abc')
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid email', () => {
      const result = Type.decode('abc@abc.abc')
      expect(result._tag).toBe('Right')
    })
  })
})
