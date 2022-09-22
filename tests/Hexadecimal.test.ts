import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'

import { pipe, tuple } from 'fp-ts/function'

import { Decoder, Eq, Encoder, Guard, TaskDecoder, Type } from '../src/string/Hexadecimal'

import { cat, combineExpected } from '../test-utils'

const validStrings = [
  'deadBEEF',
  'ff0044',
  '0xff0044',
  '0XfF0044',
  '0x0123456789abcDEF',
  '0X0123456789abcDEF',
  '0hfedCBA9876543210',
  '0HfedCBA9876543210',
  '0123456789abcDEF',
]

const invalidStrings = [
  'abcdefg',
  '',
  '..',
  '0xa2h',
  '0xa20x',
  '0x0123456789abcDEFq',
  '0hfedCBA9876543210q',
  '01234q56789abcDEF',
]

describe('Hexadecimal', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Decoder.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Encoder', () => {
    test.each(validStrings)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          Decoder.decode,
          E.map(Encoder.encode),
          E.getOrElse(() => 'invalid')
        )

        expect(original).toEqual(roundtrip)
      }
    )
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validStrings, validStrings, tuple))(
      'determines two strings are equal',

      (str1, str2) => {
        const guard = Guard.is
        const eq = Eq.equals

        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }

        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validStrings, true), combineExpected(invalidStrings, false))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Guard.is(str)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', async (str, expectedTag) => {
      const result = await TaskDecoder.decode(str)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Type.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })
})
