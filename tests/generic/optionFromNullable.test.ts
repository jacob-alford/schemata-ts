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
import * as OptionFromNullable from '../../src/generic/optionFromNullable'
import { validateArbitrary } from '../../test-utils'
import { flow } from 'fp-ts/function'

describe('OptionFromNullable', () => {
  describe('Decoder', () => {
    it('should decode null to none', () => {
      expect(OptionFromNullable.Decoder(D.string).decode(null)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromNullable.Decoder(D.string).decode('a')).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromNullable.Decoder(D.string).decode(1)._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode none to null', () => {
      expect(OptionFromNullable.Encoder(Enc.Schemable.string).encode(O.none)).toBe(null)
    })
    it('should encode some to the value', () => {
      expect(OptionFromNullable.Encoder(Enc.Schemable.string).encode(O.some('a'))).toBe(
        'a'
      )
    })
  })

  describe('Eq', () => {
    it('should return true for none and none', () => {
      expect(OptionFromNullable.Eq(Str.Eq).equals(O.none, O.none)).toBe(true)
    })
    it('should return false for none and some', () => {
      expect(OptionFromNullable.Eq(Str.Eq).equals(O.none, O.some('a'))).toBe(false)
    })
    it('should return false for some and none', () => {
      expect(OptionFromNullable.Eq(Str.Eq).equals(O.some('a'), O.none)).toBe(false)
    })
    it('should return true for some and some', () => {
      expect(OptionFromNullable.Eq(Str.Eq).equals(O.some('a'), O.some('a'))).toBe(true)
    })
    it('should return false for some and some', () => {
      expect(OptionFromNullable.Eq(Str.Eq).equals(O.some('a'), O.some('b'))).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for None', () => {
      expect(OptionFromNullable.Guard(G.string).is(O.none)).toBe(true)
    })
    it('should return true for valid values', () => {
      expect(OptionFromNullable.Guard(G.string).is(O.some('a'))).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(OptionFromNullable.Guard(G.string).is(O.some(1))).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it('should decode null to none', async () => {
      expect(await OptionFromNullable.TaskDecoder(TD.string).decode(null)()).toEqual(
        E.right(O.none)
      )
    })
    it('should decode valid values to some', async () => {
      expect(await OptionFromNullable.TaskDecoder(TD.string).decode('a')()).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", async () => {
      expect((await OptionFromNullable.TaskDecoder(TD.string).decode(1)())._tag).toBe(
        'Left'
      )
    })
  })

  describe('Type', () => {
    it('should decode none', () => {
      expect(OptionFromNullable.Type(t.string).decode(O.none)).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(OptionFromNullable.Type(t.string).decode(O.some('a'))).toEqual(
        E.right(O.some('a'))
      )
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromNullable.Type(t.string).decode(O.some(1))._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid Base64Urls', () => {
      validateArbitrary(
        { Arbitrary: OptionFromNullable.Arbitrary(Arb.string) },
        OptionFromNullable.Guard(G.string).is
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = OptionFromNullable.Arbitrary(Arb.string)
    const enc = OptionFromNullable.Encoder(Enc.Schemable.string)
    const dec = OptionFromNullable.Decoder(D.string)
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })
})
