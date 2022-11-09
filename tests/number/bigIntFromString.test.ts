import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getDecoder } from '../../src/interpreters'
import * as BigIntString from '../../src/number/bigIntFromString'
import { validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = ['0', '10', '-1', '11']

const invalid: ReadonlyArray<string> = ['5.5', '-5.5', '', ' ', 'a', 'a5', '1n']

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

  describe('Schema', () => {
    const Float = BigIntString.Schema
    it('derives a decoder', () => {
      const decoder = getDecoder(Float)
      expect(decoder.decode('abc')._tag).toEqual('Left')
      expect(decoder.decode('123456789')).toStrictEqual(E.right(123456789n))
    })
  })
})
