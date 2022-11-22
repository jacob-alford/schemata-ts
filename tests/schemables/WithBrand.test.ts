import * as D from '../../src/Decoder'
import * as SC from '../../src/base/SchemaBase'
import * as B from '../../src/schemables/WithBrand/instances/schema'
import * as E from 'fp-ts/Either'
import { interpreter } from '../../src/SchemaExt'
import { pipe } from 'fp-ts/function'
import { Brand } from 'io-ts'

describe('WithBrand', () => {
  test('Brand', () => {
    type FooBrand = Brand<{ readonly foo: unique symbol }['foo']>
    const Schema = pipe(SC.String, B.Schema<FooBrand>())
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')).toStrictEqual(E.right('bar'))
  })
})
