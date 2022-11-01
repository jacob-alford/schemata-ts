import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import { pipe } from 'fp-ts/function'
import * as SC from '../../src/internal/SchemaBase'
import { Brand } from 'io-ts'
import * as B from '../../src/schemables/WithBrand'
import { interpreter } from '../../src/SchemaExt'

describe('WithBrand', () => {
  test('Brand', () => {
    type FooBrand = Brand<{ readonly foo: unique symbol }['foo']>
    const Schema = pipe(SC.String, B.Schema<FooBrand>())
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')).toStrictEqual(E.right('bar'))
  })
})
