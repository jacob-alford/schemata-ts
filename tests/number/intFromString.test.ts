import { unsafeCoerce } from 'fp-ts/function'
import * as IntFromString from '../../src/number/intFromString'
import * as Int from '../../src/number/int'
import { validateArbitrary } from '../../test-utils'

const _: (n: number) => Int.Int = unsafeCoerce

const make: () => Int.Int = () => _((Math.random() * 100000) | 0)

describe('Int', () => {
  describe('Decoder', () => {
    it('catches an invalid int', () => {
      const result = IntFromString.Decoder().decode('some-string')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid int', () => {
      const result = IntFromString.Decoder().decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Encoder', () => {
    it('encodes a valid int', () => {
      const value = make()
      const result = IntFromString.Encoder().encode(value)
      expect(result).toBe(value.toString())
    })
  })
  describe('Eq', () => {
    it('returns true for similar ints', () => {
      const test = make()
      expect(IntFromString.Eq().equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar ints', () => {
      expect(IntFromString.Eq().equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid int', () => {
      expect(IntFromString.Guard().is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(IntFromString.Guard().is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(IntFromString.Guard().is(1234567890123456789012345678901234567890n)).toBe(
        false
      )
    })
  })
  describe('TaskDecoder', () => {
    it('catches an invalid int', async () => {
      const result = await IntFromString.TaskDecoder().decode('some-string')()
      expect(result._tag).toBe('Left')
    })
    it('validates a valid int', async () => {
      const result = await IntFromString.TaskDecoder().decode(make())()
      expect(result._tag).toBe('Right')
    })
  })
  describe('Type', () => {
    it('decodes an invalid int', () => {
      const result = IntFromString.Type().decode('so12341asdb')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid int', () => {
      const result = IntFromString.Type().decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid Ints', () => {
      validateArbitrary({ Arbitrary: IntFromString.Arbitrary() }, Int.isInt())
    })
  })
})
