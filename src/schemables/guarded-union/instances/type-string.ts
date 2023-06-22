import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionTypeString: WithGuardedUnion<SchemableLambda> = {
  guardedUnion: (_, ...members) =>
    pipe(
      members,
      RNEA.foldMap(
        Sg.tuple(
          Sg.intercalate(' | ')(Str.Semigroup),
          Sg.intercalate(' | ')(Str.Semigroup),
        ),
      )(({ member }) => member),
      _ => makeTypeString(_),
    ),
}
