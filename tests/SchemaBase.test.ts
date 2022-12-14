import * as E from 'fp-ts/Either'

import * as SC from '../src/base/SchemaBase'
import * as D from '../src/Decoder'
import { interpret, SchemaExt } from '../src/SchemaExt'

describe('SchemaBase', () => {
  test('Literal', () => {
    const Schema = SC.Literal('foo', 'bar')
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('baz')._tag).toStrictEqual('Left')
  })
  test('String', () => {
    const Schema = SC.String
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode(1)._tag).toStrictEqual('Left')
  })
  test('Number', () => {
    const Schema = SC.Number
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode(1)).toStrictEqual(E.right(1))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('Boolean', () => {
    const Schema = SC.Boolean
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode(true)).toStrictEqual(E.right(true))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('Nullable', () => {
    const Schema = SC.Nullable(SC.String)
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode(null)).toStrictEqual(E.right(null))
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode(1)._tag).toStrictEqual('Left')
  })
  test('Struct', () => {
    const Schema = SC.Struct({
      foo: SC.String,
      bar: SC.Number,
    })
    const decode = interpret(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 1 }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Partial', () => {
    const Schema = SC.Partial({
      foo: SC.String,
      bar: SC.Number,
    })
    const decode = interpret(D.Schemable)(Schema)
    const test = { foo: 'foo' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ bar: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Array', () => {
    const Schema = SC.Array(SC.String)
    const decode = interpret(D.Schemable)(Schema)
    const test = ['foo', 'bar']
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode(['foo', 1])._tag).toStrictEqual('Left')
  })
  test('Record', () => {
    const Schema = SC.Record(SC.String)
    const decode = interpret(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 'bar' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo', bar: 1 })._tag).toStrictEqual('Left')
  })
  test('Tuple', () => {
    const Schema = SC.Tuple(SC.String, SC.Number)
    const decode = interpret(D.Schemable)(Schema)
    const test = ['foo', 1]
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode(['foo', 'bar'])._tag).toStrictEqual('Left')
  })
  test('Intersection', () => {
    const Schema = SC.Intersection(
      SC.Struct({
        foo: SC.String,
      }),
    )(
      SC.Struct({
        bar: SC.Number,
      }),
    )
    const decode = interpret(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 1 }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Sum', () => {
    const Schema = SC.Sum('type')({
      foo: SC.Struct({
        type: SC.Literal('foo'),
        foo: SC.String,
      }),
      bar: SC.Struct({
        type: SC.Literal('bar'),
        bar: SC.Number,
      }),
    })
    const decode = interpret(D.Schemable)(Schema)
    const test = { type: 'foo', foo: 'foo' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ type: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Lazy', () => {
    type SchemaBase = {
      foo: string
      bar: number
    }

    type Schema = SchemaBase & { baz: Schema | null }

    const Schema1: SchemaExt<Schema, Schema> = SC.Lazy('Schema1', () => Schema2)

    const Schema2: SchemaExt<Schema, Schema> = SC.Lazy('Schema2', () =>
      SC.Struct({
        foo: SC.String,
        bar: SC.Number,
        baz: SC.Nullable(Schema1),
      }),
    )

    const decode = interpret(D.Schemable)(Schema1)
    const test = { foo: 'foo', bar: 1, baz: { foo: 'foo', bar: 1, baz: null } }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Readonly', () => {
    const Schema = SC.Readonly(
      SC.Struct({
        foo: SC.String,
        bar: SC.Number,
      }),
    )
    const decode = interpret(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 1 }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
})
