import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

import * as SC from '../../../src/base/SchemaBase'
import * as _ from '../../../src/schemata/generic/NonEmptyArray'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const NonEmptyArray = getAllInstances(_.NonEmptyArray(SC.String))

describe('NonEmptyArray', () => {
  describe('Decoder', () => {
    it('should decode a non-empty array', () => {
      expect(NonEmptyArray.Decoder.decode([''])).toEqual(E.right(['']))
    })
    it('should fail to decode an empty array', () => {
      expect(NonEmptyArray.Decoder.decode([])._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode to an array', () => {
      expect(NonEmptyArray.Encoder.encode([''])).toStrictEqual([''])
    })
  })

  describe('Eq', () => {
    it('should return true for array equality', () => {
      expect(NonEmptyArray.Eq.equals(['a'], ['a'])).toBe(true)
    })
    it('should return false for array inequality', () => {
      expect(NonEmptyArray.Eq.equals(['a'], ['b'])).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for valid values', () => {
      expect(NonEmptyArray.Guard.is(['a'])).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(NonEmptyArray.Guard.is([])).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode a non-empty array', async () => {
      expect(await NonEmptyArray.TaskDecoder.decode(['a'])()).toEqual(E.right(['a']))
    })
    it('should fail to decode an empty array', async () => {
      expect((await NonEmptyArray.TaskDecoder.decode([])())._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    it('should decode a non-empty array', () => {
      expect(NonEmptyArray.Type.decode(['a'])).toEqual(E.right(['a']))
    })
    it('should fail to decode an empty array', () => {
      expect(NonEmptyArray.Type.decode([])._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid non-empty array', () => {
      validateArbitrary({ Arbitrary: NonEmptyArray.Arbitrary }, NonEmptyArray.Guard.is)
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = NonEmptyArray.Arbitrary.arbitrary(fc)
    const enc = NonEmptyArray.Encoder
    const dec = NonEmptyArray.Decoder
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })
})
