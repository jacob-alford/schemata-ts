import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import { type Integer } from 'schemata-ts/integer'

import { runStandardTestSuite } from '../test-utils/test-suite'

const InnerSchema = pipe(
  S.Strict({
    a: S.Float({ min: 0, max: 4 }),
    b: S.Optional(S.Int({ min: 0, max: 4 }), 3 as Integer<0, 4>),
  }),
  S.Annotate({
    title: 'InnerSchema',
    description: 'This is the inner schema',
    readOnly: true,
    deprecated: true,
  }),
)

const OuterSchema = pipe(
  S.Record(S.String({ minLength: 5 }), S.Array(S.Tuple(S.Literal('foo'), InnerSchema))),
  S.Annotate({
    title: 'OuterSchema',
    description: 'This is the outer schema',
    readOnly: false,
    deprecated: false,
  }),
)

runStandardTestSuite(OuterSchema, () => ({
  jsonSchema: {
    type: 'object',
    title: 'OuterSchema',
    description: 'This is the outer schema',
    readOnly: false,
    deprecated: false,
    properties: {},
    additionalProperties: {
      type: 'array',
      items: {
        type: 'array',
        items: [
          { type: 'string', const: 'foo' },
          {
            type: 'object',
            title: 'InnerSchema',
            description: 'This is the inner schema',
            readOnly: true,
            deprecated: true,
            properties: {
              a: { type: 'number', minimum: 0, maximum: 4 },
              b: { type: 'integer', minimum: 0, maximum: 4, default: 3 },
            },
            required: ['a'],
            additionalProperties: false,
          },
        ],
        minItems: 2,
        maxItems: 2,
      },
    },
    propertyNames: { minLength: 5, type: 'string' },
    required: [],
  },
}))()
