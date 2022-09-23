import * as RA from 'fp-ts/ReadonlyArray'
import { tuple } from 'fp-ts/function'
import * as NonNegativeFloat from '../../src/number/NonNegativeFloat'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validNumbers = [0, 1, 1.1, Math.random() + 1, Number.MAX_SAFE_INTEGER]

const invalidNumbers = [
  -1,
  -1.1,
  'a',
  '2......',
  -Math.random(),
  Number.MIN_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN,
]

describe('NonNegativeFloat', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloat.Decoder.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      (num1, num2) => {
        if (!NonNegativeFloat.Guard.is(num1) || !NonNegativeFloat.Guard.is(num2))
          throw new Error('Unexpected result')
        expect(NonNegativeFloat.Eq.equals(num1, num2)).toBe(true)
      }
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloat.Guard.is(num)
      expect(result).toBe(expectedTag)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await NonNegativeFloat.TaskDecoder.decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloat.Type.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Arbitrary', () => {
    it('generates valid NonNegativeFloats', () => {
      validateArbitrary(NonNegativeFloat, NonNegativeFloat.isNonNegativeFloat)
    })
  })
})
