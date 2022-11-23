import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as BooleanNumber_ from '../../../src/schemata/boolean/BooleanFromNumber'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const valid: ReadonlyArray<number> = [1, 0]

const invalid: ReadonlyArray<unknown> = ['true', '1', '0']

const BooleanNumber = getAllInstances(BooleanNumber_.BooleanFromNumber)

describe('BooleanNumber', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid boolean strings %s', str => {
      const result = BooleanNumber.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid boolean strings %s', str => {
      const result = BooleanNumber.Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        BooleanNumber.Decoder.decode,
        E.map(BooleanNumber.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
    test.each([1, 0])('encoding a decoded value yields original value', original => {
      const BooleanNumber = getAllInstances(BooleanNumber_.BooleanFromNumber)

      const roundtrip = pipe(
        original,
        BooleanNumber.Decoder.decode,
        E.map(BooleanNumber.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(valid)('determines two strings are equal', str1 => {
      const test = Boolean(str1)
      const guard = BooleanNumber.Guard.is
      const eq = BooleanNumber.Eq.equals
      if (!guard(test)) {
        throw new Error('Unexpected result')
      }
      expect(eq(test, test)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(valid)('guards for booleans: %s', str => {
      const test = Boolean(str)
      const result = BooleanNumber.Guard.is(test)
      expect(result).toBe(true)
    })
    test.each(invalid)('guards against non-booleans: %s', str => {
      const result = BooleanNumber.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid boolean strings %s', async str => {
      const result = await BooleanNumber.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid boolean strings %s', async str => {
      const result = await BooleanNumber.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid strings: %s', str => {
      const result = BooleanNumber.Type.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid strings: %s', str => {
      const result = BooleanNumber.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid BooleanNumber', () => {
      validateArbitrary(BooleanNumber, BooleanNumber.Guard.is)
    })
  })
})
