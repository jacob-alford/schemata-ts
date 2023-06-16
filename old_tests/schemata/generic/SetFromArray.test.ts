import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as Str from 'fp-ts/string'

import * as SC from '../../../src/base/SchemaBase'
import * as _ from '../../../src/schemata/SetFromArray'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const SetFromArray = getAllInstances(_.SetFromArray(Str.Ord)(SC.String))

describe('SetFromArray', () => {
  describe('Decoder', () => {
    it('should decode to a set from an array', () => {
      expect(SetFromArray.Decoder.decode(['', ''])).toEqual(E.right(new Set([''])))
    })
  })

  describe('Encoder', () => {
    it('should encode to an array', () => {
      expect(SetFromArray.Encoder.encode(new Set(['']))).toStrictEqual([''])
    })
  })

  describe('Eq', () => {
    it('should return true for array equality', () => {
      expect(SetFromArray.Eq.equals(new Set(['a']), new Set(['a']))).toBe(true)
    })
    it('should return false for array inequality', () => {
      expect(SetFromArray.Eq.equals(new Set(['a']), new Set(['b']))).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for valid values', () => {
      expect(SetFromArray.Guard.is(new Set(['a']))).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(SetFromArray.Guard.is(null)).toBe(false)
    })
    it('should return false for invalid values', () => {
      expect(SetFromArray.Guard.is(new Set([69n]))).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode to a set from an array', async () => {
      expect(await SetFromArray.TaskDecoder.decode(['a'])()).toEqual(
        E.right(new Set(['a'])),
      )
    })
  })

  describe('Type', () => {
    it('should decode to a set from an array', () => {
      expect(SetFromArray.Type.decode(['a'])).toEqual(E.right(new Set(['a'])))
    })
  })

  describe('Arbitrary', () => {
    it('generates valito a set from an array', () => {
      validateArbitrary({ Arbitrary: SetFromArray.Arbitrary }, SetFromArray.Guard.is)
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = SetFromArray.Arbitrary.arbitrary(fc)
    const enc = SetFromArray.Encoder
    const dec = SetFromArray.Decoder
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })
})
