import { Schemable } from '../src/Eq'
import { interpret, make } from '../src/SchemaExt'

describe('Eq', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(Schemable)(User)
  it('interprets a schema', () => {
    expect(decode.equals({ name: 'John' }, { name: 'John' })).toBe(true)
  })
})
