import * as D from 'io-ts/Decoder'
import * as Enc from '../../src/base/EncoderBase'
import * as Arb from '../../src/base/ArbitraryBase'
import * as G from 'io-ts/Guard'
import * as E from 'fp-ts/Either'
import * as TD from 'io-ts/TaskDecoder'
import * as fc from 'fast-check'
import * as t from 'io-ts/Type'
import * as Str from 'fp-ts/string'
import * as MapFromEntries from '../../src/schemables/WithMap'
import * as SC from '../../src/base/SchemaBase'
import { getDecoder } from '../../src/interpreters'
import { validateArbitrary } from '../../test-utils'
import { flow } from 'fp-ts/function'

describe('MapFromEntries', () => {
  describe('Decoder', () => {
    it("should decode empty array to empty map'", () => {
      expect(
        MapFromEntries.Decoder.mapFromEntries(Str.Ord, D.string, D.string).decode([]),
      ).toStrictEqual(E.right(new Map()))
    })
    it('should decode valid values to map', () => {
      expect(
        MapFromEntries.Decoder.mapFromEntries(Str.Ord, D.string, D.string).decode([
          ['a', 'b'],
          ['c', 'd'],
        ]),
      ).toStrictEqual(
        E.right(
          new Map([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ),
      )
    })
  })

  describe('Encoder', () => {
    it('should encode empty map to empty array', () => {
      expect(
        MapFromEntries.Encoder.mapFromEntries(
          Str.Ord,
          Enc.Schemable.string,
          Enc.Schemable.string,
        ).encode(new Map()),
      ).toStrictEqual([])
    })
    it('should encode map to array', () => {
      expect(
        MapFromEntries.Encoder.mapFromEntries(
          Str.Ord,
          Enc.Schemable.string,
          Enc.Schemable.string,
        ).encode(
          new Map([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ),
      ).toStrictEqual([
        ['a', 'b'],
        ['c', 'd'],
      ])
    })
  })

  describe('Eq', () => {
    it('should return true for empty maps', () => {
      expect(
        MapFromEntries.Eq.mapFromEntries(Str.Ord, Str.Eq, Str.Eq).equals(
          new Map(),
          new Map(),
        ),
      ).toBe(true)
    })
    it('should return false for empty map and non-empty map', () => {
      expect(
        MapFromEntries.Eq.mapFromEntries(Str.Ord, Str.Eq, Str.Eq).equals(
          new Map(),
          new Map([['a', 'b']]),
        ),
      ).toBe(false)
    })
    it('should return false for non-empty map and empty map', () => {
      expect(
        MapFromEntries.Eq.mapFromEntries(Str.Ord, Str.Eq, Str.Eq).equals(
          new Map([['a', 'b']]),
          new Map(),
        ),
      ).toBe(false)
    })
    it('should return true for equal maps', () => {
      expect(
        MapFromEntries.Eq.mapFromEntries(Str.Ord, Str.Eq, Str.Eq).equals(
          new Map([['a', 'b']]),
          new Map([['a', 'b']]),
        ),
      ).toBe(true)
    })
    it('should return false for non-equal maps', () => {
      expect(
        MapFromEntries.Eq.mapFromEntries(Str.Ord, Str.Eq, Str.Eq).equals(
          new Map([['a', 'b']]),
          new Map([['a', 'c']]),
        ),
      ).toBe(false)
    })
  })

  describe('Guard', () => {
    it('should return true map', () => {
      expect(
        MapFromEntries.Guard.mapFromEntries(Str.Ord, G.string, G.string).is(new Map()),
      ).toBe(true)
    })
    it('should return false a non map', () => {
      expect(
        MapFromEntries.Guard.mapFromEntries(Str.Ord, G.string, G.string).is([]),
      ).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    it("should decode empty array to empty map'", async () => {
      expect(
        await MapFromEntries.TaskDecoder.mapFromEntries(
          Str.Ord,
          TD.string,
          TD.string,
        ).decode([])(),
      ).toStrictEqual(E.right(new Map()))
    })
    it('should decode valid values to map', async () => {
      expect(
        await MapFromEntries.TaskDecoder.mapFromEntries(
          Str.Ord,
          TD.string,
          TD.string,
        ).decode([
          ['a', 'b'],
          ['c', 'd'],
        ])(),
      ).toStrictEqual(
        E.right(
          new Map([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ),
      )
    })
  })

  describe('Type', () => {
    it('should decode empty array to empty map', () => {
      expect(
        MapFromEntries.Type.mapFromEntries(Str.Ord, t.string, t.string).decode([]),
      ).toStrictEqual(E.right(new Map()))
    })
    it('should decode valid values to map', () => {
      expect(
        MapFromEntries.Type.mapFromEntries(Str.Ord, t.string, t.string).decode([
          ['a', 'b'],
          ['c', 'd'],
        ]),
      ).toStrictEqual(
        E.right(
          new Map([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ),
      )
    })
  })

  describe('Arbitrary', () => {
    it('generates valid readonly maps', () => {
      validateArbitrary(
        {
          Arbitrary: MapFromEntries.Arbitrary.mapFromEntries(
            Str.Ord,
            Arb.string,
            Arb.string,
          ),
        },
        MapFromEntries.Guard.mapFromEntries(Str.Ord, G.string, G.string).is,
      )
    })
  })

  it('round trips decoder <=> encoder', () => {
    const arb = MapFromEntries.Arbitrary.mapFromEntries(Str.Ord, Arb.string, Arb.string)
    const enc = MapFromEntries.Encoder.mapFromEntries(
      Str.Ord,
      Enc.Schemable.string,
      Enc.Schemable.string,
    )
    const dec = MapFromEntries.Decoder.mapFromEntries(Str.Ord, D.string, D.string)
    fc.assert(fc.property(arb, flow(enc.encode, dec.decode, E.isRight)))
  })

  describe('Schema', () => {
    const Schema = MapFromEntries.Schema.mapFromEntries(Str.Ord, SC.String, SC.String)
    it('derives a decoder', () => {
      const decoder = getDecoder(Schema)
      expect(decoder.decode([])).toStrictEqual(E.right(new Map()))
      expect(
        decoder.decode([
          ['a', 'b'],
          ['c', 'd'],
        ]),
      ).toStrictEqual(
        E.right(
          new Map([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ),
      )
    })
  })
})
