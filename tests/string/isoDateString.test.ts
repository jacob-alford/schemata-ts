import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as ISODateString from '../../src/string/isoDateString'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = [new Date().toISOString()]

const invalid: ReadonlyArray<string> = ['a', '', '2009-366']

describe('ISODateString', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = ISODateString.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        ISODateString.Decoder.decode,
        E.map(ISODateString.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = ISODateString.Guard.is
        const eq = ISODateString.Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = ISODateString.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await ISODateString.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = ISODateString.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid ISODateString', () => {
      validateArbitrary(ISODateString, ISODateString.isISODate)
    })
  })

  describe('fromDate', () => {
    it('converts a bad Date to None', () => {
      const date = new Date('NaN')
      const isoDateString = ISODateString.fromDate(date)
      expect(isoDateString._tag).toBe('None')
    })

    it('converts a good Date to Some', () => {
      const date = new Date()
      const isoDateString = ISODateString.fromDate(date)
      expect(isoDateString._tag).toBe('Some')
    })
  })
})
