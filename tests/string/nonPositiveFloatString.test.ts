import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as NonPositiveFloatString from '../../src/string/nonPositiveFloatString'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid = [
  '0',
  '-1',
  '-1.1',
  `${-Math.random() - 1}`,
  `${-Number.MAX_SAFE_INTEGER}`,
  `${-Number.MAX_VALUE}`,
]

const invalid = [
  '1',
  '1.1',
  'a',
  '2......',
  `${Math.random()}`,
  `${Number.MAX_SAFE_INTEGER}`,
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
]

describe('NonPositiveFloatString', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveFloatString.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        NonPositiveFloatString.Decoder.decode,
        E.map(NonPositiveFloatString.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = NonPositiveFloatString.Guard.is
        const eq = NonPositiveFloatString.Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveFloatString.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await NonPositiveFloatString.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveFloatString.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid NonPositiveFloatString', () => {
      validateArbitrary(
        NonPositiveFloatString,
        NonPositiveFloatString.isNonPositiveFloatString
      )
    })
  })

  it('converts to a NonPositiveFloat', () => {
    const numStr = '0'
    if (!NonPositiveFloatString.Guard.is(numStr)) throw new Error('Unexpected result')
    expect(NonPositiveFloatString.toNonPositiveFloat(numStr)).toBe(0)
  })
})
