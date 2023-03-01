import { Schemable } from '../src/Guard'
import { interpret, make } from '../src/Schema'

describe('Guard', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(Schemable)(User)

  it('interprets a schema', () => {
    expect(decode.is({ name: 'John' })).toBe(true)
  })

  it('guards on check digits', () => {
    const CheckDigit = make(S => S.checkDigit(s => s[0] ?? '0', 1)(S.string))
    const decode = interpret(Schemable)(CheckDigit)
    expect(decode.is('01')).toBe(false)
    expect(decode.is('00')).toBe(true)
  })
})
