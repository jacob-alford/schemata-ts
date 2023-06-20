import type * as hkt from 'schemata-ts/HKT'

export interface Guard<A> {
  readonly is: (u: unknown) => u is A
}

export const fromPredicate = <A>(predicate: (u: unknown) => u is A): Guard<A> => ({
  is: predicate,
})

/** @since 2.0.0 */
export const URI = 'schemata-ts/Guard'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Guard<A>
  }
}

/** @since 2.0.0 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Guard<this['Output']>
}
