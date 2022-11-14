import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'

import { pipe, tuple } from 'fp-ts/function'

import { HslColor } from '../../../src/schemata/string/HslColor'

import { getAllInstances, validateArbitrary } from '../../../test-utils'

const instances = getAllInstances(HslColor)

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
  'hsl(+540, 03%, 4%, 500e+80)',
  'hsl(+540, 03%, 4%, 500e-01)',
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
    test.each(validStrings)('validates valid string %s', str => {
      const result = instances.Decoder.decode(str)

      expect(result._tag).toBe('Right')
    })

    test.each(invalidStrings)('catches invalid string %s', str => {
      const result = instances.Decoder.decode(str)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(validStrings)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          instances.Decoder.decode,
          E.map(instances.Encoder.encode),
          E.getOrElse(() => 'invalid'),
        )

        expect(original).toEqual(roundtrip)
      },
    )
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validStrings, validStrings, tuple))(
      'determines two strings are equal',

      (str1, str2) => {
        const guard = instances.Guard.is
        const eq = instances.Eq.equals

        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }

        expect(eq(str1, str2)).toBe(true)
      },
    )
  })

  describe('Guard', () => {
    test.each(validStrings)('validates valid string %s', str => {
      const result = instances.Guard.is(str)

      expect(result).toBe(true)
    })

    test.each(invalidStrings)('catches invalid string %s', str => {
      const result = instances.Guard.is(str)

      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validStrings)('validates valid string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()

      expect(result._tag).toBe('Right')
    })

    test.each(invalidStrings)('catches invalid string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()

      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validStrings)('validates valid string %s', str => {
      const result = instances.Type.decode(str)

      expect(result._tag).toBe('Right')
    })

    test.each(invalidStrings)('catches invalid string %s', str => {
      const result = instances.Type.decode(str)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid HslColors', () => {
      validateArbitrary(instances, instances.Guard.is)
    })
  })
})
