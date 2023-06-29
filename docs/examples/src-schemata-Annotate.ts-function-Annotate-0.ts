import * as assert from 'assert'
import { pipe } from 'fp-ts/function'
  import * as S from '../../src'
  import * as JS from '../../src/JsonSchema'
  import { Schema } from '../../src/Schema'

  type One = {
    two: Two
  }

  type Two = {
    one?: One | null
  }

  const One_: Schema<One, One> = S.Struct({
    two: S.Lazy('two', () => Two_),
  })

  const Two_ = S.Struct({
    one: S.Nullable(S.Lazy('one', () => One_)),
  })

  const One = pipe(
    One_,
    S.Annotate({
      references: {
        one: One_,
        two: Two_,
      },
    }),
  )

  const Two = pipe(
    Two_,
    S.Annotate({
      references: {
        one: One_,
        two: Two_,
      },
    }),
  )

  const jsonSchemaOne = JS.getJsonSchema(One)
  const jsonSchemaTwo = JS.getJsonSchema(Two)

  assert.deepStrictEqual(JS.stripIdentity(jsonSchemaOne), {
    properties: {
      two: {
        $ref: 'two',
      },
    },
    required: ['two'],
    type: 'object',
    $defs: {
      one: {
        properties: {
          two: {
            $ref: 'two',
          },
        },
        required: ['two'],
        type: 'object',
      },
      two: {
        properties: {
          one: {
            oneOf: [
              {
                type: 'null',
                const: null,
              },
              {
                $ref: 'one',
              },
            ],
          },
        },
        required: [],
        type: 'object',
      },
    },
  })
