import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as DateFromUnixTime from '../../../src/schemata/date/DateFromUnixTime'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const { Arbitrary, Decoder, Encoder, Eq, Guard, TaskDecoder, Type, Printer } =
  getAllInstances(DateFromUnixTime.DateFromUnixTime)

const nowish = 1667162645986
const nowishUnix = nowish / 1000

const nowishDate = new Date(nowish)

describe('DateFromUnixTime', () => {
  describe('Decoder', () => {
    it('catches an invalid date', () => {
      const result = Decoder.decode(new Date('abc'))
      expect(result._tag).toBe('Left')
    })
    it('validates a valid date', () => {
      const result = Decoder.decode(nowishUnix)
      expect(result).toStrictEqual(E.right(nowishDate))
    })
  })
  describe('Eq', () => {
    it('returns true for similar dates', () => {
      if (!Guard.is(nowishDate)) throw new Error('Unexpected result')
      expect(Eq.equals(nowishDate, nowishDate)).toBe(true)
    })
    it('returns false for dissimilar dates', () => {
      const date1 = nowishDate
      const date2 = new Date(nowish + 1)
      if (!Guard.is(date1) || !Guard.is(date2)) throw new Error('Unexpected result')

      expect(Eq.equals(date1, date2)).toBe(false)
    })
  })
  describe('Encoder', () => {
    it('roundtrips encoder / decoder', () => {
      const original = nowishUnix
      const roundtrip = pipe(
        original,
        Decoder.decode,
        E.map(Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
  })
  describe('Guard', () => {
    it('guards against invalid date', () => {
      const date = new Date('abc')
      expect(Guard.is(date)).toBe(false)
    })
    it('permits a valid date', () => {
      expect(Guard.is(nowishDate)).toBe(true)
    })
  })
  describe('TaskDecoder', () => {
    it('invalidates an invalid date', async () => {
      const date = new Date('abc')
      const result = await TaskDecoder.decode(date.getTime() / 1000)()
      expect(result._tag).toBe('Left')
    })
    it('validates an valid date', async () => {
      const result = await TaskDecoder.decode(nowishUnix)()
      expect(result).toStrictEqual(E.right(nowishDate))
    })
  })
  describe('Type', () => {
    it('decodes an invalid date', () => {
      const date = new Date('abc')
      const result = Type.decode(date.getTime())
      expect(result._tag).toBe('Left')
    })
    it('decodes an invalid date', () => {
      const result = Type.decode(nowishUnix)
      expect(result).toStrictEqual(E.right(nowishDate))
    })
  })

  describe('Arbitrary', () => {
    it('generates valid DateFromUnixTimes', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })

  describe('Printer', () => {
    it('prints a DateFromUnixTime', () => {
      expect(Printer.print(nowishDate)).toStrictEqual(E.right(nowishUnix))
      expect(Printer.printLeft(nowishUnix)).toStrictEqual(E.right(nowishUnix))
    })
  })
})
