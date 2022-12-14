/**
 * An instance of `Schemable` for `Printer`.
 *
 * @since 1.0.2
 */
import type * as FastCheck from 'fast-check'
import { flow, identity, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as S from 'io-ts/Schemable'

import { forIn, stringify } from '../internal/util'
import { WithRefine2 } from '../schemables/WithRefine/definition'
import { Schemable2 } from './SchemableBase'

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
  print: stringify,
  printLeft: stringify,
})

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Primitives
 */
export const string: Printer<string, string> = {
  print: stringify,
  printLeft: stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const number: Printer<number, number> = {
  print: stringify,
  printLeft: stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const boolean: Printer<boolean, boolean> = {
  print: stringify,
  printLeft: stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownArray: Printer<Array<unknown>, Array<unknown>> = {
  print: stringify,
  printLeft: stringify,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownRecord: Printer<Record<string, unknown>, Record<string, unknown>> = {
  print: stringify,
  printLeft: stringify,
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

type InnerLeft<E extends Printer<any, any>> = E extends Printer<infer L, any> ? L : never

type InnerRight<A extends Printer<any, any>> = A extends Printer<any, infer R> ? R : never

/**
 * @since 1.0.2
 * @category Combinators
 */
export const struct = <P extends Record<string, Printer<any, any>>>(
  properties: P,
): Printer<
  { [K in keyof P]: InnerLeft<P[K]> },
  { [K in keyof P]: InnerRight<P[K]> }
> => ({
  print: a => {
    const out: { [K in keyof P]: string } = {} as any
    pipe(
      properties,
      forIn((k, printer) => () => {
        if (out[k] === a) out[k] = '[Circular]'
        else out[k] = printer.print(a[k])
      }),
    )()
    return stringify(out)
  },
  printLeft: e => {
    const out: { [K in keyof P]: string } = {} as any
    pipe(
      properties,
      forIn((k, printer) => () => {
        if (out[k] === e) out[k] = '[Circular]'
        else out[k] = printer.print(e[k])
      }),
    )()
    return stringify(out)
  },
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const partial = <P extends Record<string, Printer<any, any>>>(
  properties: P,
): Printer<
  Partial<{ [K in keyof P]: InnerLeft<P[K]> }>,
  Partial<{ [K in keyof P]: InnerRight<P[K]> }>
> => ({
  print: a => {
    const out: { [K in keyof P]: string } = {} as any
    pipe(
      properties,
      forIn((k, printer) => () => {
        if (!Object.hasOwn(a, k)) return
        if (out[k] === a) out[k] = '[Circular]'
        else out[k] = printer.print(a[k])
      }),
    )()
    return stringify(out)
  },
  printLeft: e => {
    const out: { [K in keyof P]: string } = {} as any
    pipe(
      properties,
      forIn((k, printer) => () => {
        if (!Object.hasOwn(e, k)) return
        if (out[k] === e) out[k] = '[Circular]'
        else out[k] = printer.print(e[k])
      }),
    )()
    return stringify(out)
  },
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const record = <E, A>(
  codomain: Printer<E, A>,
): Printer<Record<string, E>, Record<string, A>> => ({
  print: flow(RR.map(codomain.print), stringify),
  printLeft: flow(RR.map(codomain.printLeft), stringify),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const array = <E, A>(
  item: Printer<E, A>,
): Printer<ReadonlyArray<E>, ReadonlyArray<A>> => ({
  print: flow(RA.map(item.print), stringify),
  printLeft: flow(RA.map(item.printLeft), stringify),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const tuple = <C extends ReadonlyArray<Printer<any, any>>>(
  ...components: C
): Printer<
  { [K in keyof C]: InnerLeft<C[K]> },
  { [K in keyof C]: InnerRight<C[K]> }
> => ({
  print: a =>
    pipe(
      a,
      RA.zip(components),
      RA.map(([c, a]) => c.print(a)),
      stringify,
    ),
  printLeft: e =>
    pipe(
      e,
      RA.zip(components),
      RA.map(([c, e]) => c.printLeft(e)),
      stringify,
    ),
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
  <F, B>(_: Printer<F, B>) =>
  <E, A>(__: Printer<E, A>): Printer<E & F, A & B> => ({
    print: stringify,
    printLeft: stringify,
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
