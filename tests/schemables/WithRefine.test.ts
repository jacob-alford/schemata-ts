import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import * as SC from '../../src/internal/SchemaBase'
import { Schema } from '../../src/schemables/WithRefine'
import { interpreter } from '../../src/SchemaExt'

describe('WithRefine', () => {
  test('Refine', () => {
    const S = Schema.refine((s: string): s is 'foo' => s === 'foo', 'foo')(SC.String)
    const decode = interpreter(D.Schemable)(S)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
})
