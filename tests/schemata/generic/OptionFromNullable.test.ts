import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as G from 'io-ts/Guard'

import * as SC from '../../../src/base/SchemaBase'
import * as OptionFromNullable_ from '../../../src/schemata/generic/OptionFromNullable'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const OptionFromNullable = getAllInstances(
  OptionFromNullable_.OptionFromNullable(G.string)(SC.String),
)

describe('OptionFromNullable', () => {
  describe('Decoder', () => {
    it('should decode null to none', () => {
      expect(OptionFromNullable.Decoder.decode(null)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromNullable.Decoder.decode('a')).toEqual(E.right(O.some('a')))
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromNullable.Decoder.decode(1)._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode none to null', () => {
      expect(OptionFromNullable.Encoder.encode(O.none)).toBe(null)
    })
    it('should encode some to the value', () => {
      expect(OptionFromNullable.Encoder.encode(O.some('a'))).toBe('a')
    })
  })

  describe('Eq', () => {
    it('should return true for none and none', () => {
      expect(OptionFromNullable.Eq.equals(O.none, O.none)).toBe(true)
    })
    it('should return false for none and some', () => {
      expect(OptionFromNullable.Eq.equals(O.none, O.some('a'))).toBe(false)
    })
    it('should return false for some and none', () => {
      expect(OptionFromNullable.Eq.equals(O.some('a'), O.none)).toBe(false)
    })
    it('should return true for some and some', () => {
      expect(OptionFromNullable.Eq.equals(O.some('a'), O.some('a'))).toBe(true)
    })
    it('should return false for some and some', () => {
      expect(OptionFromNullable.Eq.equals(O.some('a'), O.some('b'))).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for None', () => {
      expect(OptionFromNullable.Guard.is(O.none)).toBe(true)
    })
    it('should return true for valid values', () => {
      expect(OptionFromNullable.Guard.is(O.some('a'))).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(OptionFromNullable.Guard.is(O.some(1))).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode null to none', async () => {
      expect(await OptionFromNullable.TaskDecoder.decode(null)()).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', async () => {
      expect(await OptionFromNullable.TaskDecoder.decode('a')()).toEqual(
        E.right(O.some('a')),
      )
    })
    it("should decode invalid values to left('invalid')", async () => {
      expect((await OptionFromNullable.TaskDecoder.decode(1)())._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    it('should decode none', () => {
      expect(OptionFromNullable.Type.decode(null)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromNullable.Type.decode('a')).toEqual(E.right(O.some('a')))
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromNullable.Type.decode(1)._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid options', () => {
      validateArbitrary(
        { Arbitrary: OptionFromNullable.Arbitrary },
        OptionFromNullable.Guard.is,
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = OptionFromNullable.Arbitrary
    const enc = OptionFromNullable.Encoder
    const dec = OptionFromNullable.Decoder
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })
})
