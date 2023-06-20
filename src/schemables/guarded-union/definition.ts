import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as Ord from 'fp-ts/Ord'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type Guard } from 'schemata-ts/Guard'
import {
  type InputOf,
  type OutputOf,
  type SchemableKind,
  type SchemableLambda,
} from 'schemata-ts/HKT'

export type GuardedPrecedentedUnionMember<S extends SchemableLambda> = {
  readonly guard: Guard<any>
  readonly member: SchemableKind<S, any, any>
  readonly precedence: number
}

/** @internal */
export const ordGuardedPrecedentedUnionMember: Ord.Ord<
  GuardedPrecedentedUnionMember<any>
> = pipe(
  N.Ord,
  Ord.reverse,
  Ord.contramap(m => m.precedence),
)

export interface WithGuardedUnion<S extends SchemableLambda> {
  readonly guardedUnion: <
    T extends RNEA.ReadonlyNonEmptyArray<GuardedPrecedentedUnionMember<S>>,
  >(
    name: string,
    ...members: T
  ) => SchemableKind<S, InputOf<S, T[number]['member']>, OutputOf<S, T[number]['member']>>
}
