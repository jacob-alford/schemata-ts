import {
  Decoder,
  toSafeDate,
  Eq,
  fromDate,
  Guard,
  TaskDecoder,
  Type,
} from '../src/string/ISODateString'

describe('SafeDate', () => {
  describe('Decoder', () => {
    it('catches an invalid date', () => {
      const result = Decoder.decode('abc')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid date', () => {
      const result = Decoder.decode(new Date().toISOString())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar dates', () => {
      const date = new Date().toISOString()
      if (!Guard.is(date)) throw new Error('Unexpected result')
      expect(Eq.equals(date, date)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const date1 = new Date()
      const date1Iso = date1.toISOString()
      const date2 = new Date(date1.getTime() + 1)
      const date2Iso = date2.toISOString()
      if (!Guard.is(date1Iso) || !Guard.is(date2Iso)) throw new Error('Unexpected result')
      expect(Eq.equals(date1Iso, date2Iso)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid date', () => {
      expect(Guard.is('abc')).toBe(false)
    })
    it('permits a valid date', () => {
      const date = new Date()
      expect(Guard.is(date.toISOString())).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid date', async () => {
      const result = await TaskDecoder.decode('abc')()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid date', async () => {
      const date = new Date().toISOString()
      const result = await TaskDecoder.decode(date)()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid date', () => {
      const result = Type.decode('abc')
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid date', () => {
      const date = new Date().toISOString()
      const result = Type.decode(date)
      expect(result._tag).toBe('Right')
    })
  })
  it('converts to safe-date', () => {
    const date = new Date().toISOString()
    if (!Guard.is(date)) throw new Error('Unexpected result')
    const result = toSafeDate(date)
    expect(result.toISOString()).toBe(date)
  })
  it('returns O.some for a valid Date', () => {
    const date = new Date()
    const result = fromDate(date)
    expect(result._tag).toBe('Some')
  })
  it('returns O.none for an invalid Date', () => {
    const date = new Date('abc')
    const result = fromDate(date)
    expect(result._tag).toBe('None')
  })
})
