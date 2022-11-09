import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as LatLong from '../../src/string/latLong'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = [
  '(-17.738223, 85.605469)',
  '(-12.3456789, +12.3456789)',
  '(-60.978437, -0.175781)',
  '(77.719772, -37.529297)',
  '(7.264394, 165.058594)',
  '0.955766, -19.863281',
  '(31.269161,164.355469)',
  '+12.3456789, -12.3456789',
  '-15.379543, -137.285156',
  '(11.770570, -162.949219)',
  '-55.034319, 113.027344',
  '58.025555, 36.738281',
  '55.720923,-28.652344',
  '-90.00000,-180.00000',
  '(-71, -146)',
  '(-71.616864, -146.616864)',
  '-0.55, +0.22',
  '90, 180',
  '+90, -180',
  '-90,+180',
  '90,180',
  '0, 0',
]

const invalid: ReadonlyArray<string> = [
  '(020.000000, 010.000000000)',
  '89.9999999989, 360.0000000',
  '90.1000000, 180.000000',
  '+90.000000, -180.00001',
  '090.0000, 0180.0000',
  '126, -158',
  '(-126.400010, -158.400010)',
  '-95, -96',
  '-95.738043, -96.738043',
  '137, -148',
  '(-137.5942, -148.5942)',
  '(-120, -203)',
  '(-119, -196)',
  '+119.821728, -196.821728',
  '(-110, -223)',
  '-110.369532, 223.369532',
  '(-120.969949, +203.969949)',
  '-116, -126',
  '-116.894222, -126.894222',
  '-112, -160',
  '-112.96381, -160.96381',
  '-90., -180.',
  '+90.1, -180.1',
  '(-17.738223, 85.605469',
  '0.955766, -19.863281)',
  '+,-',
  '(,)',
  ',',
  ' ',
]

describe('LatLong', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = LatLong.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      },
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        LatLong.Decoder.decode,
        E.map(LatLong.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = LatLong.Guard.is
        const eq = LatLong.Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      },
    )
  })

  describe('Guard', () => {
    test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = LatLong.Guard.is(str)
        expect(result).toBe(expectedTag)
      },
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await LatLong.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      },
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = LatLong.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      },
    )
  })
  // TODO: fix small exponentials from being generated
  describe('Arbitrary', () => {
    it('generates valid LatLong', () => {
      validateArbitrary(LatLong, LatLong.isLatLong)
    })
  })
})
