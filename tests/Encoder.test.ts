import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Encoder'

describe('Encoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const encoder = interpreter(Schemable)(User)

  it('interprets a schema', () => {
    expect(encoder.encode({ name: 'John' })).toEqual({ name: 'John' })
  })

})
