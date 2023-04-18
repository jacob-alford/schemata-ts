/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/internal/json-schema'
import { WithMap } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithMap<JS.SchemableLambda> = {
  mapFromEntries: (_, jsK, jsA) =>
    JS.make(new JS.JsonArray(new JS.JsonArray([jsK, jsA]))),
}
