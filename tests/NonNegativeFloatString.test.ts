import * as RA from 'fp-ts/ReadonlyArray'

import { tuple } from 'fp-ts/function'

import * as NonNegativeFloatString from '../src/string/NonNegativeFloatString'

import { cat, combineExpected, validateArbitrary } from '../test-utils'

const validNumbers = [
  '0',
  '1',
  '1.1',
  `${Math.random() + 1}`,
  `${Number.MAX_SAFE_INTEGER}`,
]

const invalidNumbers = [
  '-1',
  'a',
  '-1.1',
  '-1.1.1.1.1',
  '2......',
  `${-Math.random()}`,
  `${Number.MIN_SAFE_INTEGER}`,
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
]

describe('NonNegativeFloatString', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloatString.Decoder.decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',

      (num1, num2) => {
        if (
          !NonNegativeFloatString.Guard.is(num1) ||
          !NonNegativeFloatString.Guard.is(num2)
        )
          throw new Error('Unexpected result')

        expect(NonNegativeFloatString.Eq.equals(num1, num2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloatString.Guard.is(num)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await NonNegativeFloatString.TaskDecoder.decode(num)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = NonNegativeFloatString.Type.decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })
  it('converts to a NonNegativeFloat', () => {
    const numStr = '0'
    if (!NonNegativeFloatString.Guard.is(numStr)) throw new Error('Unexpected result')
    expect(NonNegativeFloatString.toNonNegativeFloat(numStr)).toBe(0)
  })

  describe('Arbitrary', () => {
    it('generates valid NonNegativeFloatStrings', () => {
      validateArbitrary(
        NonNegativeFloatString,
        NonNegativeFloatString.isNonNegativeFloatString
      )
    })
  })
})
