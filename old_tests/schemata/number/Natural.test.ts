import * as E from 'fp-ts/Either'
import { unsafeCoerce } from 'fp-ts/function'

import { Natural } from '../../../src/schemata/Natural'
import { getAllInstances, validateArbitrary } from '../../../test-utils-old'

const _: (n: number) => Natural = unsafeCoerce

const { Decoder, Eq, Guard, Arbitrary, Type, Printer } = getAllInstances(Natural)

describe('Natural', () => {
  describe('Decoder', () => {
    it('catches an invalid nat', () => {
      const result = Decoder.decode(-1)
      expect(result._tag).toBe('Left')
    })
    it('validates a valid nat', () => {
      const result = Decoder.decode(1)
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar nats', () => {
      expect(Eq.equals(_(1), _(1))).toBe(true)
    })
    it('returns false for dissimilar nats', () => {
      expect(Eq.equals(_(1), _(2))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('Guards against invalid nat', () => {
      expect(Guard.is(-1.1)).toBe(false)
    })
    it('permits a valid nat', () => {
      expect(Guard.is(1)).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid nat', () => {
      const result = Type.decode(1.1)
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid nat', () => {
      const result = Type.decode(1)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid Naturals', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })

  describe('Printer', () => {
    it('prints a valid nat', () => {
      expect(Printer.domainToJson(_(1))).toStrictEqual(E.right(1))
    })
  })
})
