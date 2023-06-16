import { tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

import { NegativeFloat } from '../../../src/schemata/NegativeFloat'
import {
  cat,
  combineExpected,
  getAllInstances,
  validateArbitrary,
} from '../../../test-utils'

const { Decoder, Eq, Guard, Arbitrary, Type, TaskDecoder } =
  getAllInstances(NegativeFloat)

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
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Decoder.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      (num1, num2) => {
        if (!Guard.is(num1) || !Guard.is(num2)) throw new Error('Unexpected result')
        expect(Eq.equals(num1, num2)).toBe(true)
      },
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false)),
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Guard.is(num)
      expect(result).toBe(expectedTag)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await TaskDecoder.decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Type.decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
