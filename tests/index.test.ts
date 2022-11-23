import { D } from '../src'
import { interpret, make } from '../src/SchemaExt'

describe('Decoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(D.Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })
})
