import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe, tuple } from 'fp-ts/function'
import { Ascii } from '../../../src/schemata/string/Ascii'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const valid: ReadonlyArray<string> = [
  'foobar',
  '0987654321',
  'test@example.com',
  '1234abcDEF',
]

const invalid: ReadonlyArray<string> = ['ｆｏｏbar', 'ｘｙｚ０９８', '１２３456', 'ｶﾀｶﾅ']

describe('instances', () => {
  const instances = getAllInstances(Ascii)

  describe('Decoder', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid string %s', str => {
      const result = instances.Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value (%s)', original => {
      const roundtrip = pipe(
        original,
        instances.Decoder.decode,
        E.map(instances.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings (%s) are equal',
      (str1, str2) => {
        const guard = instances.Guard.is
        const eq = instances.Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Guard.is(str)
      expect(result).toBe(true)
    })

    test.each(invalid)('catches invalid string %s', str => {
      const result = instances.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid string %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid instances', () => {
      validateArbitrary(instances, instances.Guard.is)
    })
  })
})
