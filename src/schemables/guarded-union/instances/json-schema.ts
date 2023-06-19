import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'
import { hasImplicitOptional, makeImplicitOptional } from 'schemata-ts/struct'

export const GuardedUnionJsonSchema: WithGuardedUnion<JS.SchemableLambda> = {
  guardedUnion: (_, ...members) => {
    const isOptional = pipe(
      members,
      RA.foldMap(B.MonoidAny)(({ member }) => hasImplicitOptional(member)),
    )
    const union = new JS.JsonUnion(members.map(({ member }) => member))
    return isOptional
      ? JS.make(makeImplicitOptional(union, _ => Object.assign({}, _)))
      : JS.make(union)
  },
}
