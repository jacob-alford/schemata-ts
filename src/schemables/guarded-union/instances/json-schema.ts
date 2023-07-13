import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as JS from 'schemata-ts/internal/json-schema'
import { hasImplicitOptional, makeImplicitOptional } from 'schemata-ts/internal/struct'
import { type WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionJsonSchema: WithGuardedUnion<JS.SchemableLambda> = {
  guardedUnion: (...members) => {
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
