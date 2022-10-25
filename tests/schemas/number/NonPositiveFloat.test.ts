import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import { NonPositiveFloat } from '../../../src/schemas/number/NonPositiveFloat'
import {
  cat,
  combineExpected,
  getAllInstances,
  validateArbitrary,
} from '../../../test-utils'

const { Encoder, Decoder, Eq, Guard, Arbitrary, Type, TaskDecoder } =
  getAllInstances(NonPositiveFloat)

const valid = [
  0,
  -1,
  -1.1,
  -Math.random() - 1,
  -Number.MAX_SAFE_INTEGER,
  -Number.MAX_VALUE,
]

const invalid = [
  1,
  1.1,
  'a',
  '2......',
  Math.random(),
  Number.MAX_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN,
]

describe('NonPositiveFloat', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid numbers, and catches bad numbers',
      (str, expectedTag) => {
        const result = Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        Decoder.decode,
        E.map(Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two numbers are equal',
      (str1, str2) => {
        const guard = Guard.is
        const eq = Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
      'validates valid numbers, and catches bad numbers',
      (str, expectedTag) => {
        const result = Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid number, and catches bad number',
      async (str, expectedTag) => {
        const result = await TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid NonPositiveFloat', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
