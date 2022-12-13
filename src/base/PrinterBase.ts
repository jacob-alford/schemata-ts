/**
 * An instance of `Schemable` for `Printer`.
 *
 * @since 1.0.2
 */
import type * as FastCheck from 'fast-check'
import { identity, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as S from 'io-ts/Schemable'

import { WithRefine2 } from '../schemables/WithRefine/definition'
import { Schemable2 } from './SchemableBase'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

/**
 * @since 1.0.2
 * @category Model
 */
export interface Printer<E, A> {
  readonly print: (a: A) => string
  readonly printLeft: (e: E) => string
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Constructors
 */
export const literal = <
  A extends readonly [L, ...ReadonlyArray<L>],
  L extends S.Literal = S.Literal,
>(): Printer<A[number], A[number]> => ({
  print: a => (a === null ? 'null' : JSON.stringify(a)),
  printLeft: e => (e === null ? 'null' : JSON.stringify(e)),
})

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Primitives
 */
export const string: Printer<string, string> = {
  print: JSON.stringify,
  printLeft: JSON.stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const number: Printer<number, number> = {
  print: JSON.stringify,
  printLeft: JSON.stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const boolean: Printer<boolean, boolean> = {
  print: JSON.stringify,
  printLeft: JSON.stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownArray: Printer<Array<unknown>, Array<unknown>> = {
  print: JSON.stringify,
  printLeft: JSON.stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownRecord: Printer<Record<string, unknown>, Record<string, unknown>> = {
  print: JSON.stringify,
  printLeft: JSON.stringify,
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Combinators
 */
export const refine: WithRefine2<URI>['refine'] = () => identity

/**
 * @since 1.0.2
 * @category Combinators
 */
export const nullable = <E, A>(or: Printer<E, A>): Printer<E, null | A> => ({
  print: a => (a === null ? 'null' : or.print(a)),
  printLeft: e => or.printLeft(e),
})

type InnerLeft<E extends Printer<Any, Any>> = E extends Printer<infer L, Any> ? L : never

type InnerRight<A extends Printer<Any, Any>> = A extends Printer<Any, infer R> ? R : never

/**
 * @since 1.0.2
 * @category Combinators
 */
export const struct = <P extends Record<string, Printer<Any, Any>>>(
  properties: P,
): Printer<
  { [K in keyof P]: InnerLeft<P[K]> },
  { [K in keyof P]: InnerRight<P[K]> }
> => ({
  print: a => {
    const out: Any = {}
    for (const [k, printer] of Object.entries<Printer<Any, Any>>(properties)) {
      out[k] = printer.print(a[k as keyof P])
    }
    return JSON.stringify(out)
  },
  printLeft: e => {
    const out: Any = {}
    for (const [k, printer] of Object.entries<Printer<Any, Any>>(properties)) {
      out[k] = printer.printLeft(e[k as keyof P])
    }
    return JSON.stringify(out)
  },
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const partial = <P extends Record<string, Printer<Any, Any>>>(
  properties: P,
): Printer<
  Partial<{ [K in keyof P]: InnerLeft<P[K]> }>,
  Partial<{ [K in keyof P]: InnerRight<P[K]> }>
> => ({
  print: a => {},
  printLeft: e => {},
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const record = <A>(codomain: Arbitrary<A>): Arbitrary<Record<string, A>> => ({
  arbitrary: fc => fc.dictionary(string.arbitrary(fc), codomain.arbitrary(fc)),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const array = <A>(item: Arbitrary<A>): Arbitrary<Array<A>> => ({
  arbitrary: fc => fc.array(item.arbitrary(fc)),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: Arbitrary<A[K]> }
): Arbitrary<A> => ({
  arbitrary: fc => {
    if (components.length === 0) {
      return fc.constant(RA.zero() as A)
    }
    return fc.tuple(
      ...components.map(arb => arb.arbitrary(fc)),
    ) as unknown as FastCheck.Arbitrary<A>
  },
})

/**
 * @since 1.0.2
 * @internal
 */
export const typeOf = (x: unknown): string => (x === null ? 'null' : typeof x)

/**
 * @since 1.0.2
 * @internal
 */
const intersect_ = <A, B>(a: A, b: B): A & B => {
  if (a !== undefined && b !== undefined) {
    const tx = typeOf(a)
    const ty = typeOf(b)
    if (tx === 'object' || ty === 'object') {
      return Object.assign({}, a, b)
    }
  }
  return undefined as A & B
}

/**
 * @since 1.0.2
 * @category Combinators
 */
export const intersect =
  <B>(right: Arbitrary<B>) =>
  <A>(left: Arbitrary<A>): Arbitrary<A & B> => ({
    arbitrary: fc =>
      fc.tuple(left.arbitrary(fc), right.arbitrary(fc)).map(([a, b]) => intersect_(a, b)),
  })

/**
 * @since 1.0.2
 * @category Combinators
 */
export const sum =
  <T extends string>(
    _tag: T, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) =>
  <A>(members: { [K in keyof A]: Arbitrary<A[K] & Record<T, K>> }): Arbitrary<
    A[keyof A]
  > => ({
    arbitrary: fc =>
      fc.oneof(
        ...pipe(
          members,
          RR.toReadonlyArray,
          RA.map(([, arb]) => arb.arbitrary(fc)),
        ),
      ),
  })

/**
 * @since 1.0.2
 * @category Combinators
 */
export const lazy = <A>(f: () => Arbitrary<A>): Arbitrary<A> => ({
  arbitrary: fc => {
    const get = S.memoize<void, Arbitrary<A>>(f)
    return fc.constant(null).chain(() => get().arbitrary(fc))
  },
})

/**
 * @since 1.0.2
 * @category Combintors
 */
export const readonly: <A>(arb: Arbitrary<A>) => Arbitrary<Readonly<A>> = identity

/**
 * @since 1.0.2
 * @category Combinators
 */
export const union: S.WithUnion1<URI>['union'] = (...members) => ({
  arbitrary: fc => fc.oneof(...members.map(arb => arb.arbitrary(fc))),
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Instances
 */
export const URI = 'Printer'

/**
 * @since 1.0.2
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly Printer: Printer<E, A>
  }
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const Schemable: Schemable2<URI> = {
  URI,
  literal,
  string,
  number,
  boolean,
  nullable,
  type: struct,
  struct,
  partial,
  record,
  array,
  tuple: tuple as S.Schemable1<URI>['tuple'],
  intersect,
  sum,
  lazy: (_, f) => lazy(f),
  readonly,
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const WithUnknownContainers: S.WithUnknownContainers1<URI> = {
  UnknownArray,
  UnknownRecord,
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const WithUnion: S.WithUnion1<URI> = {
  union,
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const WithRefine: S.WithRefine1<URI> = {
  refine,
}
