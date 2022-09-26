import * as fc from 'fast-check'
import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Arbitrary'

describe('Decoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const arb = interpreter(Schemable)(User)
  it('interprets a schema', () => {
    fc.assert(
      fc.property(arb, obj => {
        expect(typeof obj.name).toBe('string')
      })
    )
  })
})
