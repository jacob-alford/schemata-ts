import { interpret, make } from '../src/SchemaExt'
import { Schemable } from '../src/Type'

describe('Type', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })
})
