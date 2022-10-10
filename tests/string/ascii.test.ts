import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe, tuple } from 'fp-ts/function'
import * as ASCII from '../../src/string/ascii'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = [
  'foobar',
  '0987654321',
  'test@example.com',
  '1234abcDEF',
]

const invalid: ReadonlyArray<string> = ['ｆｏｏbar', 'ｘｙｚ０９８', '１２３456', 'ｶﾀｶﾅ']

describe('ASCII', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = ASCII.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        ASCII.Decoder.decode,
        E.map(ASCII.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = ASCII.Guard.is
        const eq = ASCII.Eq.equals
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
        const result = ASCII.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await ASCII.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = ASCII.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid ASCII', () => {
      validateArbitrary(ASCII, ASCII.isAscii)
    })
  })
})
