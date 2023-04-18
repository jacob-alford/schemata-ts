/**
 * @since 2.0.0
 * @category Schemable
 */
import * as JS from 'schemata-ts/internal/json-schema'
import { WithGuardedUnion } from 'schemata-ts/schemables/WithGuardedUnion/definition'

/**
 * @since 2.0.0
 * @category Model
 */
export const JsonSchema: WithGuardedUnion<JS.SchemableLambda> = {
  guardedUnion: (_, ...members) =>
    JS.make(new JS.JsonUnion(members.map(({ member }) => member))),
}
