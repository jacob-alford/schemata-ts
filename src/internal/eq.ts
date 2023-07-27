import type * as hkt from 'schemata-ts/internal/schemable'

export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

/** @internal */
export const fromEquals = (equals: Eq<any>['equals']): Eq<any> => ({
  equals: (x, y) => x === y || equals(x, y),
})

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Eq<this['Output']>
}

/** @internal */
export const eqStrict: Eq<unknown> = {
  equals: (x, y) => x === y,
}

/** @internal */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = f => fa =>
  fromEquals((x, y) => fa.equals(f(x), f(y)))

/** @internal */
//
export const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Eq<A>) => Eq<B> =
  (_, g) => fa =>
    contramap(g)(fa)
