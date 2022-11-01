import * as E from 'fp-ts/Either'
import * as D from '../../src/internal/DecoderBase'
import * as G from '../../src/internal/GuardBase'
import * as TD from '../../src/internal/TaskDecoderBase'
import * as Enc from '../../src/internal/EncoderBase'
import * as Eq from '../../src/internal/EqBase'
import * as t from '../../src/internal/TypeBase'
import * as Arb from '../../src/internal/ArbitraryBase'
import { pipe } from 'fp-ts/function'
import * as WithPadding from '../../src/schemables/WithPadding'
import { validateArbitrary } from '../../test-utils'

const modulus = 4
const char = '='

const validL: ReadonlyArray<string> = ['a===', 'ab==', 'abc=', 'abcd']
const invalidL: ReadonlyArray<string> = ['a', 'ab', 'abc', 'abcd=']

const validR: ReadonlyArray<string> = ['===a', '==ab', '=abc', 'abcd']
const invalidR: ReadonlyArray<string> = ['a', 'ab', 'abc', 'abcd=']

const decoderL = WithPadding.Decoder.padLeft(modulus, char)(D.string)
const decoderR = WithPadding.Decoder.padRight(modulus, char)(D.string)

const eqL = WithPadding.Eq.padLeft(modulus, char)(Eq.string)
const eqR = WithPadding.Eq.padRight(modulus, char)(Eq.string)

const encoderL = WithPadding.Encoder.padLeft(modulus, char)(Enc.Schemable.string)
const encoderR = WithPadding.Encoder.padRight(modulus, char)(Enc.Schemable.string)

const guardL = WithPadding.Guard.padLeft(modulus, char)(G.string)
const guardR = WithPadding.Guard.padRight(modulus, char)(G.string)

const taskDecoderL = WithPadding.TaskDecoder.padLeft(modulus, char)(TD.string)
const taskDecoderR = WithPadding.TaskDecoder.padRight(modulus, char)(TD.string)

const typeL = WithPadding.Type.padLeft(modulus, char)(t.string)
const typeR = WithPadding.Type.padRight(modulus, char)(t.string)

const arbitraryL = WithPadding.Arbitrary.padLeft(modulus, char)(Arb.string)
const arbitraryR = WithPadding.Arbitrary.padRight(modulus, char)(Arb.string)

describe('WithPadding', () => {
  describe('Decoder', () => {
    test.each(validL)('validates valid strings, %s', str => {
      expect(decoderL.decode(str)).toStrictEqual(E.right(str))
    })
    test.each(invalidL)('invalidates invalid strings, %s', str => {
      expect(decoderL.decode(str)._tag).toBe('Left')
    })
    test.each(validR)('validates valid strings, %s', str => {
      expect(decoderR.decode(str)).toStrictEqual(E.right(str))
    })
    test.each(invalidR)('invalidates invalid strings, %s', str => {
      expect(decoderR.decode(str)._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(validL)('encoding a decoded value yields original value, %s', original => {
      const roundtrip = pipe(
        original,
        decoderL.decode,
        E.map(encoderL.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
    test.each(validR)('encoding a decoded value yields original value, %s', original => {
      const roundtrip = pipe(
        original,
        decoderR.decode,
        E.map(encoderR.encode),
        E.getOrElseW(() => 'unexpected')
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(validL)('determines two strings are equal, %s', str1 => {
      if (!guardL.is(str1)) {
        throw new Error('Unexpected result')
      }
      expect(eqL.equals(str1, str1)).toBe(true)
    })
    test.each(validR)('determines two strings are equal, %s', str1 => {
      if (!guardR.is(str1)) {
        throw new Error('Unexpected result')
      }
      expect(eqR.equals(str1, str1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(validL)('validates validly padded strings, %s', str => {
      const result = guardL.is(str)
      expect(result).toBe(true)
    })
    test.each(validR)('validates validly padded strings, %s', str => {
      const result = guardR.is(str)
      expect(result).toBe(true)
    })
    test.each(invalidL)('invalidates invalidly padded strings, %s', str => {
      const result = guardL.is(str)
      expect(result).toBe(false)
    })
    test.each(invalidR)('invalidates invalidly padded strings, %s', str => {
      const result = guardR.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validL)('validates valid strings, %s', async str => {
      const result = await taskDecoderL.decode(str)()
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(validR)('validates valid strings, %s', async str => {
      const result = await taskDecoderR.decode(str)()
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(invalidL)('invalidates invalid strings, %s', async str => {
      const result = await taskDecoderL.decode(str)()
      expect(result._tag).toBe('Left')
    })
    test.each(invalidR)('invalidates invalid strings, %s', async str => {
      const result = await taskDecoderR.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validL)('validates valid strings, %s', str => {
      expect(typeL.decode(str)).toStrictEqual(E.right(str))
    })
    test.each(invalidL)('invalidates invalid strings, %s', str => {
      expect(typeL.decode(str)._tag).toBe('Left')
    })
    test.each(validR)('validates valid strings, %s', str => {
      expect(typeR.decode(str)).toStrictEqual(E.right(str))
    })
    test.each(invalidR)('invalidates invalid strings, %s', str => {
      expect(typeR.decode(str)._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates validly left padded strings', () => {
      validateArbitrary({ Arbitrary: arbitraryL }, guardL.is)
    })
    it('generates validly right padded strings', () => {
      validateArbitrary({ Arbitrary: arbitraryR }, guardR.is)
    })
  })
})
