import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as NonPositiveIntString from '../../src/string/NonPositiveIntString'
import { cat, combineExpected, validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = ['-1', `${Number.MIN_SAFE_INTEGER}`, '0']

const invalid: ReadonlyArray<string> = [
  '-1.1',
  'a',
  `${-Math.random()}`,
  `${Number.MAX_SAFE_INTEGER}`,
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
]

describe('NonPositiveIntString', () => {
  describe('Decoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveIntString.Decoder.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        NonPositiveIntString.Decoder.decode,
        E.map(NonPositiveIntString.Encoder.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = NonPositiveIntString.Guard.is
        const eq = NonPositiveIntString.Eq.equals
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
        const result = NonPositiveIntString.Guard.is(str)
        expect(result).toBe(expectedTag)
      }
    )
  })

  describe('TaskDecoder', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid string, and catches bad string',
      async (str, expectedTag) => {
        const result = await NonPositiveIntString.TaskDecoder.decode(str)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Type', () => {
    test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = NonPositiveIntString.Type.decode(str)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid NonPositiveIntString', () => {
      validateArbitrary(NonPositiveIntString, NonPositiveIntString.isNonPositiveIntString)
    })
  })

  it('converts to a NonPositiveInt', () => {
    const numStr = '0'
    if (!NonPositiveIntString.Guard.is(numStr)) throw new Error('Unexpected result')
    expect(NonPositiveIntString.toNonPositiveInt(numStr)).toBe(0)
  })
})
