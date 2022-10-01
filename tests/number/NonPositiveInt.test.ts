import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as NonPositiveInt from '../../src/number/NonPositiveInt'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<number> = [-1, Number.MIN_SAFE_INTEGER, 0]

const invalid: ReadonlyArray<number> = [
  -1.1,
  -Math.random(),
  Number.MAX_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN,
]

describe('NonPositiveInt', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid numbers, and catches bad numbers',
      (str, expectedTag) => {
        const result = NonPositiveInt.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        NonPositiveInt.Decoder.decode,
        E.map(NonPositiveInt.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two numbers are equal',
      (str1, str2) => {
        const guard = NonPositiveInt.Guard.is
        const eq = NonPositiveInt.Eq.equals
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
        const result = NonPositiveInt.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid number, and catches bad number',
      async (str, expectedTag) => {
        const result = await NonPositiveInt.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveInt.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid NonPositiveInt', () => {
      validateArbitrary(NonPositiveInt, NonPositiveInt.isNonPositiveInt)
    })
  })
})
