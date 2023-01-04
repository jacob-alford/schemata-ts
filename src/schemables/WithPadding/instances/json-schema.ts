/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.2.0
 */
import { pipe } from 'fp-ts/function'

import * as JS from '../../../base/JsonSchemaBase'
import { WithPadding2 } from '../definition'
import { match } from '../utils'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithPadding2<JS.URI> = {
  padLeft: length => stringSchema =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) =>
          typeof maxLength === 'number'
            ? JS.makeIntersectionSchema(
                JS.makeStringSchema(undefined, maxLength),
                stringSchema,
              )
            : JS.makeIntersectionSchema(JS.makeStringSchema(), stringSchema),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.makeIntersectionSchema(
                JS.makeStringSchema(exactLength, exactLength),
                stringSchema,
              )
            : JS.makeIntersectionSchema(JS.makeStringSchema(), stringSchema),
      }),
    ),
  padRight: length => stringSchema =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) =>
          typeof maxLength === 'number'
            ? JS.makeIntersectionSchema(
                JS.makeStringSchema(undefined, maxLength),
                stringSchema,
              )
            : JS.makeIntersectionSchema(JS.makeStringSchema(), stringSchema),
        ExactLength: ({ exactLength }) =>
          typeof exactLength === 'number'
            ? JS.makeIntersectionSchema(
                JS.makeStringSchema(exactLength, exactLength),
                stringSchema,
              )
            : JS.makeIntersectionSchema(JS.makeStringSchema(), stringSchema),
      }),
    ),
}
