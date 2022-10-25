import * as RA from 'fp-ts/ReadonlyArray'
import { tuple } from 'fp-ts/function'
import {
  Decoder,
  Encoder,
  Eq,
  Guard,
  Arbitrary,
  Type,
  TaskDecoder,
} from '../../src/number/floatFromString'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const validNumbers = [
  '-1',
  '-1.1',
  `${-Math.random() - 1}`,
  `${Number.MIN_SAFE_INTEGER}`,
  '0',
  '1',
  '1.1',
  `${Math.random() + 1}`,
  `${Number.MAX_SAFE_INTEGER}`,
]

const invalidNumbers = [`${Infinity}`, `${-Infinity}`, `${NaN}`, 'some other string']

describe('floatFromString', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Decoder().decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Encoder', () => {
    const value = Math.random()
    if (!Guard().is(value)) throw new Error('Unexpected result')
    const encoded = Encoder().encode(value)
    expect(encoded).toBe(value.toString())
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      (num1, num2) => {
        const n1 = Number(num1)
        const n2 = Number(num2)
        if (!Guard().is(n1) || !Guard().is(n2)) throw new Error('Unexpected result')
        expect(Eq().equals(n1, n2)).toBe(true)
      }
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validNumbers, true), combineExpected(invalidNumbers, false))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const n = Number(num)
      const result = Guard().is(n)
      expect(result).toBe(expectedTag)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async (num, expectedTag) => {
      const result = await TaskDecoder().decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', (num, expectedTag) => {
      const result = Type().decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary({ Arbitrary: Arbitrary() }, Guard().is)
    })
  })
})
