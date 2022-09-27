import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'

import { pipe, tuple } from 'fp-ts/function'

import * as HslColor from '../../src/string/HslColor'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validStrings = [
  'hsl(360,0000000000100%,000000100%)',
  'hsl(000010, 00000000001%, 00000040%)',
  'HSL(00000,0000000000100%,000000100%)',
  'hsL(0, 0%, 0%)',
  'hSl(  360  , 100%  , 100%   )',
  'Hsl(  00150  , 000099%  , 01%   )',
  'hsl(01080, 03%, 4%)',
  'hsl(-540, 03%, 4%)',
  'hsla(+540, 03%, 4%)',
  'hsla(+540, 03%, 4%, 500)',
  'hsl(+540deg, 03%, 4%, 500)',
  'hsl(+540gRaD, 03%, 4%, 500)',
  'hsl(+540.01e-98rad, 03%, 4%, 500)',
  'hsl(-540.5turn, 03%, 4%, 500)',
  'hsl(+540, 03%, 4%, 500e-01)',
  'hsl(+540, 03%, 4%, 500e+80)',
  'hsl(4.71239rad, 60%, 70%)',
  'hsl(270deg, 60%, 70%)',
  'hsl(200, +.1%, 62%, 1)',
  'hsl(270 60% 70%)',
  'hsl(200, +.1e-9%, 62e10%, 1)',
  'hsl(.75turn, 60%, 70%)',
  // 'hsl(200grad+.1%62%/1)', //supposed to pass, but need to handle delimiters
  'hsl(200grad +.1% 62% / 1)',
  'hsl(270, 60%, 50%, .15)',
  'hsl(270, 60%, 50%, 15%)',
  'hsl(270 60% 50% / .15)',
  'hsl(270 60% 50% / 15%)',
]

const invalidStrings = [
  'hsl (360,0000000000100%,000000100%)',
  'hsl(0260, 100 %, 100%)',
  'hsl(0160, 100%, 100%, 100 %)',
  'hsl(-0160, 100%, 100a)',
  'hsl(-0160, 100%, 100)',
  'hsl(-0160 100%, 100%, )',
  'hsl(270 deg, 60%, 70%)',
  'hsl( deg, 60%, 70%)',
  'hsl(, 60%, 70%)',
  'hsl(3000deg, 70%)',
]

describe('HslColor', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = HslColor.Decoder.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Encoder', () => {
    test.each(validStrings)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          HslColor.Decoder.decode,
          E.map(HslColor.Encoder.encode),
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
        const guard = HslColor.Guard.is
        const eq = HslColor.Eq.equals

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
      const result = HslColor.Guard.is(str)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', async (str, expectedTag) => {
      const result = await HslColor.TaskDecoder.decode(str)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = HslColor.Type.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Arbitrary', () => {
    it('generates valid HslColors', () => {
      validateArbitrary(HslColor, HslColor.isHslColor)
    })
  })
})
