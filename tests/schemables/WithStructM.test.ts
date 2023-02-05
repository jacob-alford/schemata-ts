import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as DE from 'io-ts/DecodeError'
import * as FS from 'io-ts/FreeSemigroup'

import * as Arb from '../../src/base/ArbitraryBase'
import * as D from '../../src/base/DecoderBase'
import * as Enc from '../../src/base/EncoderBase'
import * as Eq_ from '../../src/base/EqBase'
import * as G from '../../src/base/GuardBase'
import * as JS from '../../src/base/JsonSchemaBase'
import * as P from '../../src/base/PrinterBase'
import * as TD from '../../src/base/TaskDecoderBase'
import * as t from '../../src/base/TypeBase'
import { getDecoder } from '../../src/Decoder'
import { Arbitrary } from '../../src/schemables/WithStructM/instances/arbitrary'
import { Decoder } from '../../src/schemables/WithStructM/instances/decoder'
import { Encoder } from '../../src/schemables/WithStructM/instances/encoder'
import { Eq } from '../../src/schemables/WithStructM/instances/eq'
import { Guard } from '../../src/schemables/WithStructM/instances/guard'
import { JsonSchema } from '../../src/schemables/WithStructM/instances/json-schema'
import { Printer } from '../../src/schemables/WithStructM/instances/printer'
import { defineStruct } from '../../src/schemables/WithStructM/instances/schema'
import { TaskDecoder } from '../../src/schemables/WithStructM/instances/task-decoder'
import { Type } from '../../src/schemables/WithStructM/instances/type'
import * as S from '../../src/schemata'

const decodeOptionFromNullableDateFromUnix = getDecoder(
  S.OptionFromNullable(S.DateFromUnixTime),
)
const decodeOptionFromNullableString = getDecoder(S.OptionFromNullable(S.String))

describe('WithStructM', () => {
  describe('Schema', () => {
    const SomeStructSchemaBase = defineStruct(_ => ({
      a: _.required(S.String),
      b: _.optional(S.Number),
      c: pipe(_.required(S.Boolean), _.mapKeyTo('d')),
    }))
    const SomeStructSchema = S.StructM(SomeStructSchemaBase)

    it('should decode a struct with required and optional properties', () => {
      const decode = getDecoder(SomeStructSchema)
      expect(decode.decode({ a: 'a', b: 1, c: true })).toStrictEqual(
        E.right({ a: 'a', b: 1, d: true }),
      )
      expect(decode.decode({ a: 'a', c: false })).toEqual(E.right({ a: 'a', d: false }))
    })

    it('should decode with a rest param', () => {
      const decode = getDecoder(
        S.StructM(SomeStructSchemaBase, {
          extraProps: 'restParam',
          restParam: S.Natural,
        }),
      )
      expect(decode.decode({ a: 'a', b: 1, c: true, e: 6 })).toEqual(
        E.right({ a: 'a', b: 1, d: true, e: 6 }),
      )
      expect(decode.decode({ a: 'a', c: true, what: 7 })).toEqual(
        E.right({ a: 'a', d: true, what: 7 }),
      )
    })
  })
  describe('Printer', () => {
    it('should print a struct with required and optional properties with remapping', () => {
      const printer = Printer.structM(_ => ({
        a: _.required(P.string),
        b: _.optional(P.number),
        c: pipe(_.required(P.boolean), _.mapKeyTo('d')),
      }))
      expect(printer.codomainToJson({ a: 'a', b: 1, c: true })).toEqual(
        E.right({
          a: 'a',
          b: 1,
          c: true,
        }),
      )
      expect(printer.domainToJson({ a: 'a', d: false })).toEqual(
        E.right({ a: 'a', d: false }),
      )
    })
    it('strips with extraProps: error', () => {
      const printer = Printer.structM(
        _ => ({
          a: _.required(P.string),
          b: _.optional(P.number),
          c: pipe(_.required(P.boolean), _.mapKeyTo('d')),
        }),
        { extraProps: 'error' },
      )
      expect(printer.codomainToJson({ a: 'a', b: 1, c: true, d: 'what' } as any)).toEqual(
        E.right({
          a: 'a',
          b: 1,
          c: true,
        }),
      )
      expect(printer.domainToJson({ a: 'a', d: false, what: 'd' } as any)).toEqual(
        E.right({
          a: 'a',
          d: false,
        }),
      )
    })
    it('acts like strip for undefined restParam', () => {
      const printer = Printer.structM(
        _ => ({
          a: _.required(P.string),
          b: _.optional(P.number),
          c: pipe(_.required(P.boolean), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: undefined },
      )
      expect(printer.codomainToJson({ a: 'a', b: 1, c: true })).toEqual(
        E.right({
          a: 'a',
          b: 1,
          c: true,
        }),
      )
      expect(printer.domainToJson({ a: 'a', d: false })).toEqual(
        E.right({ a: 'a', d: false }),
      )
    })
    it('should print a struct with required and optional properties and additional properties', () => {
      const printer = Printer.structM(
        _ => ({
          a: _.required(P.string),
          b: _.optional(P.number),
          __proto__: {
            c: _.required(P.boolean),
          } as any,
        }),
        { extraProps: 'restParam', restParam: P.boolean },
      )
      expect(printer.domainToJson({ a: 'a', b: 1, rest: true })).toEqual(
        E.right({
          a: 'a',
          b: 1,
          rest: true,
        }),
      )
      expect(printer.codomainToJson({ a: 'a', b: 1, rest: true } as any)).toEqual(
        E.right({
          a: 'a',
          b: 1,
          rest: true,
        }),
      )
    })
  })
  describe('JsonSchema', () => {
    it('should return a json schema for a struct with required and optional properties', () => {
      const jsonSchema = JsonSchema.structM(_ => ({
        a: _.required(JS.makeStringSchema()),
        b: _.optional(JS.makeNumberSchema()),
      }))
      expect(JS.stripIdentity(jsonSchema)).toEqual({
        type: 'object',
        properties: {
          a: { type: 'string' },
          b: { type: 'number' },
        },
        required: ['a'],
      })
    })
    it('should return a json schema for a struct with required and optional properties and additional properties', () => {
      const jsonSchema = JsonSchema.structM(
        _ => ({
          a: _.required(JS.makeStringSchema()),
          b: _.optional(JS.makeNumberSchema()),
        }),
        { extraProps: 'restParam', restParam: JS.booleanSchema },
      )
      expect(JS.stripIdentity(jsonSchema)).toEqual({
        type: 'object',
        properties: {
          a: { type: 'string' },
          b: { type: 'number' },
        },
        required: ['a'],
        additionalProperties: { type: 'boolean' },
      })
    })
    it('should return a json schema for a struct with no allowed additional params', () => {
      const jsonSchema = JsonSchema.structM(
        _ => ({
          a: _.required(JS.makeStringSchema()),
          b: _.optional(JS.makeNumberSchema()),
        }),
        {
          extraProps: 'error',
        },
      )
      expect(JS.stripIdentity(jsonSchema)).toEqual({
        type: 'object',
        properties: {
          a: { type: 'string' },
          b: { type: 'number' },
        },
        required: ['a'],
        additionalProperties: false,
      })
    })
  })
  describe('Guard', () => {
    it('should guard a struct with required and optional properites', () => {
      const guard = Guard.structM(_ => ({
        a: _.required(G.Schemable.string),
        b: pipe(_.optional(G.Schemable.number), _.mapKeyTo('d')),
        c: pipe(_.required(G.Schemable.boolean), _.mapKeyTo('d')),
      }))
      expect(guard.is({ a: 'a', c: true })).toBe(false)
      expect(guard.is({ a: 'a', d: true })).toBe(true)
      expect(guard.is({ a: 'a', b: 1, c: false })).toBe(false)
      expect(guard.is({ a: 'a', b: 1, d: false })).toBe(true)
    })
    it('should guard with a custom key remap', () => {
      const guard = Guard.structM(_ => ({
        a: _.required(G.Schemable.string),
        b: _.optional(G.Schemable.number),
      }))
      expect(guard.is({ a: 'a' })).toBe(true)
      expect(guard.is({ a: 'a', b: 1 })).toBe(true)
    })
    it('should fail on extra props', () => {
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.Schemable.string),
          b: _.optional(G.Schemable.number),
        }),
        { extraProps: 'error' },
      )
      expect(guard.is({ a: 'a', b: 1, c: 'c' })).toBe(false)
    })
    it('acts like strip with undefined restParam', () => {
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.Schemable.string),
          b: _.optional(G.Schemable.number),
        }),
        { extraProps: 'restParam', restParam: undefined },
      )
      expect(guard.is({ a: 'a', b: 1, c: 'c' })).toBe(true)
    })
    it('should pass with no extra props', () => {
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.Schemable.string),
          b: _.optional(G.Schemable.number),
        }),
        { extraProps: 'error' },
      )
      expect(guard.is({ a: 'a', b: 1 })).toBe(true)
    })
    it('should fail on bad rest params', () => {
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.Schemable.string),
          b: _.optional(G.Schemable.number),
        }),
        { extraProps: 'restParam', restParam: G.Schemable.boolean },
      )
      expect(guard.is({ a: 'a', b: 1, c: 'c' })).toBe(false)
    })
    it('should guard with rest params', () => {
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.Schemable.string),
          b: _.optional(G.Schemable.number),
        }),
        { extraProps: 'restParam', restParam: G.Schemable.boolean },
      )
      expect(guard.is({ a: 'a', b: 1, c: true })).toBe(true)
    })
  })
  describe('Eq', () => {
    it('should be true for the same object', () => {
      const eq = Eq.structM(_ => ({
        a: _.required(Eq_.number),
        b: _.optional(Eq_.string),
      }))
      const a = { a: 1, b: '2' }
      expect(eq.equals(a, a)).toBe(true)
    })
    it('should be true for two equal objects', () => {
      const eq = Eq.structM(_ => ({
        a: _.required(Eq_.number),
        b: _.optional(Eq_.string),
      }))
      const a = { a: 1, b: '2' }
      const b = { a: 1, b: '2' }
      expect(eq.equals(a, b)).toBe(true)
    })
    it('should be false for two different objects', () => {
      const eq = Eq.structM(_ => ({
        a: _.required(Eq_.number),
        b: _.optional(Eq_.string),
      }))
      const a = { a: 1, b: '2' }
      const b = { a: 1, b: '3' }
      expect(eq.equals(a, b)).toBe(false)
    })
    it('should be true with rest params', () => {
      const eq = Eq.structM(
        _ => ({
          a: _.required(Eq_.number),
          b: _.optional(Eq_.string),
        }),
        { extraProps: 'restParam', restParam: Eq_.array(Eq_.boolean) },
      )
      const a = { a: 1, b: '2', c: [true, false] }
      const b = { a: 1, b: '2', c: [true, false] }
      expect(eq.equals(a, b)).toBe(true)
    })
    it('should be false with rest params', () => {
      const eq = Eq.structM(
        _ => ({
          a: _.required(Eq_.number),
          b: _.optional(Eq_.string),
        }),
        { extraProps: 'restParam', restParam: Eq_.array(Eq_.boolean) },
      )
      const a = { a: 1, b: '2', c: [true, false] }
      const b = { a: 1, b: '2', c: [true, true] }
      expect(eq.equals(a, b)).toBe(false)
    })
    it('fails fast for different number of keys', () => {
      const eq = Eq.structM(
        _ => ({
          a: _.required(Eq_.number),
          b: _.optional(Eq_.string),
        }),
        { extraProps: 'restParam', restParam: Eq_.nullable(Eq_.boolean) },
      )
      expect(
        eq.equals({ a: 1, b: '2', c: null, d: true }, { a: 1, b: '2', c: null }),
      ).toBe(false)
    })
    it('fails fast for xKey not in y', () => {
      const eq = Eq.structM(
        _ => ({
          a: _.required(Eq_.number),
          b: _.optional(Eq_.string),
        }),
        { extraProps: 'restParam', restParam: Eq_.nullable(Eq_.boolean) },
      )
      expect(
        eq.equals({ a: 1, b: '2', c: null, d: true }, { a: 1, b: '2', c: null, e: true }),
      ).toBe(false)
    })
  })
  describe('Encoder', () => {
    it('encodes a struct with required and optional properites', () => {
      const encoder = Encoder.structM(_ => ({
        a: _.required(Enc.Schemable.string),
        b: _.optional(Enc.Schemable.number),
      }))
      expect(encoder.encode({ a: 'a' })).toEqual({ a: 'a' })
      expect(encoder.encode({ a: 'a', b: 1 })).toEqual({ a: 'a', b: 1 })
    })
    it('encodes with a custom key remap', () => {
      const encoder = Encoder.structM(_ => ({
        a: _.required(Enc.Schemable.string),
        b: _.optional(Enc.Schemable.number),
        c: pipe(_.required(Enc.Schemable.string), _.mapKeyTo('d')),
      }))
      expect(encoder.encode({ a: 'a', d: 'used-to-be-c' })).toEqual({
        a: 'a',
        c: 'used-to-be-c',
      })
    })
    it('encodes with a custom key remap and a rest param', () => {
      const encoder = Encoder.structM(
        _ => ({
          a: _.required(Enc.Schemable.string),
          b: _.optional(Enc.Schemable.number),
          c: pipe(_.required(Enc.Schemable.string), _.mapKeyTo('d')),
        }),
        {
          extraProps: 'restParam',
          restParam: Enc.Schemable.array(Enc.Schemable.boolean),
        },
      )
      expect(
        encoder.encode({
          a: 'a',
          d: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
        }),
      ).toEqual({
        a: 'a',
        c: 'used-to-be-c',
        e: [true, false],
        f: [false],
        g: [],
        h: [true, true, true],
      })
    })
    it('strips additional props', () => {
      const encoder = Encoder.structM(_ => ({
        a: _.required(Enc.Schemable.string),
        b: _.optional(Enc.Schemable.number),
        c: pipe(_.required(Enc.Schemable.string), _.mapKeyTo('d')),
      }))
      const encoder2 = Encoder.structM(
        _ => ({
          a: _.required(Enc.Schemable.string),
          b: _.optional(Enc.Schemable.number),
          c: pipe(_.required(Enc.Schemable.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'error' },
      )
      expect(
        encoder.encode({
          a: 'a',
          d: 'used-to-be-c',
          somethingElse: "I'm not part of the struct",
        } as any),
      ).toEqual({
        a: 'a',
        c: 'used-to-be-c',
      })
      expect(
        encoder2.encode({
          a: 'a',
          d: 'used-to-be-c',
          somethingElse: "I'm not part of the struct",
        } as any),
      ).toEqual({
        a: 'a',
        c: 'used-to-be-c',
      })
    })
    it("behaves in a good way when there's an intersection", () => {
      const encoder = Encoder.structM(_ => ({
        a: pipe(_.required(Enc.Schemable.number), _.mapKeyTo('c')),
        b: _.optional(Enc.Schemable.number),
        c: _.required(Enc.Schemable.string),
      }))
      expect(encoder.encode({ b: 1, c: 5 })).toEqual({ b: 1, c: 5 })
    })
    it('ignores inherited properties', () => {
      const encoder = Encoder.structM(_ => ({
        a: _.required(Enc.Schemable.string),
        b: _.optional(Enc.Schemable.number),
        __proto__: {
          test: 'foo',
        } as any,
      }))
      expect(encoder.encode({ a: 'a', b: 1, __proto__: { c: '5' } } as any)).toEqual({
        a: 'a',
        b: 1,
      })
    })
  })
  describe('TaskDecoder', () => {
    const decoder = TaskDecoder.structM(_ => ({
      a: _.required(TD.string),
      b: _.optional(TD.number),
    }))
    // Here we're only taking the first union element if there is an intersection
    it("behaves as expected when there's an intersection", async () => {
      const decoder = TaskDecoder.structM(_ => ({
        a: pipe(_.required(TD.number), _.mapKeyTo('c')),
        b: _.optional(TD.number),
        c: _.required(TD.string),
      }))
      expect(await decoder.decode({ a: 1, b: 1, c: 'c' })()).toEqual({
        _tag: 'Right',
        right: { b: 1, c: 'c' },
      })
    })
    it('decodes a struct with required and optional properites', async () => {
      expect(await decoder.decode({ a: 'a' })()).toEqual({
        _tag: 'Right',
        right: { a: 'a' },
      })
      expect(await decoder.decode({ a: 'a', b: 1 })()).toEqual({
        _tag: 'Right',
        right: { a: 'a', b: 1 },
      })
    })
    it('returns a failure for missing required key', async () => {
      expect(await decoder.decode({ b: 1 })()).toEqual(
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
    it('fails for invalid value in optional key', async () => {
      expect(await decoder.decode({ a: 'a', b: 'b' })()).toEqual(
        E.left(FS.of(DE.key('b', DE.optional, FS.of(DE.leaf('b', 'number'))))),
      )
    })
    it('fails for invalid value in required key', async () => {
      expect(await decoder.decode({ a: 1, b: 1 })()).toEqual(
        E.left(FS.of(DE.key('a', DE.required, FS.of(DE.leaf(1, 'string'))))),
      )
    })
    it('decodes with a custom key remap', async () => {
      const decoder = TaskDecoder.structM(_ => ({
        a: _.required(TD.string),
        b: _.optional(TD.number),
        c: pipe(_.required(TD.string), _.mapKeyTo('d')),
      }))
      expect(await decoder.decode({ a: 'a', c: 'used-to-be-c' })()).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
      })
    })
    it('decodes with a custom key remap and a rest param', async () => {
      const decoder = TaskDecoder.structM(
        _ => ({
          a: _.required(TD.string),
          b: _.optional(TD.number),
          c: pipe(_.required(TD.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: TD.array(TD.boolean) },
      )
      expect(
        await decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
        })(),
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
    it('fails with invalid rest param', async () => {
      const decoder = TaskDecoder.structM(
        _ => ({
          a: _.required(TD.string),
          b: _.optional(TD.number),
          c: pipe(_.required(TD.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: TD.array(TD.boolean) },
      )
      expect(
        await decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          e: [true, false],
          f: [false],
          g: [],
          h: [true, true, true],
          i: 1,
        })(),
      ).toEqual(
        E.left(FS.of(DE.key('i', DE.optional, FS.of(DE.leaf(1, 'Array<unknown>'))))),
      )
    })
    it("doesn't fail without rest elements", async () => {
      const decoder = TaskDecoder.structM(
        _ => ({
          a: _.required(TD.string),
          b: _.optional(TD.number),
          c: pipe(_.required(TD.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: TD.array(TD.boolean) },
      )
      expect(await decoder.decode({ a: 'a', c: 'used-to-be-c' })()).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
      })
    })
    it('fails on additional props', async () => {
      const decoder = TaskDecoder.structM(
        _ => ({
          a: _.required(TD.string),
          b: _.optional(TD.number),
          c: pipe(_.required(TD.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'error' },
      )
      expect(
        await decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          d: "what you're not supposed to be here",
        })(),
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
    it('acts like strip if restParam is undefined', async () => {
      const decoder = TaskDecoder.structM(
        _ => ({
          a: _.required(TD.string),
          b: _.optional(TD.number),
          c: pipe(_.required(TD.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: undefined },
      )
      expect(
        await decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          d: "what you're not supposed to be here",
        })(),
      ).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
      })
    })
  })
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
    it('acts like strip if restParam is undefined', () => {
      const decoder = Decoder.structM(
        _ => ({
          a: _.required(D.string),
          b: _.optional(D.number),
          c: pipe(_.required(D.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: undefined },
      )
      expect(
        decoder.decode({
          a: 'a',
          c: 'used-to-be-c',
          d: "what you're not supposed to be here",
        }),
      ).toEqual({
        _tag: 'Right',
        right: { a: 'a', d: 'used-to-be-c' },
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
    it('generates valid values', () => {
      const arbitrary = Arbitrary.structM(_ => ({
        a: _.required(Arb.string),
        b: _.optional(Arb.number),
        c: pipe(_.required(Arb.string), _.mapKeyTo('d')),
        __proto__: { e: 'f' } as any,
      }))
      const guard = Guard.structM(_ => ({
        a: _.required(G.string),
        b: _.optional(G.number),
        c: pipe(_.required(G.string), _.mapKeyTo('d')),
        __proto__: { e: 'f' } as any,
      }))
      fc.assert(
        fc.property(arbitrary.arbitrary(fc), value => {
          expect(guard.is(value)).toBe(true)
        }),
      )
    })
    it('generates rest params', () => {
      const arbitrary = Arbitrary.structM(
        _ => ({
          a: _.required(Arb.string),
          b: _.optional(Arb.number),
          c: pipe(_.required(Arb.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: Arb.array(Arb.boolean) },
      )
      const guard = Guard.structM(
        _ => ({
          a: _.required(G.string),
          b: _.optional(G.number),
          c: pipe(_.required(G.string), _.mapKeyTo('d')),
        }),
        { extraProps: 'restParam', restParam: G.array(G.boolean) },
      )
      fc.assert(
        fc.property(arbitrary.arbitrary(fc), value => {
          expect(guard.is(value)).toBe(true)
        }),
      )
    })
  })
  describe('Type', () => {
    it("doesn't fail without rest elements", () => {
      const decoder = Type.structM(() => ({}), {
        extraProps: 'restParam',
        restParam: t.array(t.boolean),
      })
      expect(decoder.name).toBe('mappedStruct')
      expect(decoder.decode('')).toEqual({
        _tag: 'Left',
        left: [{ value: '', context: [], message: 'Type not implemented for StructM' }],
      })
    })
  })
})
