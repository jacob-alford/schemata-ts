import * as SafeDate from '../src/date/SafeDate'
import { validateArbitrary } from '../test-utils'

describe('SafeDate', () => {
  describe('Decoder', () => {
    it('catches an invalid date', () => {
      const result = SafeDate.Decoder.decode(new Date('abc'))
      expect(result._tag).toBe('Left')
    })
    it('validates a valid date', () => {
      const result = SafeDate.Decoder.decode(new Date())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar dates', () => {
      const date = new Date()
      if (!SafeDate.isSafeDate(date)) throw new Error('Unexpected result')
      expect(SafeDate.Eq.equals(date, date)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const date1 = new Date()
      const date2 = new Date(date1.getTime() + 1)
      if (!SafeDate.isSafeDate(date1) || !SafeDate.isSafeDate(date2))
        throw new Error('Unexpected result')

      expect(SafeDate.Eq.equals(date1, date2)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid date', () => {
      const date = new Date('abc')
      expect(SafeDate.Guard.is(date)).toBe(false)
    })
    it('permits a valid date', () => {
      const date = new Date()
      expect(SafeDate.Guard.is(date)).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid date', async () => {
      const date = new Date('abc')
      const result = await SafeDate.TaskDecoder.decode(date)()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid date', async () => {
      const date = new Date()
      const result = await SafeDate.TaskDecoder.decode(date)()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid date', () => {
      const date = new Date('abc')
      const result = SafeDate.Type.decode(date)
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid date', () => {
      const date = new Date()
      const result = SafeDate.Type.decode(date)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid SafeDates', () => {
      validateArbitrary(SafeDate, SafeDate.isSafeDate)
    })
  })
})
