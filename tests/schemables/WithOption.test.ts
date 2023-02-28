import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import * as D from 'io-ts/Decoder'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'

import * as Arb from '../../src/Arbitrary'
import * as Enc from '../../src/base/EncoderBase'
import * as P from '../../src/base/PrinterBase'
import * as SC from '../../src/base/SchemaBase'
import { getDecoder } from '../../src/Decoder'
import { getPrinter } from '../../src/Printer'
import { IntFromString } from '../../src/schemata'
import { validateArbitrary } from '../../test-utils'
import * as OptionFromExclude from '../../test-utils/schemable-exports/WithOption'

describe('OptionFromExclude', () => {
  describe('Decoder', () => {
    it('should decode empty string to none', () => {
      expect(
        OptionFromExclude.Decoder.optionFromExclude('', D.string).decode(''),
      ).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', () => {
      expect(
        OptionFromExclude.Decoder.optionFromExclude('', D.string).decode('non-empty'),
      ).toEqual(E.right(O.some('non-empty')))
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(
        OptionFromExclude.Decoder.optionFromExclude('', D.string).decode(null)._tag,
      ).toBe('Left')
    })
  })

  describe('Encoder', () => {
    it('should encode none to empty string', () => {
      expect(
        OptionFromExclude.Encoder.optionFromExclude('', Enc.Schemable.string).encode(
          O.none,
        ),
      ).toBe('')
    })
    it('should encode some to the value', () => {
      expect(
        OptionFromExclude.Encoder.optionFromExclude(
          '' as string,
          Enc.Schemable.string,
        ).encode(O.some('a')),
      ).toBe('a')
    })
  })

  describe('Eq', () => {
    it('should return true for none and none', () => {
      expect(
        OptionFromExclude.Eq.optionFromExclude('', Str.Eq).equals(O.none, O.none),
      ).toBe(true)
    })
    it('should return false for none and some', () => {
      expect(
        OptionFromExclude.Eq.optionFromExclude('' as string, Str.Eq).equals(
          O.none,
          O.some('a'),
        ),
      ).toBe(false)
    })
    it('should return false for some and none', () => {
      expect(
        OptionFromExclude.Eq.optionFromExclude('' as string, Str.Eq).equals(
          O.some('a'),
          O.none,
        ),
      ).toBe(false)
    })
    it('should return true for some and some', () => {
      expect(
        OptionFromExclude.Eq.optionFromExclude('' as string, Str.Eq).equals(
          O.some('a'),
          O.some('a'),
        ),
      ).toBe(true)
    })
    it('should return false for some and some', () => {
      expect(
        OptionFromExclude.Eq.optionFromExclude('' as string, Str.Eq).equals(
          O.some('a'),
          O.some('b'),
        ),
      ).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true for None', () => {
      expect(OptionFromExclude.Guard.optionFromExclude('', G.string).is(O.none)).toBe(
        true,
      )
    })
    it('should return true for valid values', () => {
      expect(
        OptionFromExclude.Guard.optionFromExclude('', G.string).is(O.some('a')),
      ).toBe(true)
    })
    it('should return false for invalid values', () => {
      expect(OptionFromExclude.Guard.optionFromExclude('', G.string).is(O.some(1))).toBe(
        false,
      )
    })
  })

  describe('TaskDecoder', () => {
    it('should decode empty string to none', async () => {
      expect(
        await OptionFromExclude.TaskDecoder.optionFromExclude('', TD.string).decode('')(),
      ).toEqual(E.right(O.none))
    })
    it('should decode valid values to some', async () => {
      expect(
        await OptionFromExclude.TaskDecoder.optionFromExclude('', TD.string).decode(
          'a',
        )(),
      ).toEqual(E.right(O.some('a')))
    })
    it("should decode invalid values to left('invalid')", async () => {
      expect(
        (await OptionFromExclude.TaskDecoder.optionFromExclude('', TD.string).decode(1)())
          ._tag,
      ).toBe('Left')
    })
  })

  describe('Type', () => {
    it('should decode none', () => {
      expect(OptionFromExclude.Type.optionFromExclude('', t.string).decode('')).toEqual(
        E.right(O.none),
      )
    })
    it('should decode valid values to some', () => {
      expect(OptionFromExclude.Type.optionFromExclude('', t.string).decode('a')).toEqual(
        E.right(O.some('a')),
      )
    })
    it("should decode invalid values to left('invalid')", () => {
      expect(OptionFromExclude.Type.optionFromExclude('', t.string).decode(1)._tag).toBe(
        'Left',
      )
    })
  })

  describe('Arbitrary', () => {
    it('generates valid options', () => {
      validateArbitrary(
        { Arbitrary: OptionFromExclude.Arbitrary.optionFromExclude('', Arb.string) },
        OptionFromExclude.Guard.optionFromExclude('', G.string).is,
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = OptionFromExclude.Arbitrary.optionFromExclude(
      '' as string,
      Arb.string,
    ).arbitrary(fc)
    const enc = OptionFromExclude.Encoder.optionFromExclude(
      '' as string,
      Enc.Schemable.string,
    )
    const dec = OptionFromExclude.Decoder.optionFromExclude('' as string, D.string)
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })

  describe('Schema', () => {
    const Schema = OptionFromExclude.Schema('', SC.String)
    it('derives a decoder', () => {
      const decoder = getDecoder(Schema)
      expect(decoder.decode('')).toEqual(E.right(O.none))
      expect(decoder.decode('a')).toEqual(E.right(O.some('a')))
    })
  })

  describe('Printer', () => {
    it('should print none', () => {
      expect(
        OptionFromExclude.Printer.optionFromExclude(
          0 as any,
          getPrinter(IntFromString()),
        ).domainToJson(O.some(1 as any)),
      ).toStrictEqual(E.right('1'))
      expect(
        OptionFromExclude.Printer.optionFromExclude(
          0 as any,
          getPrinter(IntFromString()),
        ).domainToJson(O.none),
      ).toStrictEqual(E.right('0'))
      expect(
        OptionFromExclude.Printer.optionFromExclude(
          0 as any,
          getPrinter(IntFromString()),
        ).codomainToJson(''),
      ).toStrictEqual(E.right(''))
    })
    it('should print some', () => {
      expect(
        OptionFromExclude.Printer.optionFromExclude('', P.string).domainToJson(
          O.some('a'),
        ),
      ).toStrictEqual(E.right('a'))
      expect(
        OptionFromExclude.Printer.optionFromExclude('', P.string).codomainToJson(''),
      ).toStrictEqual(E.right(''))
    })
  })
})
