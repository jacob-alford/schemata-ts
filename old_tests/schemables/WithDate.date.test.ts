import * as E from 'fp-ts/Either'

import { getDecoder } from '../../src/internal/Decoder'
import * as PE from '../../src/PrintError'
import { isSafeDate } from '../../src/schemables/WithDate/utils'
import { validateArbitrary } from '../../test-utils'
import * as SafeDate from '../../test-utils/schemable-exports/WithDate'

describe('SafeDate', () => {
  describe('Decoder', () => {
    it('catches an invalid date', () => {
      const result = SafeDate.Decoder.date.decode(new Date('abc'))
      expect(result._tag).toBe('Left')
    })
    it('validates a valid date', () => {
      const result = SafeDate.Decoder.date.decode(new Date())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar dates', () => {
      const date = new Date()
      if (!isSafeDate(date)) throw new Error('Unexpected result')
      expect(SafeDate.Eq.date.equals(date, date)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const date1 = new Date()
      const date2 = new Date(date1.getTime() + 1)
      if (!isSafeDate(date1) || !isSafeDate(date2)) throw new Error('Unexpected result')

      expect(SafeDate.Eq.date.equals(date1, date2)).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid date', () => {
      const date = new Date('abc')
      expect(SafeDate.Guard.date.is(date)).toBe(false)
    })
    it('permits a valid date', () => {
      const date = new Date()
      expect(SafeDate.Guard.date.is(date)).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid date', async () => {
      const date = new Date('abc')
      const result = await SafeDate.TaskDecoder.date.decode(date)()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid date', async () => {
      const date = new Date()
      const result = await SafeDate.TaskDecoder.date.decode(date)()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid date', () => {
      const date = new Date('abc')
      const result = SafeDate.Type.date.decode(date)
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid date', () => {
      const date = new Date()
      const result = SafeDate.Type.date.decode(date)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid SafeDates', () => {
      validateArbitrary({ Arbitrary: SafeDate.Arbitrary.date }, isSafeDate)
    })
  })

  describe('Schema', () => {
    it('derives a decoder', () => {
      const decoder = getDecoder(SafeDate.Schema.date)
      const validDate = new Date()
      expect(decoder.decode(new Date('abc'))._tag).toEqual('Left')
      expect(decoder.decode(validDate)).toStrictEqual(E.right(validDate))
    })
  })

  describe('Printer', () => {
    it('prints a valid date', () => {
      const date = new Date()
      expect(SafeDate.Printer.date.domainToJson(date)).toStrictEqual(
        E.right(date.toISOString()),
      )
    })
    it('catches a bad date, poor guy', () => {
      const date = new Date('abc')
      expect(SafeDate.Printer.date.domainToJson(date)).toStrictEqual(
        E.left(new PE.NamedError('Valid Date', new PE.InvalidValue(date))),
      )
    })
    it('prints a valid date', () => {
      const date = new Date()
      expect(SafeDate.Printer.date.codomainToJson(date)).toStrictEqual(
        E.right(date.toISOString()),
      )
    })
    it('catches another bad date, poor guy', () => {
      const date = new Date('abc')
      expect(SafeDate.Printer.date.codomainToJson(date)).toStrictEqual(
        E.left(new PE.NamedError('Valid Date', new PE.InvalidValue(date))),
      )
    })
  })
})
