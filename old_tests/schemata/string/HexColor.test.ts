import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import { HexColor as HexColor_ } from '../../../src/schemata/HexColor'
import { getAllInstances, validateArbitrary } from '../../../test-utils-old'

const HexColor = getAllInstances(HexColor_)

const validStrings = ['#ff0000ff', '#ff0034', '#CCCCCC', '0f38', 'fff', '#f00']

const invalidStrings = ['#ff', 'fff0a', '#ff12FG', '#bbh']

describe('HexColor', () => {
  describe('Decoder', () => {
    test.each(validStrings)('validates valid hexcolor strings: %s', str => {
      const result = HexColor.Decoder.decode(str)

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid hexcolor strings: %s', str => {
      const result = HexColor.Decoder.decode(str)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(validStrings)(
      'encoding a decoded value yields original value: %s',
      original => {
        const roundtrip = pipe(
          original,
          HexColor.Decoder.decode,
          E.map(HexColor.Encoder.encode),
          E.getOrElse(() => 'invalid'),
        )

        expect(original).toEqual(roundtrip)
      },
    )
  })

  describe('Eq', () => {
    test.each(validStrings)('determines two strings are equal', str1 => {
      const guard = HexColor.Guard.is
      const eq = HexColor.Eq.equals

      if (!guard(str1)) {
        throw new Error('Unexpected result')
      }

      expect(eq(str1, str1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(validStrings)('validates valid hexcolor strings: %s', str => {
      const result = HexColor.Guard.is(str)
      expect(result).toBe(true)
    })
    test.each(invalidStrings)('invalidates invalid hexcolor strings: %s', str => {
      const result = HexColor.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validStrings)('validates valid hex color strings: %s', async str => {
      const result = await HexColor.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid hex color strings: %s', async str => {
      const result = await HexColor.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validStrings)('validates valid strings: %s', str => {
      const result = HexColor.Type.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid strings: %s', str => {
      const result = HexColor.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid HexColors', () => {
      validateArbitrary(HexColor, HexColor.Guard.is)
    })
  })
})
