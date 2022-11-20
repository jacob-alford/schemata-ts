import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import { Schema } from '../../src/schemables/WithUnknownContainers/instances/schema'
import { interpreter } from '../../src/SchemaExt'

describe('WithUnknownContainers', () => {
  test('UnknownArray', () => {
    const decode = interpreter(D.Schemable)(Schema.UnknownArray)
    const test = [1, 2, 3, 'foo', { bar: ['b', { a: ['z'] }] }]
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
  test('UnknownRecord', () => {
    const decode = interpreter(D.Schemable)(Schema.UnknownRecord)
    const test = { foo: 1, bar: 'baz' }
    expect(decode.decode(test)).toStrictEqual(E.right(test))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
  })
})
