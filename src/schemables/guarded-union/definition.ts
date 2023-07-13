import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as Ord from 'fp-ts/Ord'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type Guard } from 'schemata-ts/Guard'
import {
  type InputOfSchemable,
  type OutputOfSchemable,
  type SchemableKind,
  type SchemableLambda,
} from 'schemata-ts/internal/schemable'

export type GuardedPrecedentedUnionMember<S extends SchemableLambda> = {
  readonly guard: Guard<any>
  readonly member: SchemableKind<S, any, any>
  readonly precedence: number
  readonly name: string
}

/** @internal */
export const ordGuardedPrecedentedUnionMember: Ord.Ord<
  GuardedPrecedentedUnionMember<any>
> = pipe(
  N.Ord,
  Ord.contramap(m => m.precedence),
)

export interface WithGuardedUnion<S extends SchemableLambda> {
  readonly guardedUnion: <
    T extends RNEA.ReadonlyNonEmptyArray<GuardedPrecedentedUnionMember<S>>,
  >(
    ...members: T
  ) => SchemableKind<
    S,
    InputOfSchemable<S, T[number]['member']>,
    OutputOfSchemable<S, T[number]['member']>
  >
}
