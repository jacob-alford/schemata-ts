import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as RGB from '../../src/string/RGB'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = [
  'rgb(0,0,0)',
  'rgb(255,255,255)',
  'rgba(0,0,0,0)',
  'rgba(255,255,255,1)',
  'rgba(255,255,255,.1)',
  'rgba(255,255,255,0.1)',
  'rgb(5%,5%,5%)',
  'rgba(5%,5%,5%,.3)',
]

const invalid: ReadonlyArray<string> = [
  'rgb(0,0,0,)',
  'rgb(0,0,)',
  'rgb(0,0,256)',
  'rgb()',
  'rgba(0,0,0)',
  'rgba(255,255,255,2)',
  'rgba(255,255,255,.12)',
  'rgba(255,255,256,0.1)',
  'rgb(4,4,5%)',
  'rgba(5%,5%,5%)',
  'rgba(3,3,3%,.3)',
  'rgb(101%,101%,101%)',
  'rgba(3%,3%,101%,0.3)',
]

describe('RGB', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = RGB.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        RGB.Decoder.decode,
        E.map(RGB.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = RGB.Guard.is
        const eq = RGB.Eq.equals
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
        const result = RGB.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await RGB.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = RGB.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid RGB', () => {
      validateArbitrary(RGB, RGB.isRGB)
    })
  })
})
