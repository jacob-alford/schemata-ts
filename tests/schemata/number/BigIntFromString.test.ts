import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'

import * as BigIntString_ from '../../../src/schemata/number/BigIntFromString'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const valid: ReadonlyArray<string> = ['0', '10', '-1', '11']

const invalid: ReadonlyArray<string> = [
  '5.5',
  '-5.5',
  '',
  ' ',
  'a',
  'a5',
  '1n',
  '0x',
  '0b',
  '0o',
]

const BigIntString = getAllInstances(BigIntString_.BigIntFromString())

describe('BigIntString', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid bigint strings %s', str => {
      const result = BigIntString.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid bigint strings %s', str => {
      const result = BigIntString.Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        BigIntString.Decoder.decode,
        E.map(BigIntString.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
    test.each([tuple('0xabc', 16), tuple('0b101', 2), tuple('0o123', 8)])(
      'encoding a decoded value yields original value',
      (original, base) => {
        const BigIntString = getAllInstances(
          BigIntString_.BigIntFromString({ encodeToBase: base as 2 | 8 | 16 }),
        )

        const roundtrip = pipe(
          original,
          BigIntString.Decoder.decode,
          E.map(BigIntString.Encoder.encode),
          E.getOrElseW(() => 'unexpected'),
        )
        expect(original).toEqual(roundtrip)
      },
    )
  })

  describe('Eq', () => {
    test.each(valid)('determines two strings are equal', str1 => {
      const test = BigInt(str1)
      const guard = BigIntString.Guard.is
      const eq = BigIntString.Eq.equals
      if (!guard(test)) {
        throw new Error('Unexpected result')
      }
      expect(eq(test, test)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(valid)('guards for bigints: %s', str => {
      const test = BigInt(str)
      const result = BigIntString.Guard.is(test)
      expect(result).toBe(true)
    })
    test.each(invalid)('guards against non-bigints: %s', str => {
      const result = BigIntString.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid bigint strings %s', async str => {
      const result = await BigIntString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid bigint strings %s', async str => {
      const result = await BigIntString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid strings: %s', str => {
      const result = BigIntString.Type.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid strings: %s', str => {
      const result = BigIntString.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid BigIntString', () => {
      validateArbitrary(BigIntString, BigIntString.Guard.is)
    })
  })

  describe('Printer', () => {
    test.each(valid)('prints valid bigint strings %s', str => {
      const result = BigIntString.Printer.domainToJson(BigInt(str))
      expect(result).toEqual(E.right(str))
    })
  })
})
