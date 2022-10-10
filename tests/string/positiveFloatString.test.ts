import * as RA from 'fp-ts/ReadonlyArray'

import { tuple } from 'fp-ts/function'

import * as PositiveFloatString from '../../src/string/positiveFloatString'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validNumbers = ['1', '1.1', `${Math.random() + 1}`, `${Number.MAX_SAFE_INTEGER}`]

const invalidNumbers = [
  '0',
  '-1',
  '1.1.1.1',
  '2......',
  'a',
  '-1.1',
  `${-Math.random()}`,
  `${Number.MIN_SAFE_INTEGER}`,
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
]

describe('PositiveFloatString', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloatString.Decoder.decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',

      (num1, num2) => {
        if (!PositiveFloatString.Guard.is(num1) || !PositiveFloatString.Guard.is(num2))
          throw new Error('Unexpected result')

        expect(PositiveFloatString.Eq.equals(num1, num2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloatString.Guard.is(num)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await PositiveFloatString.TaskDecoder.decode(num)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = PositiveFloatString.Type.decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })
  it('converts to a PositiveFloat', () => {
    const numStr = '1.1'
    if (!PositiveFloatString.Guard.is(numStr)) throw new Error('Unexpected result')
    expect(PositiveFloatString.toPositiveFloat(numStr)).toBe(1.1)
  })

  describe('Arbitrary', () => {
    it('generates valid PositiveFloatStrings', () => {
      validateArbitrary(PositiveFloatString, PositiveFloatString.isPositiveFloatString)
    })
  })
})
