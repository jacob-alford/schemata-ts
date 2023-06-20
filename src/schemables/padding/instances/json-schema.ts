import { pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithPadding } from 'schemata-ts/schemables/padding/definition'
import { match } from 'schemata-ts/schemables/padding/utils'

export const PaddingJsonSchema: WithPadding<JS.SchemableLambda> = {
  padLeft: length => stringSchema =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) =>
          typeof maxLength === 'number'
            ? JS.make<string>(
                new JS.JsonIntersection([
                  stringSchema,
                  new JS.JsonString(undefined, maxLength),
                ]),
              )
            : JS.make<string>(
                new JS.JsonIntersection([stringSchema, new JS.JsonString()]),
              ),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.make<string>(
                new JS.JsonIntersection([
                  stringSchema,
                  new JS.JsonString(exactLength, exactLength),
                ]),
              )
            : JS.make<string>(
                new JS.JsonIntersection([stringSchema, new JS.JsonString()]),
              ),
      }),
    ),
  padRight: length => stringSchema =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) =>
          typeof maxLength === 'number'
            ? JS.make<string>(
                new JS.JsonIntersection([
                  stringSchema,
                  new JS.JsonString(undefined, maxLength),
                ]),
              )
            : JS.make<string>(
                new JS.JsonIntersection([stringSchema, new JS.JsonString()]),
              ),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.make<string>(
                new JS.JsonIntersection([
                  stringSchema,
                  new JS.JsonString(exactLength, exactLength),
                ]),
              )
            : JS.make<string>(
                new JS.JsonIntersection([stringSchema, new JS.JsonString()]),
              ),
      }),
    ),
}
