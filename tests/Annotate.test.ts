import { integer } from '../src/JsonSchema'
import { getJsonSchema } from '../src/JsonSchema'
import { Annotate } from '../src/schemata/Annotate'
import { BigIntFromString } from '../src/schemata/number/BigIntFromString'
import { Natural } from '../src/schemata/number/Natural'

describe('annotation', () => {
  it('annotates', () => {
    const schema = Annotate({ title: 'root' })(BigIntFromString())
    const jsonSchema = getJsonSchema(schema)
    expect(jsonSchema).toEqual({
      type: 'string',
      pattern: '^((0b)[0-1]+?|(0o)[0-7]+?|-?\\d+?|(0x)[0-9A-Fa-f]+?)$',
      title: 'root',
      description: 'BigIntFromString',
    })
  })
  it('doesnt trample class names', () => {
    const schema = Annotate()(Natural)
    const jsonSchema = getJsonSchema(schema)
    expect(jsonSchema).toStrictEqual(integer({ minimum: 0, maximum: 9007199254740991 }))
  })
})
