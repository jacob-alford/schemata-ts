/**
 * JsonSchema instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import { WithUnknown2 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const JsonSchema: WithUnknown2<JS.URI> = {
  unknown: JS.emptySchema,
}
