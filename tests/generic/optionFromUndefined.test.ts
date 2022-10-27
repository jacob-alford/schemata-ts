import * as D from 'io-ts/Decoder'
import * as Enc from '../../src/internal/EncoderBase'
import * as Arb from '../../src/internal/ArbitraryBase'
import * as G from 'io-ts/Guard'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as fc from 'fast-check'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Str from 'fp-ts/string'
import * as SC from '../../src/internal/SchemaBase'
import { getDecoder } from '../../src/interpreters'
import * as OptionFromUndefined from '../../src/generic/optionFromUndefined'
import { validateArbitrary } from '../../test-utils'
import { flow } from 'fp-ts/function'

describe('OptionFromUndefined', () => {
  describe('Decoder', () => {
    it('should decode null to none', () => {
      expect(OptionFromUndefined.Decoder(D.string).decode(undefined)).toEqual(
        E.right(O.none)
      )
    })
    it('should decode valid values to some', () => {
      expect(OptionFromUndefined.Decoder(D.string).decode('a')).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromUndefined.Decoder(D.string).decode(1)._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode none to null', () => {
      expect(OptionFromUndefined.Encoder(Enc.Schemable.string).encode(O.none)).toBe(
        undefined
      )
    })
    it('should encode some to the value', () => {
      expect(OptionFromUndefined.Encoder(Enc.Schemable.string).encode(O.some('a'))).toBe(
        'a'
      )
    })
  })

  describe('Eq', () => {
    it('should return true for none and none', () => {
      expect(OptionFromUndefined.Eq(Str.Eq).equals(O.none, O.none)).toBe(true)
    })
    it('should return false for none and some', () => {
      expect(OptionFromUndefined.Eq(Str.Eq).equals(O.none, O.some('a'))).toBe(false)
    })
    it('should return false for some and none', () => {
      expect(OptionFromUndefined.Eq(Str.Eq).equals(O.some('a'), O.none)).toBe(false)
    })
    it('should return true for some and some', () => {
      expect(OptionFromUndefined.Eq(Str.Eq).equals(O.some('a'), O.some('a'))).toBe(true)
    })
    it('should return false for some and some', () => {
      expect(OptionFromUndefined.Eq(Str.Eq).equals(O.some('a'), O.some('b'))).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for None', () => {
      expect(OptionFromUndefined.Guard(G.string).is(O.none)).toBe(true)
    })
    it('should return true for valid values', () => {
      expect(OptionFromUndefined.Guard(G.string).is(O.some('a'))).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(OptionFromUndefined.Guard(G.string).is(O.some(1))).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode null to none', async () => {
      expect(
        await OptionFromUndefined.TaskDecoder(TD.string).decode(undefined)()
      ).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', async () => {
      expect(await OptionFromUndefined.TaskDecoder(TD.string).decode('a')()).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", async () => {
      expect((await OptionFromUndefined.TaskDecoder(TD.string).decode(1)())._tag).toBe(
        'Left'
      )
    })
  })

  describe('Type', () => {
    it('should decode none', () => {
      expect(OptionFromUndefined.Type(t.string).decode(O.none)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromUndefined.Type(t.string).decode(O.some('a'))).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromUndefined.Type(t.string).decode(O.some(1))._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid options', () => {
      validateArbitrary(
        { Arbitrary: OptionFromUndefined.Arbitrary(Arb.string) },
        OptionFromUndefined.Guard(G.string).is
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = OptionFromUndefined.Arbitrary(Arb.string)
    const enc = OptionFromUndefined.Encoder(Enc.Schemable.string)
    const dec = OptionFromUndefined.Decoder(D.string)
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })

  describe('Schema', () => {
    const Schema = OptionFromUndefined.Schema(SC.String)
    it('derives a decoder', () => {
      const decoder = getDecoder(Schema)
      expect(decoder.decode(undefined)).toEqual(E.right(O.none))
      expect(decoder.decode('a')).toEqual(E.right(O.some('a')))
    })
  })
})
