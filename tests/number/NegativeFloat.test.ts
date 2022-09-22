import * as RA from 'fp-ts/ReadonlyArray'
import { tuple } from 'fp-ts/function'
import * as NegativeFloat from '../../src/number/NegativeFloat'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validNumbers = [-1, -1.1, -Math.random() - 1, Number.MIN_SAFE_INTEGER]

const invalidNumbers = [
  0,
  1,
  1.1,
  '2......',
  'a',
  Math.random(),
  Number.MAX_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN,
]

describe('NegativeFloat', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NegativeFloat.Decoder.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      (num1, num2) => {
        if (!NegativeFloat.Guard.is(num1) || !NegativeFloat.Guard.is(num2))
          throw new Error('Unexpected result')
        expect(NegativeFloat.Eq.equals(num1, num2)).toBe(true)
      }
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NegativeFloat.Guard.is(num)
      expect(result).toBe(expectedTag)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await NegativeFloat.TaskDecoder.decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NegativeFloat.Type.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary(NegativeFloat, NegativeFloat.isNegativeFloat)
    })
  })
})
