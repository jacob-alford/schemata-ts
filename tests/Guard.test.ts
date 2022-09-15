import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Guard'

describe('Guard', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.is({ name: 'John' })).toBe(true)
  })
})
