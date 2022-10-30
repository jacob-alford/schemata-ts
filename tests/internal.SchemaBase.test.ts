import * as E from 'fp-ts/Either'
import * as SC from '../src/internal/SchemaBase'
import { interpreter, SchemaExt } from '../src/SchemaExt'
import * as D from '../src/Decoder'
import * as PB from '../src/PatternBuilder'
import { pipe } from 'fp-ts/function'
import { Brand } from 'io-ts'

describe('SchemaBase', () => {
  test('Literal', () => {
    const Schema = SC.Literal('foo', 'bar')
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('baz')._tag).toStrictEqual('Left')
  })
  test('String', () => {
    const Schema = SC.String
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode(1)._tag).toStrictEqual('Left')
  })
  test('Number', () => {
    const Schema = SC.Number
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode(1)).toStrictEqual(E.right(1))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('Boolean', () => {
    const Schema = SC.Boolean
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode(true)).toStrictEqual(E.right(true))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('UnknownArray', () => {
    const Schema = SC.UnknownArray
    const decode = interpreter(D.Schemable)(Schema)
    const test = [1, 2, 3, 'foo', { bar: ['b', { a: ['z'] }] }]
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('UnknownRecord', () => {
    const Schema = SC.UnknownRecord
    const decode = interpreter(D.Schemable)(Schema)
    const test = { foo: 1, bar: 'baz' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('Refine', () => {
    const Schema = SC.Refine((s: string): s is 'foo' => s === 'foo', 'foo')(SC.String)
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
  test('Nullable', () => {
    const Schema = SC.Nullable(SC.String)
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode(null)).toStrictEqual(E.right(null))
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode(1)._tag).toStrictEqual('Left')
  })
  test('Struct', () => {
    const Schema = SC.Struct({
      foo: SC.String,
      bar: SC.Number,
    })
    const decode = interpreter(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 1 }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Partial', () => {
    const Schema = SC.Partial({
      foo: SC.String,
      bar: SC.Number,
    })
    const decode = interpreter(D.Schemable)(Schema)
    const test = { foo: 'foo' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ bar: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Array', () => {
    const Schema = SC.Array(SC.String)
    const decode = interpreter(D.Schemable)(Schema)
    const test = ['foo', 'bar']
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode(['foo', 1])._tag).toStrictEqual('Left')
  })
  test('Record', () => {
    const Schema = SC.Record(SC.String)
    const decode = interpreter(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 'bar' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo', bar: 1 })._tag).toStrictEqual('Left')
  })
  test('Tuple', () => {
    const Schema = SC.Tuple(SC.String, SC.Number)
    const decode = interpreter(D.Schemable)(Schema)
    const test = ['foo', 1]
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode(['foo', 'bar'])._tag).toStrictEqual('Left')
  })
  test('Intersection', () => {
    const Schema = SC.Intersection(
      SC.Struct({
        foo: SC.String,
      })
    )(
      SC.Struct({
        bar: SC.Number,
      })
    )
    const decode = interpreter(D.Schemable)(Schema)
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
    const decode = interpreter(D.Schemable)(Schema)
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
      })
    )

    const decode = interpreter(D.Schemable)(Schema1)
    const test = { foo: 'foo', bar: 1, baz: { foo: 'foo', bar: 1, baz: null } }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Readonly', () => {
    const Schema = SC.Readonly(
      SC.Struct({
        foo: SC.String,
        bar: SC.Number,
      })
    )
    const decode = interpreter(D.Schemable)(Schema)
    const test = { foo: 'foo', bar: 1 }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode({ foo: 'foo' })._tag).toStrictEqual('Left')
  })
  test('Brand', () => {
    type FooBrand = Brand<{ readonly foo: unique symbol }['foo']>
    const Schema = pipe(SC.String, SC.Brand<FooBrand>())
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')).toStrictEqual(E.right('bar'))
  })
  test('Pattern', () => {
    const pattern = pipe(
      PB.exactString('foo'),
      PB.then(PB.characterClass(false, ['0', '9']))
    )
    const Schema = SC.Pattern(pattern, 'FooNum')
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo1')).toStrictEqual(E.right('foo1'))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
  test('WithInvariant', () => {
    const Schema = SC.InvMap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date'
    )<string>(
      a => new Date(a),
      a => a.toISOString()
    )(SC.String)
    const decoder = interpreter(D.Schemable)(Schema)
    const test = new Date()
    expect(decoder.decode(test.toISOString())).toStrictEqual(E.right(test))
  })
})
