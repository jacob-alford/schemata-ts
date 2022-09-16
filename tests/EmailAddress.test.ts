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
    it('returns true for similar email addresses', () => {
      const email1 = 'abc@abc.com'
      const email2 = 'abc@abc.com'
      if (!Guard.is(email1) || !Guard.is(email2)) throw new Error('Unexpected result')
      expect(Eq.equals(email1, email2)).toBe(true)
    })
    it('returns false for dissimilar email addresses', () => {
      const email1 = 'abc@abc.com'
      const email2 = 'def@def.com'
      if (!Guard.is(email1) || !Guard.is(email2)) throw new Error('Unexpected result')
      expect(Eq.equals(email1, email2)).toBe(false)
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
    it('decodes an valid email', () => {
      const result = Type.decode('abc@abc.abc')
      expect(result._tag).toBe('Right')
    })
  })
})
