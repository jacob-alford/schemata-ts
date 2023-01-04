import { getJsonSchema } from '../../src/JsonSchema'
import * as S from '../../src/schemata'

describe('annotation', () => {
  const schema = S.Annotate('root', 'description')(S.BigIntFromString())
  const jsonSchema = JSON.parse(JSON.stringify(getJsonSchema(schema)))
  it('annotates', () => {
    expect(jsonSchema).toEqual({
      type: 'string',
      pattern: '^((0b)[0-1]+?|(0o)[0-7]+?|-?\\d+?|(0x)[0-9A-Fa-f]+?)$',
      name: 'root',
      description: 'description',
    })
  })
})
