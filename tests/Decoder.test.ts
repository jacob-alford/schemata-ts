import { Schemable } from '../src/Decoder'
import { interpret, make } from '../src/SchemaExt'

describe('Decoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(Schemable)(User)

  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })

  it('decodes check digits', () => {
    const CheckDigit = make(S => S.checkDigit(s => s[0] ?? '0', 1)(S.string))
    const decode = interpret(Schemable)(CheckDigit)
    expect(decode.decode('01')).toEqual({
      _tag: 'Left',
      left: {
        _tag: 'Of',
        value: {
          _tag: 'Leaf',
          actual: '01',
          error: '00',
        },
      },
    })
    expect(decode.decode('00')).toEqual({
      _tag: 'Right',
      right: '00',
    })
  })
})
