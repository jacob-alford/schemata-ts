import * as assert from 'assert'
import * as JS from '../../src/JsonSchema'
  import * as S from '../../src/schemata'
  import { getJsonSchema } from '../../src/JsonSchema'

  const schema = S.Struct({
    id: S.Natural,
    jwt: S.Jwt,
    tag: S.Literal('Customer'),
  })

  const jsonSchema = getJsonSchema(schema)

  assert.deepStrictEqual(JS.stripIdentity(jsonSchema), {
    type: 'object',
    required: ['id', 'jwt', 'tag'],
    properties: {
      id: { type: 'integer', minimum: 0, maximum: 9007199254740991 },
      jwt: {
        type: 'string',
        description: 'Jwt',
        pattern:
          '^(([A-Za-z0-9_\\x2d]*)\\.([A-Za-z0-9_\\x2d]*)(\\.([A-Za-z0-9_\\x2d]*)){0,1})$',
      },
      tag: { type: 'string', const: 'Customer' },
    },
  })
