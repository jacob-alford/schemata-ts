import { schemata } from '../src'
import { getDecoder } from '../src/Decoder'

describe('Decoder', () => {
  const User = schemata.Struct({ name: schemata.String })
  const decode = getDecoder(User)
  it('interprets a schema', () => {
    expect(decode.decode({ name: 'John' })._tag).toBe('Right')
  })
})
