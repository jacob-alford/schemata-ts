import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import { pipe } from 'fp-ts/function'
import * as P from '../../src/schemables/WithPattern'
import * as PB from '../../src/PatternBuilder'
import { interpreter } from '../../src/SchemaExt'

describe('WithPattern', () => {
  test('Pattern', () => {
    const pattern = pipe(
      PB.exactString('foo'),
      PB.then(PB.characterClass(false, ['0', '9']))
    )
    const Schema = P.Schema(pattern, 'FooNum')
    const decode = interpreter(D.Schemable)(Schema)
    expect(decode.decode('foo1')).toStrictEqual(E.right('foo1'))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
})
