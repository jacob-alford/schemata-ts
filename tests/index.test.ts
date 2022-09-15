import { interpreter, make } from '../src/SchemaExt'
import { D } from '../src'

describe('Decoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(D.Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })
})
