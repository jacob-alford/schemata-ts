import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import * as SC from '../../../src/base/SchemaBase'
import * as OptionFromUndefined_ from '../../../src/schemata/generic/OptionFromUndefined'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const OptionFromUndefined = getAllInstances(
  OptionFromUndefined_.OptionFromUndefined(SC.String),
)

describe('OptionFromUndefined', () => {
  describe('Decoder', () => {
    it('should decode null to none', () => {
      expect(OptionFromUndefined.Decoder.decode(undefined)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromUndefined.Decoder.decode('a')).toEqual(E.right(O.some('a')))
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromUndefined.Decoder.decode(1)._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode none to null', () => {
      expect(OptionFromUndefined.Encoder.encode(O.none)).toBe(undefined)
    })
    it('should encode some to the value', () => {
      expect(OptionFromUndefined.Encoder.encode(O.some('a'))).toBe('a')
    })
  })

  describe('Eq', () => {
    it('should return true for none and none', () => {
      expect(OptionFromUndefined.Eq.equals(O.none, O.none)).toBe(true)
    })
    it('should return false for none and some', () => {
      expect(OptionFromUndefined.Eq.equals(O.none, O.some('a'))).toBe(false)
    })
    it('should return false for some and none', () => {
      expect(OptionFromUndefined.Eq.equals(O.some('a'), O.none)).toBe(false)
    })
    it('should return true for some and some', () => {
      expect(OptionFromUndefined.Eq.equals(O.some('a'), O.some('a'))).toBe(true)
    })
    it('should return false for some and some', () => {
      expect(OptionFromUndefined.Eq.equals(O.some('a'), O.some('b'))).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for None', () => {
      expect(OptionFromUndefined.Guard.is(O.none)).toBe(true)
    })
    it('should return true for valid values', () => {
      expect(OptionFromUndefined.Guard.is(O.some('a'))).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(OptionFromUndefined.Guard.is(O.some(1))).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode null to none', async () => {
      expect(await OptionFromUndefined.TaskDecoder.decode(undefined)()).toEqual(
        E.right(O.none),
      )
    })
    it('should decode valid values to some', async () => {
      expect(await OptionFromUndefined.TaskDecoder.decode('a')()).toEqual(
        E.right(O.some('a')),
      )
    })
    it("should decode invalid values to left('invalid')", async () => {
      expect((await OptionFromUndefined.TaskDecoder.decode(1)())._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    it('should decode none', () => {
      expect(OptionFromUndefined.Type.decode(undefined)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromUndefined.Type.decode('a')).toEqual(E.right(O.some('a')))
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromUndefined.Type.decode(1)._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid options', () => {
      validateArbitrary(
        { Arbitrary: OptionFromUndefined.Arbitrary },
        OptionFromUndefined.Guard.is,
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = OptionFromUndefined.Arbitrary.arbitrary(fc)
    const enc = OptionFromUndefined.Encoder
    const dec = OptionFromUndefined.Decoder
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })

  describe('printer', () => {
    it('fails on undefined', () => {
      expect(OptionFromUndefined.Printer.domainToJson(O.none)).toStrictEqual(
        E.right(undefined),
      )
      expect(OptionFromUndefined.Printer.codomainToJson(undefined)).toStrictEqual(
        E.right(undefined),
      )
    })
    it("should print 'some(a)'", () => {
      expect(OptionFromUndefined.Printer.domainToJson(O.some('a'))).toStrictEqual(
        E.right('a'),
      )
      expect(OptionFromUndefined.Printer.codomainToJson('a')).toStrictEqual(E.right('a'))
    })
  })
})
