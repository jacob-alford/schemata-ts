import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Decoder'

describe('Decoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })
})
