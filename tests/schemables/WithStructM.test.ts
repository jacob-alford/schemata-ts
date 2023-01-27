import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as DE from 'io-ts/DecodeError'
import * as FS from 'io-ts/FreeSemigroup'

import * as Arb from '../../src/base/ArbitraryBase'
import * as D from '../../src/base/DecoderBase'
import { getDecoder } from '../../src/Decoder'
import { Arbitrary } from '../../src/schemables/WithStructM/instances/arbitrary'
import { Decoder } from '../../src/schemables/WithStructM/instances/decoder'
import * as S from '../../src/schemata'

const decodeOptionFromNullableDateFromUnix = getDecoder(
  S.OptionFromNullable(S.DateFromUnixTime),
)
const decodeOptionFromNullableString = getDecoder(S.OptionFromNullable(S.String))

describe('WithStructM', () => {
  describe('Decoder', () => {
    const decoder = Decoder.structM(_ => ({
      a: _.required(D.string),
      b: _.optional(D.number),
    }))
    // Here we're only taking the first union element if there is an intersection
    it("behaves as expected when there's an intersection", () => {
      const decoder = Decoder.structM(_ => ({
        a: pipe(_.required(D.number), _.mapKeyTo('c')),
        b: _.optional(D.number),
        c: _.required(D.string),
      }))
      expect(decoder.decode({ a: 1, b: 1, c: 'c' })).toEqual({
        _tag: 'Right',
        right: { b: 1, c: 'c' },
      })
    })
    it('decodes a struct with required and optional properites', () => {
      expect(decoder.decode({ a: 'a' })).toEqual({ _tag: 'Right', right: { a: 'a' } })
      expect(decoder.decode({ a: 'a', b: 1 })).toEqual({
        _tag: 'Right',
        right: { a: 'a', b: 1 },
      })
    })
    it('returns a failure for missing required key', () => {
      expect(decoder.decode({ b: 1 })).toEqual(
        E.left(
          FS.of(
            DE.key(
              'a',
              DE.required,
              FS.of(DE.leaf(undefined, 'Missing Required Property')),
            ),
          ),
        ),
      )
    })
    it('fails for invalid value in optional key', () => {
      expect(decoder.decode({ a: 'a', b: 'b' })).toEqual(
        E.left(FS.of(DE.key('b', DE.optional, FS.of(DE.leaf('b', 'number'))))),
      )
    })
    it('fails for invalid value in required key', () => {
      expect(decoder.decode({ a: 1, b: 1 })).toEqual(
        E.left(FS.of(DE.key('a', DE.required, FS.of(DE.leaf(1, 'string'))))),
      )
    })
    it('decodes with a custom key remap', () => {
      const decoder = Decoder.structM(_ => ({
        a: _.required(D.string),
        b: _.optional(D.number),
        c: pipe(_.required(D.string), _.mapKeyTo('d')),
      }))
      expect(decoder.decode({ a: 'a', c: 'used-to-be-c' })).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
      })
    })
    it('decodes with a custom key remap and a rest param', () => {
      const decoder = Decoder.structM(
        _ => ({
          a: _.required(D.string),
          b: _.optional(D.number),
          c: pipe(_.required(D.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: D.array(D.boolean) },
      )
      expect(
        decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
        }),
      ).toEqual({
        _tag: 'Right',
        right: {
          a: 'a',
          d: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
        },
      })
    })
    it('fails with invalid rest param', () => {
      const decoder = Decoder.structM(
        _ => ({
          a: _.required(D.string),
          b: _.optional(D.number),
          c: pipe(_.required(D.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: D.array(D.boolean) },
      )
      expect(
        decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
          i: 1,
        }),
      ).toEqual(
        E.left(FS.of(DE.key('i', DE.optional, FS.of(DE.leaf(1, 'Array<unknown>'))))),
      )
    })
    it("doesn't fail without rest elements", () => {
      const decoder = Decoder.structM(
        _ => ({
          a: _.required(D.string),
          b: _.optional(D.number),
          c: pipe(_.required(D.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: D.array(D.boolean) },
      )
      expect(decoder.decode({ a: 'a', c: 'used-to-be-c' })).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
      })
    })
    it('fails on additional props', () => {
      const decoder = Decoder.structM(
        _ => ({
          a: _.required(D.string),
          b: _.optional(D.number),
          c: pipe(_.required(D.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'error' },
      )
      expect(
        decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          d: "what you're not supposed to be here",
        }),
      ).toEqual({
        _tag: 'Left',
        left: FS.of(
          DE.wrap(
            'Encountered Unexpected Property Keys: ',
            FS.of(DE.leaf('d', 'Unexpected Property Key')),
          ),
        ),
      })
    })
    describe("Ethan's weird edge cases", () => {
      const decoder = Decoder.structM(
        _ => ({
          date: _.optional(decodeOptionFromNullableDateFromUnix),
        }),
        { extraProps: 'restParam', restParam: decodeOptionFromNullableString },
      )
      it('decodes both params', () => {
        const result = decoder.decode({ date: 367722000, dog: 'cat' })

        expect(result).toEqual({
          _tag: 'Right',
          right: {
            date: {
              _tag: 'Some',
              value: new Date(367722000000),
            },
            dog: {
              _tag: 'Some',
              value: 'cat',
            },
          },
        })
      })
      it('decodes null values', () => {
        const result = decoder.decode({ date: null, catdog: 'what' })

        expect(result).toEqual({
          _tag: 'Right',
          right: {
            date: {
              _tag: 'None',
            },
            catdog: {
              _tag: 'Some',
              value: 'what',
            },
          },
        })
      })
      it('permits optional values', () => {
        const result = decoder.decode({
          catdog: null,
        })

        expect(result).toEqual({
          _tag: 'Right',
          right: {
            catdog: {
              _tag: 'None',
            },
          },
        })
      })
    })
  })
  describe('Arbitrary', () => {
    const arbitrary = Arbitrary.structM(_ => ({
      a: _.required(Arb.string),
      b: _.optional(Arb.number),
      c: pipe(_.required(Arb.string), _.mapKeyTo('d')),
    }))
    const decoder = Decoder.structM(_ => ({
      a: _.required(D.string),
      b: _.optional(D.number),
      c: pipe(_.required(D.string), _.mapKeyTo('d')),
    }))
    it('generates valid values', () => {
      fc.assert(
        fc.property(arbitrary.arbitrary(fc), value => {
          expect(decoder.decode(value)).toEqual({
            _tag: 'Right',
            right: {
              a: value.a,
              b: value.b,
              d: value.c,
            },
          })
        }),
      )
    })
  })
})
