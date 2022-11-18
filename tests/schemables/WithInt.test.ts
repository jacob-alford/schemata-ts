import { unsafeCoerce } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { getDecoder } from '../../src/interpreters'
import * as Int from '../../src/schemables/WithInt'
import { validateArbitrary } from '../../test-utils'

const _: (n: number) => Int.Int = unsafeCoerce

const make: () => Int.Int = () => _((Math.random() * 100000) | 0)

describe('Int', () => {
  describe('Decoder', () => {
    it('catches an invalid int', () => {
      const result = Int.Decoder.int().decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid int', () => {
      const result = Int.Decoder.int().decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar ints', () => {
      const test = make()
      expect(Int.Eq.int().equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar ints', () => {
      expect(Int.Eq.int().equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid int', () => {
      expect(Int.Guard.int().is(1.1)).toBe(false)
    })
    it('permits a valid int', () => {
      expect(Int.Guard.int().is(make())).toBe(true)
    })
    it('protects against bigints', () => {
      expect(Int.Guard.int().is(1234567890123456789012345678901234567890n)).toBe(false)
    })
  })
  describe('Type', () => {
    it('decodes an invalid int', () => {
      const result = Int.Type.int().decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid int', () => {
      const result = Int.Type.int().decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid Ints', () => {
      validateArbitrary({ Arbitrary: Int.Arbitrary.int() }, Int.isInt())
    })
  })

  describe('Schema', () => {
    const IntSchema = Int.Schema()
    it('derives a decoder', () => {
      const decoder = getDecoder(IntSchema)
      expect(decoder.decode(Infinity)._tag).toEqual('Left')
      expect(decoder.decode(Number.MAX_SAFE_INTEGER)).toStrictEqual(
        E.right(Number.MAX_SAFE_INTEGER),
      )
    })
  })
})
