import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as D from '../../src/internal/Decoder'
import * as PB from '../../src/PatternBuilder'
import { interpret } from '../../src/Schema'
import * as P from '../../test-utils/schemable-exports/WithPattern'

describe('WithPattern', () => {
  test('Pattern', () => {
    const pattern = pipe(
      PB.exactString('foo'),
      PB.then(PB.characterClass(false, ['0', '9'])),
    )
    const Schema = P.Schema(pattern, 'FooNum')
    const decode = interpret(D.Schemable)(Schema)
    expect(decode.decode('foo1')).toStrictEqual(E.right('foo1'))
    expect(decode.decode('foo')._tag).toStrictEqual('Left')
    expect(decode.decode('bar')._tag).toStrictEqual('Left')
  })
})
