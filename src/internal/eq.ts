import { type Contravariant1 } from 'fp-ts/Contravariant'
import { type Invariant1 } from 'fp-ts/Invariant'
import { type Monoid } from 'fp-ts/Monoid'
import type * as hkt from 'schemata-ts/internal/schemable'

/** @internal */
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

/** @internal */
export const fromEquals = (equals: Eq<any>['equals']): Eq<any> => ({
  equals: (x, y) => x === y || equals(x, y),
})

/** @since 2.0.0 */
export const URI = 'schemata-ts/Eq'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Eq<A>
  }
}

/** @since 2.0.0 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Eq<this['Output']>
}

// non-pipeables
const contramap_: Contravariant1<URI>['contramap'] = (fa, f) =>
  fromEquals((x, y) => fa.equals(f(x), f(y)))
const imap_: Invariant1<URI>['imap'] = (fa, _, g) => contramap_(fa, g)

/** @internal */
export const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Eq<A>) => Eq<B> =
  (f, g) => fa =>
    imap_(fa, f, g)

/** @internal */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: imap_,
}

/** @internal */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = f => fa =>
  contramap_(fa, f)

/** @internal */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: contramap_,
}

/** @internal */
export const and: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self =>
  fromEquals((x, y) => self.equals(x, y) && that.equals(x, y))

/** @internal */
export const always: Eq<unknown> = fromEquals(() => true)

/** @internal */
export const getMonoidAll = <A>(): Monoid<Eq<A>> => ({
  concat: (x, y) => and(x)(y),
  empty: always,
})

/** @internal */
export const or: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self =>
  fromEquals((x, y) => self.equals(x, y) || that.equals(x, y))

/** @internal */
export const never: Eq<unknown> = fromEquals(() => false)

/** @internal */
export const getMonoidAny = <A>(): Monoid<Eq<A>> => ({
  concat: (x, y) => or(x)(y),
  empty: never,
})

/** @internal */
export const eqStrict: Eq<unknown> = {
  equals: (x, y) => x === y,
}
