import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Inf from 'schemata-ts/internal/information'
import { type WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionInformation: WithGuardedUnion<Inf.SchemableLambda> = {
  guardedUnion: (_, ...members) =>
    pipe(
      members,
      RNEA.foldMap(N.MonoidSum)(({ precedence }) => precedence),
      _ => Inf.makeInformation(_),
    ),
}
