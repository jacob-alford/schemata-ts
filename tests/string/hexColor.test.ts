import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'

import { pipe, tuple } from 'fp-ts/function'

import * as HexColor from '../../src/string/hexColor'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validStrings = ['#ff0000ff', '#ff0034', '#CCCCCC', '0f38', 'fff', '#f00']

const invalidStrings = ['#ff', 'fff0a', '#ff12FG', '#bbh']

describe('HexColor', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = HexColor.Decoder.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Encoder', () => {
    test.each(validStrings)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          HexColor.Decoder.decode,
          E.map(HexColor.Encoder.encode),
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
        const guard = HexColor.Guard.is
        const eq = HexColor.Eq.equals

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
      const result = HexColor.Guard.is(str)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', async (str, expectedTag) => {
      const result = await HexColor.TaskDecoder.decode(str)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = HexColor.Type.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Arbitrary', () => {
    it('generates valid HexColors', () => {
      validateArbitrary(HexColor, HexColor.isHexColor)
    })
  })
})
