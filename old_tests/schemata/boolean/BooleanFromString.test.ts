import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as BooleanString_ from '../../../src/schemata/BooleanFromString'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const valid: ReadonlyArray<string> = ['true', 'false']

const invalid: ReadonlyArray<string> = [
  'treu',
  '1',
  'flase',
  '0',
  'TRUE',
  'FALSE',
  'True',
  'False',
]

const BooleanString = getAllInstances(BooleanString_.BooleanFromString)

describe('BooleanString', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid boolean strings %s', str => {
      const result = BooleanString.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid boolean strings %s', str => {
      const result = BooleanString.Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        BooleanString.Decoder.decode,
        E.map(BooleanString.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
    test.each(['true', 'false'])(
      'encoding a decoded value yields original value',
      original => {
        const BooleanString = getAllInstances(BooleanString_.BooleanFromString)

        const roundtrip = pipe(
          original,
          BooleanString.Decoder.decode,
          E.map(BooleanString.Encoder.encode),
          E.getOrElseW(() => 'unexpected'),
        )
        expect(original).toEqual(roundtrip)
      },
    )
  })

  describe('Eq', () => {
    test.each(valid)('determines two strings are equal', str1 => {
      const test = Boolean(str1)
      const guard = BooleanString.Guard.is
      const eq = BooleanString.Eq.equals
      if (!guard(test)) {
        throw new Error('Unexpected result')
      }
      expect(eq(test, test)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(valid)('guards for booleans: %s', str => {
      const test = Boolean(str)
      const result = BooleanString.Guard.is(test)
      expect(result).toBe(true)
    })
    test.each(invalid)('guards against non-booleans: %s', str => {
      const result = BooleanString.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid boolean strings %s', async str => {
      const result = await BooleanString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid boolean strings %s', async str => {
      const result = await BooleanString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid strings: %s', str => {
      const result = BooleanString.Type.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid strings: %s', str => {
      const result = BooleanString.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid BooleanString', () => {
      validateArbitrary(BooleanString, BooleanString.Guard.is)
    })
  })

  describe('Printer', () => {
    test.each(valid)('prints valid boolean strings %s', str => {
      const print = BooleanString.Printer.domainToJson
      const printLeft = BooleanString.Printer.codomainToJson
      const expected = str === 'true'
      expect(print(expected)).toStrictEqual(E.right(str))
      expect(printLeft(str)).toStrictEqual(E.right(str))
    })
  })
})
