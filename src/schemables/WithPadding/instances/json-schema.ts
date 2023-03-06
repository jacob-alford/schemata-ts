/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.2.0
 */
import { pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/JsonSchema'
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
            ? JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema({ maxLength }))
            : JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema()),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.makeIntersectionSchema(stringSchema)(
                JS.makeStringSchema({ minLength: exactLength, maxLength: exactLength }),
              )
            : JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema()),
      }),
    ),
  padRight: length => stringSchema =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) =>
          typeof maxLength === 'number'
            ? JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema({ maxLength }))
            : JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema()),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.makeIntersectionSchema(stringSchema)(
                JS.makeStringSchema({ minLength: exactLength, maxLength: exactLength }),
              )
            : JS.makeIntersectionSchema(stringSchema)(JS.makeStringSchema()),
      }),
    ),
}
