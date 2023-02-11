import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getEncoder } from 'schemata-ts/Encoder'

import * as Enc from '../../src/base/EncoderBase'
import * as SC from '../../src/base/SchemaBase'
import * as D from '../../src/Decoder'
import { Encoder } from '../../src/schemables/WithRefine/instances/encoder'
import { Schema } from '../../src/schemables/WithRefine/instances/schema'
import { interpret } from '../../src/SchemaExt'
import * as S from '../../src/schemata'

describe('WithRefine', () => {
  test('Schema', () => {
    const S = Schema((s: string): s is 'foo' => s === 'foo', 'foo')(SC.String)
    const decode = interpret(D.Schemable)(S)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
  test('Encoder', () => {
    const enc = Encoder.refine(
      (a: string): a is 'foo' => a === 'foo',
      'isFoo',
    )(Enc.Schemable.string)
    expect(enc.encode('foo')).toEqual('foo')
  })
})

describe('Complex encoder refinement', () => {
  const Refined = pipe(
    S.Struct({
      a: S.DateFromIsoString(),
      b: S.DateFromIsoString(),
    }),
    S.Refine(
      (input): input is { a: Date; b: Date } => input.a.getTime() > input.b.getTime(),
      'a > b',
    ),
  )
  const Intersection = pipe(
    Refined,
    S.Intersection(
      S.Struct({
        c: S.Unknown,
      }),
    ),
  )
  const encoder = getEncoder(Intersection)
  const a = new Date()
  const b = new Date(a.getTime() - 1000)
  const testValue: S.TypeOf<typeof Intersection> = {
    a,
    b,
    c: {},
  }
  test('encodes refined intersections', () => {
    expect(encoder.encode(testValue)).toEqual({
      a: a.toISOString(),
      b: b.toISOString(),
      c: {},
    })
  })
})
