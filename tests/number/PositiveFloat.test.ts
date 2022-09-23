import * as RA from 'fp-ts/ReadonlyArray'
import { tuple } from 'fp-ts/function'
import * as PositiveFloat from '../../src/number/PositiveFloat'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validNumbers = [1, 1.1, Math.random() + 1, Number.MAX_SAFE_INTEGER]

const invalidNumbers = [
  0,
  -1,
  -1.1,
  '2......',
  'a',
  -Math.random(),
  Number.MIN_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN,
]

describe('PositiveFloat', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloat.Decoder.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      (num1, num2) => {
        if (!PositiveFloat.Guard.is(num1) || !PositiveFloat.Guard.is(num2))
          throw new Error('Unexpected result')
        expect(PositiveFloat.Eq.equals(num1, num2)).toBe(true)
      }
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloat.Guard.is(num)
      expect(result).toBe(expectedTag)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await PositiveFloat.TaskDecoder.decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloat.Type.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Arbitrary', () => {
    it('generates valid PositiveFloats', () => {
      validateArbitrary(PositiveFloat, PositiveFloat.isPositiveFloat)
    })
  })
})
