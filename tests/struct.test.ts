import { expectTypeOf } from 'expect-type'
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as G from 'schemata-ts/Guard'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getDecoder } from 'schemata-ts/Decoder'
import { getEncoder } from 'schemata-ts/Encoder'
import { getGuard } from 'schemata-ts/Guard'

import * as S from '../src/schemata'
import * as s from '../src/struct'

const testStruct = s.defineStruct({
  a: s.required(S.String),
  b: s.optional(S.Number),
  c: s.mapKeyTo('e')(s.required(S.Boolean)),
  d: s.mapKeyTo('f')(s.optional(S.Unknown)),
})

const plainStruct = s.struct({
  a: S.String,
  b: S.BooleanFromNumber,
})

interface CapitalizeLambda extends s.KeyRemapLambda {
  readonly output: Capitalize<this['input']>
}

const capitalize: (s: string) => string = s =>
  `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`

const capsTestStruct = pipe(
  testStruct,
  s.mapKeysWith<CapitalizeLambda>(capitalize),
  S.StructM,
)

const testStructMixed = s.defineStruct({
  foo_bar: s.required(S.String),
  'foo-baz': s.optional(S.Number),
  'Bar Qux': s.mapKeyTo('eeby_deeby')(s.required(S.Boolean)),
  fooBar: s.mapKeyTo('deeby---eeby')(s.optional(S.Boolean)),
})

const testStructCamel = s.camelCaseKeys(testStructMixed)

describe('type-level tests', () => {
  describe('camel case keys', () => {
    test('camelCaseKeys2', () => {
      const encoder = getEncoder(S.StructM(testStructCamel))
      expectTypeOf<typeof encoder>().toEqualTypeOf<
        Enc.Encoder<
          { foo_bar: string; 'foo-baz'?: number; 'Bar Qux': boolean; fooBar?: boolean },
          { fooBar: string; fooBaz?: number; eebyDeeby: boolean; deebyEeby?: boolean }
        >
      >()
    })
    test('camelCaseKeys2c', () => {
      const decoder = getDecoder(S.StructM(testStructCamel))
      expectTypeOf<typeof decoder>().toEqualTypeOf<
        D.Decoder<
          unknown,
          { fooBar: string; fooBaz?: number; eebyDeeby: boolean; deebyEeby?: boolean }
        >
      >()
    })
    test('camelCaseKeys1', () => {
      const guard = getGuard(S.StructM(testStructCamel))
      expectTypeOf<typeof guard>().toEqualTypeOf<
        G.Guard<
          unknown,
          { fooBar: string; fooBaz?: number; eebyDeeby: boolean; deebyEeby?: boolean }
        >
      >()
    })
  })
  describe('remap keys', () => {
    test('remapKeys2', () => {
      const encoder = getEncoder(capsTestStruct)
      expectTypeOf<typeof encoder>().toEqualTypeOf<
        Enc.Encoder<
          { a: string; b?: number; c: boolean; d?: unknown },
          { A: string; B?: number; E: boolean; F?: unknown }
        >
      >()
    })
    test('remapKeys2c', () => {
      const decoder = getDecoder(capsTestStruct)
      expectTypeOf<typeof decoder>().toEqualTypeOf<
        D.Decoder<unknown, { A: string; B?: number; E: boolean; F?: unknown }>
      >()
    })
    test('remapKeys1', () => {
      const guard = getGuard(capsTestStruct)
      expectTypeOf<typeof guard>().toEqualTypeOf<
        G.Guard<unknown, { A: string; B?: number; E: boolean; F?: unknown }>
      >()
    })
  })
  describe('struct', () => {
    test('struct2', () => {
      const struct = getEncoder(S.StructM(plainStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        Enc.Encoder<{ a: string; b: number }, { a: string; b: boolean }>
      >()
    })
    test('struct2c', () => {
      const struct = getDecoder(S.StructM(plainStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        D.Decoder<unknown, { a: string; b: boolean }>
      >()
    })
    test('struct1', () => {
      const struct = getGuard(S.StructM(plainStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        G.Guard<unknown, { a: string; b: boolean }>
      >()
    })
  })
  describe('defineStruct', () => {
    test('defineStruct2', () => {
      const struct = getEncoder(S.StructM(testStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        Enc.Encoder<
          { a: string; b?: number; c: boolean; d?: unknown },
          { a: string; b?: number; e: boolean; f?: unknown }
        >
      >()
    })
    test('defineStruct2c', () => {
      const struct = getDecoder(S.StructM(testStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        D.Decoder<unknown, { a: string; b?: number; e: boolean; f?: unknown }>
      >()
    })
    test('defineStruct1', () => {
      const struct = getGuard(S.StructM(testStruct))
      expectTypeOf<typeof struct>().toEqualTypeOf<
        G.Guard<unknown, { a: string; b?: number; e: boolean; f?: unknown }>
      >()
    })
  })
  describe('partial', () => {
    test('partial2', () => {
      const partial = getEncoder(S.StructM(s.partial(testStruct)))
      expectTypeOf<typeof partial>().toEqualTypeOf<
        Enc.Encoder<
          { a?: string; b?: number; c?: boolean; d?: unknown },
          { a?: string; b?: number; e?: boolean; f?: unknown }
        >
      >()
    })
    test('partial2c', () => {
      const partial = getDecoder(S.StructM(s.partial(testStruct)))
      expectTypeOf<typeof partial>().toEqualTypeOf<
        D.Decoder<unknown, { a?: string; b?: number; e?: boolean; f?: unknown }>
      >()
    })
    test('partial1', () => {
      const partial = getGuard(S.StructM(s.partial(testStruct)))
      expectTypeOf<typeof partial>().toEqualTypeOf<
        G.Guard<unknown, { a?: string; b?: number; e?: boolean; f?: unknown }>
      >()
    })
  })
  describe('complete', () => {
    test('complete2', () => {
      const required = getEncoder(S.StructM(s.complete(testStruct)))
      expectTypeOf<typeof required>().toEqualTypeOf<
        Enc.Encoder<
          { a: string; b: number; c: boolean; d: unknown },
          { a: string; b: number; e: boolean; f: unknown }
        >
      >()
    })
    test('complete2c', () => {
      const complete = getDecoder(S.StructM(s.complete(testStruct)))
      expectTypeOf<typeof complete>().toEqualTypeOf<
        D.Decoder<unknown, { a: string; b: number; e: boolean; f: unknown }>
      >()
    })
    test('complete1', () => {
      const complete = getGuard(S.StructM(s.complete(testStruct)))
      expectTypeOf<typeof complete>().toEqualTypeOf<
        G.Guard<unknown, { a: string; b: number; e: boolean; f: unknown }>
      >()
    })
  })
  test('pick', () => {
    const pick = getEncoder(S.StructM(pipe(testStruct, s.pick('a', 'd'))))
    expectTypeOf<typeof pick>().toEqualTypeOf<
      Enc.Encoder<{ a: string; d?: unknown }, { a: string; f?: unknown }>
    >()
  })
  test('omit', () => {
    const omit = getEncoder(S.StructM(pipe(testStruct, s.omit('a', 'd'))))
    expectTypeOf<typeof omit>().toEqualTypeOf<
      Enc.Encoder<{ b?: number; c: boolean }, { b?: number; e: boolean }>
    >()
  })
})

describe('value-level tests', () => {
  describe('camel case keys', () => {
    test('encoder', () => {
      const encoder = getEncoder(S.StructM(testStructCamel))
      expect(
        encoder.encode({ fooBar: 'a', fooBaz: 1, eebyDeeby: true, deebyEeby: undefined }),
      ).toEqual({
        foo_bar: 'a',
        'foo-baz': 1,
        'Bar Qux': true,
        fooBar: undefined,
      })
    })
    test('decoder', () => {
      const decoder = getDecoder(S.StructM(testStructCamel))
      expect(
        decoder.decode({
          foo_bar: 'a',
          'foo-baz': 1,
          'Bar Qux': true,
          fooBar: undefined,
        }),
      ).toEqual(
        D.success({
          fooBar: 'a',
          fooBaz: 1,
          eebyDeeby: true,
          deebyEeby: undefined,
        }),
      )
    })
    test('arb / guard', () => {
      const guard = getGuard(S.StructM(testStructCamel))
      const arb = getArbitrary(S.StructM(testStructCamel))
      fc.assert(fc.property(arb.arbitrary(fc), guard.is))
    })
    test('arb / encoder / decoder round trip', () => {
      const encoder = getEncoder(S.StructM(testStructCamel))
      const decoder = getDecoder(S.StructM(testStructCamel))
      const arb = getArbitrary(S.StructM(testStructCamel))
      fc.assert(
        fc.property(arb.arbitrary(fc), x => {
          const encoded = encoder.encode(x)
          const decoded = decoder.decode(encoded)
          expect(decoded).toEqual(D.success(x))
        }),
      )
    })
  })
  describe('remap keys', () => {
    test('encoder', () => {
      const encoder = getEncoder(capsTestStruct)
      expect(encoder.encode({ A: 'a', B: 1, E: true, F: undefined })).toEqual({
        a: 'a',
        b: 1,
        c: true,
        d: undefined,
      })
    })
    test('decoder', () => {
      const decoder = getDecoder(capsTestStruct)
      expect(decoder.decode({ a: 'a', b: 1, c: true, d: undefined })).toEqual(
        D.success({ A: 'a', B: 1, E: true, F: undefined }),
      )
    })
    test('arb / guard', () => {
      const guard = getGuard(capsTestStruct)
      const arb = getArbitrary(capsTestStruct)
      fc.assert(fc.property(arb.arbitrary(fc), guard.is))
    })
    test('arb / encoder / decoder round trip', () => {
      const encoder = getEncoder(capsTestStruct)
      const decoder = getDecoder(capsTestStruct)
      const arb = getArbitrary(capsTestStruct)
      fc.assert(
        fc.property(arb.arbitrary(fc), x => {
          const encoded = encoder.encode(x)
          const decoded = decoder.decode(encoded)
          expect(decoded).toEqual(D.success(x))
        }),
      )
    })
  })
  describe('partial', () => {
    test('encoder', () => {
      const partial = getEncoder(S.StructM(s.partial(testStruct)))
      expect(partial.encode({})).toEqual({})
      expect(partial.encode({ a: 'a' })).toEqual({ a: 'a' })
      expect(partial.encode({ a: 'a', b: 1 })).toEqual({ a: 'a', b: 1 })
      expect(partial.encode({ a: 'a', b: 1, e: true })).toEqual({ a: 'a', b: 1, c: true })
    })
    test('decoder', () => {
      const partial = getDecoder(S.StructM(s.partial(testStruct)))
      expect(partial.decode({})).toEqual(D.success({}))
      expect(partial.decode({ a: 'a' })).toEqual(D.success({ a: 'a' }))
      expect(partial.decode({ a: 'a', b: 1 })).toEqual(D.success({ a: 'a', b: 1 }))
      expect(partial.decode({ a: 'a', b: 1, c: true })).toEqual(
        D.success({ a: 'a', b: 1, e: true }),
      )
    })
    test('arb / guard', () => {
      const g = getGuard(S.StructM(s.partial(testStruct)))
      const arb = getArbitrary(S.StructM(s.partial(testStruct)))
      fc.assert(fc.property(arb.arbitrary(fc), g.is))
    })
  })
  describe('complete', () => {
    test('encoder', () => {
      const partial = getEncoder(S.StructM(s.complete(testStruct)))
      expect(partial.encode({ a: 'a', b: 1, e: true, f: null })).toEqual({
        a: 'a',
        b: 1,
        c: true,
        d: null,
      })
    })
    test('decoder', () => {
      const partial = getDecoder(S.StructM(s.complete(testStruct)))
      expect(partial.decode({ a: 'a', b: 1, c: true, d: '' })).toEqual(
        D.success({ a: 'a', b: 1, e: true, f: '' }),
      )
    })
    test('arb / guard', () => {
      const g = getGuard(S.StructM(s.complete(testStruct)))
      const arb = getArbitrary(S.StructM(s.complete(testStruct)))
      fc.assert(fc.property(arb.arbitrary(fc), g.is))
    })
  })
  describe('struct', () => {
    test('encoder', () => {
      const encoder = getEncoder(S.StructM(plainStruct))
      expect(encoder.encode({ a: 'a', b: true })).toEqual({
        a: 'a',
        b: 1,
      })
    })
    test('decoder', () => {
      const decoder = getDecoder(S.StructM(plainStruct))
      expect(decoder.decode({ a: 'a', b: 0 })).toEqual(D.success({ a: 'a', b: false }))
    })
    test('arb / guard', () => {
      const g = getGuard(S.StructM(plainStruct))
      const arb = getArbitrary(S.StructM(plainStruct))
      fc.assert(fc.property(arb.arbitrary(fc), g.is))
    })
  })
  describe('pick', () => {
    test('encoder', () => {
      const pick = getEncoder(S.StructM(pipe(testStruct, s.pick('a', 'd'))))
      expect(pick.encode({ a: 'a', f: null })).toEqual({ a: 'a', d: null })
    })
    test('decoder', () => {
      const pick = getDecoder(S.StructM(pipe(testStruct, s.pick('a', 'd'))))
      expect(pick.decode({ a: 'a', d: null })).toEqual(D.success({ a: 'a', f: null }))
    })
    test('arb / guard', () => {
      const g = getGuard(S.StructM(pipe(testStruct, s.pick('a', 'd'))))
      const arb = getArbitrary(S.StructM(pipe(testStruct, s.pick('a', 'd'))))
      fc.assert(fc.property(arb.arbitrary(fc), g.is))
    })
  })
  describe('omit', () => {
    test('encoder', () => {
      const omit = getEncoder(S.StructM(pipe(testStruct, s.omit('a', 'd'))))
      expect(omit.encode({ b: 1, e: true })).toEqual({ b: 1, c: true })
    })
    test('decoder', () => {
      const omit = getDecoder(S.StructM(pipe(testStruct, s.omit('a', 'd'))))
      expect(omit.decode({ b: 1, c: true })).toEqual(D.success({ b: 1, e: true }))
    })
    test('arb / guard', () => {
      const g = getGuard(S.StructM(pipe(testStruct, s.omit('a', 'd'))))
      const arb = getArbitrary(S.StructM(pipe(testStruct, s.omit('a', 'd'))))
      fc.assert(fc.property(arb.arbitrary(fc), g.is))
    })
  })
})
