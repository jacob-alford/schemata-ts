import { Schemable } from '../src/Encoder'
import { interpret, make } from '../src/SchemaExt'

describe('Encoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const encoder = interpret(Schemable)(User)

  it('interprets a schema', () => {
    expect(encoder.encode({ name: 'John' })).toEqual({ name: 'John' })
  })
})
