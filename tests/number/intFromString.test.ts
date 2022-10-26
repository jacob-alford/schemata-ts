import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe, tuple, unsafeCoerce } from 'fp-ts/function'
import {
  Decoder,
  Encoder,
  Eq,
  Guard,
  Arbitrary,
  Type,
  TaskDecoder,
} from '../../src/number/intFromString'
import * as Int from '../../src/number/int'

import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const _: (n: number) => Int.Int = unsafeCoerce

const make: () => Int.Int = () => _((Math.random() * 100000) | 0)

type TestArray = ReadonlyArray<[unknown, 2 | 8 | 10 | 16]>

const validNumbers: TestArray = [
  tuple('-1', 10),
  tuple(`${Number.MIN_SAFE_INTEGER}`, 10),
  tuple('0', 10),
  tuple('1', 10),
  tuple(`${Number.MAX_SAFE_INTEGER}`, 10),
  tuple('0xabc', 16),
  tuple('0b101', 2),
  tuple('0o123', 8),
]

const invalidNumbers: TestArray = [
  tuple(`${Math.random() + 1}`, 10),
  tuple('1.1', 10),
  tuple(`${-Math.random() - 1}`, 10),
  tuple('-1.1', 10),
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

describe('intFromString', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', ([num], expectedTag) => {
      const result = Decoder().decode(num)
      expect(result._tag).toBe(expectedTag)
    })
  })
  describe('Encoder', () => {
    test.each(validNumbers)(
      'encoding a decoded value yields original value',
      (original, encodeToBase) => {
        const roundtrip = pipe(
          original,
          Decoder({ encodeToBase }).decode,
          E.map(Encoder({ encodeToBase }).encode),
          E.getOrElse(() => 'invalid')
        )

        expect(roundtrip).toEqual(original)
      }
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
      }
    )
  })
  describe('Guard', () => {
    test.each(cat(combineExpected(validNumbers, true)))(
      'validates valid numbers, and catches bad numbers',
      ([num], expectedTag) => {
        const n = Number(typeof num === 'string' ? num.trim() : num)
        const result = Guard().is(n)
        expect(result).toBe(expectedTag)
      }
    )
    it('guards against invalid int', () => {
      expect(Guard().is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(Guard().is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(Guard().is(1234567890123456789012345678901234567890n)).toBe(false)
    })
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
    )('validates valid numbers, and catches bad numbers', async ([num], expectedTag) => {
      const result = await TaskDecoder().decode(num)()
      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validNumbers, 'Right'), combineExpected(invalidNumbers, 'Left'))
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
})
