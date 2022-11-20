import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import * as SC from '../../src/base/SchemaBase'
import * as Enc from '../../src/base/EncoderBase'
import { Schema } from '../../src/schemables/WithRefine/instances/schema'
import { Encoder } from '../../src/schemables/WithRefine/instances/encoder'
import { interpreter } from '../../src/SchemaExt'

describe('WithRefine', () => {
  test('Schema', () => {
    const S = Schema((s: string): s is 'foo' => s === 'foo', 'foo')(SC.String)
    const decode = interpreter(D.Schemable)(S)
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
