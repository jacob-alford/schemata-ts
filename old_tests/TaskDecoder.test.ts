import { interpret, make } from '../src/Schema'
import { Schemable } from '../src/TaskDecoder'

describe('TaskDecoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpret(Schemable)(User)

  it('interprets a schema', async () => {
    expect((await decode.decode({ name: 'John' })())._tag).toBe('Right')
  })

  it('decodes check digits', async () => {
    const CheckDigit = make(S => S.checkDigit(s => s[0] ?? '0', 1)(S.string))
    const decode = interpret(Schemable)(CheckDigit)
    expect((await decode.decode('01')())._tag).toBe('Left')
    expect((await decode.decode('00')())._tag).toBe('Right')
  })
})
