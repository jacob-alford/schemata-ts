import type * as hkt from 'schemata-ts/internal/schemable'

export interface Guard<A> {
  readonly is: (u: unknown) => u is A
}

export const fromPredicate = <A>(predicate: (u: unknown) => u is A): Guard<A> => ({
  is: predicate,
})

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Guard<this['Output']>
}
