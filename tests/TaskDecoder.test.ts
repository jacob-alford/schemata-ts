import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/TaskDecoder'

describe('TaskDecoder', () => {
  const User = make(S => S.struct({ name: S.string }))
  const decode = interpreter(Schemable)(User)
  it('interprets a schema', async () => {
    expect((await decode.decode({ name: 'John' })())._tag).toBe('Right')
  })
})
