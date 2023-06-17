import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as FloatFromString from '../../../src/schemata/FloatFromString'
import { getAllInstances, validateArbitrary } from '../../../test-utils-old'

const { Arbitrary, Decoder, Encoder, Eq, Guard, TaskDecoder, Type, Printer } =
  getAllInstances(FloatFromString.FloatFromString())

const validNumbers = [
  '-1',
  '-.1',
  '-1.',
  '1.',
  '.1',
  '-1.1',
  `${-Math.random() - 1}`,
  `${Number.MIN_SAFE_INTEGER}`,
  '0',
  '1',
  '1.1',
  `${Math.random() + 1}`,
  `${Number.MAX_SAFE_INTEGER}`,
  `${Number.MAX_VALUE}`,
  `${Number.MIN_VALUE}`,
  '1e-1',
  '1e1',
  '1e+1',
  '1e-1',
  '1e-3200',
  '1e+308',
]

const invalidNumbers = [
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
  'some other string',
  {},
  [],
  null,
  undefined,
  '',
  '0x',
  true,
  false,
  '1e+309',
  '1e-',
  '1e+',
]

describe('FloatFromString', () => {
  describe('Decoder', () => {
    test.each(validNumbers)('validates valid numbers, %s', num => {
      const result = Decoder.decode(num)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', num => {
      const result = Decoder.decode(num)
      expect(result._tag).toBe('Left')
    })
  })
  describe('Encoder', () => {
    test.each(validNumbers)(
      'encoding a decoded value yields original value',
      original => {
        const roundtrip = pipe(
          original,
          Decoder.decode,
          E.map(Encoder.encode),
          E.getOrElse(() => 'invalid'),
        )

        expect(Number(roundtrip)).toEqual(Number(original))
      },
    )
  })
  describe('Eq', () => {
    test.each(validNumbers)('determines two numbers are equal', num => {
      const n = Number(num)
      if (!Guard.is(n)) throw new Error('Unexpected result')
      expect(Eq.equals(n, n)).toBe(true)
    })
  })
  describe('Guard', () => {
    test.each(validNumbers)('validates valid numbers, %s', num => {
      const n = Number(typeof num === 'string' ? num.trim() : num)
      const result = Guard.is(n)
      expect(result).toBe(true)
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', num => {
      const result = Guard.is(num)
      expect(result).toBe(false)
    })
  })
  describe('TaskDecoder', () => {
    test.each(validNumbers)('validates valid numbers, %s', async num => {
      const result = await TaskDecoder.decode(num)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', async num => {
      const result = await TaskDecoder.decode(num)()
      expect(result._tag).toBe('Left')
    })
  })
  describe('Type', () => {
    test.each(validNumbers)('validates valid numbers, %s', num => {
      const result = Type.decode(num)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', num => {
      const result = Type.decode(num)
      expect(result._tag).toBe('Left')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })

  describe('Printer', () => {
    it('prints a float', () => {
      expect(Printer.domainToJson(1.2 as any)).toStrictEqual(E.right('1.2'))
    })
  })
})
