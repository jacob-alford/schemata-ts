import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Eq'

describe('Eq', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.equals({ name: 'John' }, { name: 'John' })).toBe(true)
  })
})
