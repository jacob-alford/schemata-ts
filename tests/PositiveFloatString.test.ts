import * as RA from 'fp-ts/ReadonlyArray'

import { tuple } from 'fp-ts/function'

import { Decoder, Eq, Guard, TaskDecoder, Type } from '../src/string/PositiveFloatString'

import { cat, combineExpected } from '../test-utils'

const validNumbers = ['1', '1.1', `${Math.random() + 1}`, `${Number.MAX_SAFE_INTEGER}`]

const invalidNumbers = ['-1', '-1.1', `${-Math.random()}`, `${Number.MIN_SAFE_INTEGER}`]

describe('PositiveFloatString', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
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
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Guard.is(num)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await TaskDecoder.decode(num)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Type.decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })
})
