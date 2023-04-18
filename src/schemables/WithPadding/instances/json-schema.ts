/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.2.0
 */
import { pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithPadding } from 'schemata-ts/schemables/WithPadding/definition'
import { match } from 'schemata-ts/schemables/WithPadding/utils'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithPadding<JS.SchemableLambda> = {
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
