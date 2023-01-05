/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithMap2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithMap2<JS.URI> = {
  mapFromEntries: (_, jsK, jsA) => JS.makeArraySchema()(JS.Schemable.tuple(jsK, jsA)),
}
