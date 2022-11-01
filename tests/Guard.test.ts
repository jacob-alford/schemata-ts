import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Guard'

describe('Guard', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(Schemable)(User)

  it('interprets a schema', () => {
    expect(decode.is({ name: 'John' })).toBe(true)
  })

  it('guards on check digits', () => {
    const CheckDigit = make(S => S.checkDigit(s => s[0] ?? '0', 1)(S.string))
    const decode = interpreter(Schemable)(CheckDigit)
    expect(decode.is('01')).toBe(false)
    expect(decode.is('00')).toBe(true)
  })
})
