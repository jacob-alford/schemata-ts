import * as IntFromString from '../../../src/schemata/number/IntFromString'
import * as E from 'fp-ts/Either'
import { Int } from '../../../src/schemables/WithInt/definition'
import { getAllInstances, validateArbitrary } from '../../../test-utils'
import { pipe, tuple, unsafeCoerce } from 'fp-ts/function'

const _: (n: number) => Int = unsafeCoerce

const make: () => Int = () => _((Math.random() * 100000) | 0)

type TestArray = ReadonlyArray<[unknown, 2 | 8 | 10 | 16]>

const { Arbitrary, Guard } = getAllInstances(IntFromString.IntFromString())

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
  tuple('123e4', 10),
  tuple('123.4', 10),
  tuple('0b123e5', 2),
  tuple('0o123e5', 2),
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

describe('IntFromString', () => {
  describe('Decoder', () => {
    test.each(validNumbers)('validates valid int strings', (num, encodeToBase) => {
      const { Decoder } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))
      const result = Decoder.decode(num)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)(
      'invalidates invalid int strings, %s',
      (num, encodeToBase) => {
        const { Decoder } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))
        const result = Decoder.decode(num)
        expect(result._tag).toBe('Left')
      },
    )
  })
  describe('Encoder', () => {
    test.each(validNumbers)(
      'encoding a decoded value yields original value',
      (original, encodeToBase) => {
        const { Decoder, Encoder } = getAllInstances(
          IntFromString.IntFromString({ encodeToBase }),
        )
        const roundtrip = pipe(
          original,
          Decoder.decode,
          E.map(Encoder.encode),
          E.getOrElse(() => 'invalid'),
        )

        expect(roundtrip).toEqual(original)
      },
    )
    it('works with default params', () => {
      const { Decoder, Encoder } = getAllInstances(IntFromString.IntFromString())
      const original = '123'
      const roundtrip = pipe(
        original,
        Decoder.decode,
        E.map(Encoder.encode),
        E.getOrElse(() => 'invalid'),
      )

      expect(roundtrip).toEqual(original)
    })
  })
  describe('Eq', () => {
    test.each(validNumbers)('determines two numbers are equal', (num, encodeToBase) => {
      const { Eq, Guard } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))
      const n = Number(num)
      if (!Guard.is(n)) throw new Error('Unexpected result')
      expect(Eq.equals(n, n)).toBe(true)
    })
  })
  describe('Guard', () => {
    test.each(validNumbers)('validates valid numbers, %s', (num, encodeToBase) => {
      const { Guard } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))

      const n = Number(typeof num === 'string' ? num.trim() : num)
      const result = Guard.is(n)
      expect(result).toBe(true)
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', (num, encodeToBase) => {
      const { Guard } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))
      const result = Guard.is(num)
      expect(result).toBe(false)
    })
    it('guards against invalid int', () => {
      expect(Guard.is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(Guard.is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(Guard.is(1234567890123456789012345678901234567890n)).toBe(false)
    })
  })
  describe('TaskDecoder', () => {
    test.each(validNumbers)('validates valid numbers, %s', async (num, encodeToBase) => {
      const { TaskDecoder } = getAllInstances(
        IntFromString.IntFromString({ encodeToBase }),
      )

      const result = await TaskDecoder.decode(num)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)(
      'invalidates invalid numbers, %s',
      async (num, encodeToBase) => {
        const { TaskDecoder } = getAllInstances(
          IntFromString.IntFromString({ encodeToBase }),
        )

        const result = await TaskDecoder.decode(num)()
        expect(result._tag).toBe('Left')
      },
    )
  })

  describe('Type', () => {
    test.each(validNumbers)('validates valid numbers, %s', (num, encodeToBase) => {
      const { Type } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))

      const result = Type.decode(num)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidNumbers)('invalidates invalid numbers, %s', (num, encodeToBase) => {
      const { Type } = getAllInstances(IntFromString.IntFromString({ encodeToBase }))

      const result = Type.decode(num)
      expect(result._tag).toBe('Left')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NegativeFloats', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
