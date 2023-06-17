import { pipe } from 'fp-ts/function'
import { getJsonSchema } from 'schemata-ts/JsonSchema'
import * as S from 'schemata-ts/schemata'

import * as JS from '../../src/base/JsonSchemaBase'
import * as SC from '../../src/base/SchemaBase'
import { getGuard } from '../../src/Guard'
import * as WithOptional from '../../test-utils-old/schemable-exports/WithOptional'

describe('WithOptional', () => {
  test('Guard and Schema', () => {
    const Guard = getGuard(WithOptional.Schema(SC.String))
    expect(Guard.is('a')).toBe(true)
    expect(Guard.is(undefined)).toBe(true)
    expect(Guard.is(1)).toBe(false)
  })
})

describe('#265 optional schemas lose properties', () => {
  const AnnotatedOptionalStruct = pipe(
    S.Optional(S.Struct({ field: S.String })),
    S.Annotate({
      title: 'Annotated optional struct',
      description: 'Description of the annotated optional struct',
    }),
  )

  const exampleSchema = S.Struct({
    annotatedOptionalStruct: AnnotatedOptionalStruct,
  })

  const jsonSchema = JS.stripIdentity(getJsonSchema(exampleSchema))

  test('optional retains property information and relays optionality to parent', () => {
    expect(jsonSchema).toStrictEqual({
      type: 'object',
      properties: {
        annotatedOptionalStruct: {
          type: 'object',
          title: 'Annotated optional struct',
          description: 'Description of the annotated optional struct',
          properties: {
            field: {
              type: 'string',
            },
          },
          required: ['field'],
        },
      },
      required: [],
    })
  })
})
