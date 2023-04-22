import * as JS from 'schemata-ts/internal/json-schema'
import { WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionJsonSchema: WithGuardedUnion<JS.SchemableLambda> = {
  guardedUnion: (_, ...members) =>
    JS.make(new JS.JsonUnion(members.map(({ member }) => member))),
}
