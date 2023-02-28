import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Brand } from 'schemata-ts/brand'

import * as P from '../../src/base/PrinterBase'
import * as SC from '../../src/base/SchemaBase'
import * as D from '../../src/internal/decoder'
import { interpret } from '../../src/Schema'
import { Printer } from '../../src/schemables/WithBrand/instances/printer'
import * as B from '../../src/schemables/WithBrand/instances/schema'

describe('WithBrand', () => {
  test('Brand', () => {
    type FooBrand = Brand<{ readonly foo: unique symbol }['foo']>
    const Schema = pipe(SC.String, B.Schema<FooBrand>())
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode('foo')).toStrictEqual(E.right('foo'))
    expect(decode.decode('bar')).toStrictEqual(E.right('bar'))
  })
  test('Printer', () => {
    type FooBrand = Brand<{ readonly foo: unique symbol }['foo']>
    const Printer_ = pipe(P.string, Printer.brand<FooBrand>())
    expect(Printer_.domainToJson('foo' as any)).toEqual(E.right('foo'))
    expect(Printer_.codomainToJson('foo' as any)).toEqual(E.right('foo'))
  })
})
