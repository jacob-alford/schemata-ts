import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe, tuple } from 'fp-ts/function'
import {
  Arbitrary,
  Decoder,
  Encoder,
  Eq,
  Guard,
  Schema,
  TaskDecoder,
  Type,
} from '../../src/number/floatFromString'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'
import { getDecoder } from '../../src/interpreters'

type TestArray = ReadonlyArray<[unknown, 2 | 8 | 10 | 16]>

const validNumbers: TestArray = [
  tuple('-1', 10),
  tuple('-1.1', 10),
  tuple(`${-Math.random() - 1}`, 10),
  tuple(`${Number.MIN_SAFE_INTEGER}`, 10),
  tuple('0', 10),
  tuple('1', 10),
  tuple('1.1', 10),
  tuple(`${Math.random() + 1}`, 10),
  tuple(`${Number.MAX_SAFE_INTEGER}`, 10),
  tuple('0xabc', 16),
  tuple('0b0101', 2),
  tuple('0o123', 8),
]

const invalidNumbers: TestArray = [
  tuple(`${Infinity}`, 10),
  tuple(`${-Infinity}`, 10),
  tuple(`${NaN}`, 10),
  tuple('some other string', 10),
  tuple({}, 10),
  tuple([], 10),
  tuple(null, 10),
  tuple(undefined, 10),
  tuple('', 10),
  tuple('0x', 16),
  tuple(true, 2),
  tuple(false, 8),
]

describe('floatFromString', () => {
  describe('Decoder', () => {
    test.each(
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', ([num], expectedTag) => {
      const result = Decoder().decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Encoder', () => {
    test.each(validNumbers)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          Decoder().decode,
          E.map(Encoder().encode),
          E.getOrElse(() => 'invalid'),
        )

        expect(Number(roundtrip)).toEqual(Number(original))
      },
    )
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validNumbers, validNumbers, tuple))(
      'determines two numbers are equal',
      ([num1], [num2]) => {
        const n1 = Number(num1)
        const n2 = Number(num2)
        if (!Guard().is(n1) || !Guard().is(n2)) throw new Error('Unexpected result')
        expect(Eq().equals(n1, n2)).toBe(true)
      },
    )
  })
  describe('Guard', () => {
    test.each(cat(combineExpected(validNumbers, true)))(
      'validates valid numbers, and catches bad numbers',
      ([num], expectedTag) => {
        const n = Number(typeof num === 'string' ? num.trim() : num)
        const result = Guard().is(n)
        expect(result).toBe(expectedTag)
      },
    )
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', async ([num], expectedTag) => {
      const result = await TaskDecoder().decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Type', () => {
    test.each(
      cat(
        combineExpected(validNumbers, 'Right'),
        combineExpected(invalidNumbers, 'Left'),
      ),
    )('validates valid numbers, and catches bad numbers', ([num], expectedTag) => {
      const result = Type().decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary({ Arbitrary: Arbitrary() }, Guard().is)
    })
  })

  describe('Schema', () => {
    const FloatFromString = Schema()
    it('derives a decoder', () => {
      const decoder = getDecoder(FloatFromString)
      expect(decoder.decode('NaN')._tag).toEqual('Left')
      expect(decoder.decode(`${Number.MAX_VALUE}`)).toStrictEqual(
        E.right(Number.MAX_VALUE),
      )
    })
  })
})
