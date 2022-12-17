/**
 * An instance of `Schemable` for `Printer`.
 *
 * @since 1.0.2
 */
import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as S from 'io-ts/Schemable'

import { typeOf, witherS } from '../internal/util'
import * as PE from '../PrintingError'
import { WithRefine2 } from '../schemables/WithRefine/definition'
import { WithUnknownContainers2 } from '../schemables/WithUnknownContainers/definition'
import { Schemable2 } from './SchemableBase'

/**
 * @since 1.0.2
 * @category Model
 */
export interface Printer<E, A> {
  readonly print: (a: A) => E.Either<PE.PrintingError, J.Json>
  readonly printLeft: (e: E) => E.Either<PE.PrintingError, J.Json>
}

/** @internal */
const printerValidation = E.getApplicativeValidation(PE.semigroupPrintingError)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/** @internal */
const toJson = (input: unknown): E.Either<PE.PrintingError, J.Json> => {
  if (input === undefined) return E.left(new PE.InvalidValue(input))
  if (typeof input === 'function') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'symbol') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'bigint') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'number' && Number.isNaN(input)) return E.left(new PE.NotANumber())
  if (typeof input === 'number' && !Number.isFinite(input))
    return E.left(new PE.InfiniteValue())
  if (typeof input === 'number') return E.right(input)
  if (typeof input === 'string') return E.right(input)
  if (typeof input === 'boolean') return E.right(input)
  if (input === null) return E.right(input)
  return E.tryCatch(
    () => JSON.stringify(input, null, 2),
    error => new PE.UnknownError(error),
  )
}

/**
 * @since 1.0.2
 * @category Constructors
 */
export const literal = <
  A extends readonly [L, ...ReadonlyArray<L>],
  L extends S.Literal = S.Literal,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._args: A
): Printer<A[number], A[number]> => ({
  print: toJson,
  printLeft: toJson,
})

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Primitives
 */
export const string: Printer<string, string> = {
  print: toJson,
  printLeft: toJson,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const number: Printer<number, number> = {
  print: toJson,
  printLeft: toJson,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const boolean: Printer<boolean, boolean> = {
  print: toJson,
  printLeft: toJson,
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownArray: Printer<Array<unknown>, Array<unknown>> = {
  print: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, v) =>
        pipe(
          v,
          E.fromPredicate(
            value => value !== input,
            () => new PE.CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
  printLeft: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, v) =>
        pipe(
          v,
          E.fromPredicate(
            value => value !== input,
            () => new PE.CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
}

/**
 * @since 1.0.2
 * @category Primitives
 */
export const UnknownRecord: Printer<Record<string, unknown>, Record<string, unknown>> = {
  print: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((key, v) =>
        pipe(
          v,
          E.fromPredicate(
            value => value !== input,
            () => new PE.CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new PE.ErrorAtKey(key, err)),
        ),
      ),
    ),
  printLeft: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((key, v) =>
        pipe(
          v,
          E.fromPredicate(
            value => value !== input,
            () => new PE.CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new PE.ErrorAtKey(key, err)),
        ),
      ),
    ),
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
export const nullable = <E, A>(or: Printer<E, A>): Printer<null | E, null | A> => ({
  print: a => (a === null ? E.right(null) : or.print(a)),
  printLeft: e => (e === null ? E.right(null) : or.printLeft(e)),
})

type InnerLeft<E extends Printer<any, any>> = [E] extends [Printer<infer L, any>]
  ? L
  : never

type InnerRight<A extends Printer<any, any>> = [A] extends [Printer<any, infer R>]
  ? R
  : never

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
  print: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === input)
          return O.some(
            E.left(new PE.ErrorAtKey(key as string, new PE.CircularReference(value))),
          )
        return O.some(
          pipe(
            printer.print(value),
            E.mapLeft((err): PE.PrintingError => new PE.ErrorAtKey(key as string, err)),
          ),
        )
      }),
    ),
  printLeft: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === input)
          return O.some(
            E.left(new PE.ErrorAtKey(key as string, new PE.CircularReference(value))),
          )
        return O.some(
          pipe(
            printer.printLeft(value),
            E.mapLeft(err => new PE.ErrorAtKey(key as string, err)),
          ),
        )
      }),
    ),
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
  print: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === undefined) return O.none
        if (value === input)
          return O.some(
            E.left(new PE.ErrorAtKey(key as string, new PE.CircularReference(value))),
          )
        return O.some(printer.print(value))
      }),
    ),
  printLeft: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === undefined) return O.none
        if (value === input)
          return O.some(
            E.left(new PE.ErrorAtKey(key as string, new PE.CircularReference(value))),
          )
        return O.some(printer.print(value))
      }),
    ),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const record = <E, A>(
  codomain: Printer<E, A>,
): Printer<Record<string, E>, Record<string, A>> => ({
  print: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((k, a) =>
        pipe(
          a,
          E.fromPredicate(
            a => a !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(codomain.print),
          E.mapLeft(err => new PE.ErrorAtKey(k, err)),
        ),
      ),
    ),
  printLeft: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((k, a) =>
        pipe(
          a,
          E.fromPredicate(
            a => a !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(codomain.printLeft),
          E.mapLeft(err => new PE.ErrorAtKey(k, err)),
        ),
      ),
    ),
})

/**
 * @since 1.0.2
 * @category Combinators
 */
export const array = <E, A>(
  item: Printer<E, A>,
): Printer<ReadonlyArray<E>, ReadonlyArray<A>> => ({
  print: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.fromPredicate(
            value => value !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(item.print),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
  printLeft: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.fromPredicate(
            value => value !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(item.printLeft),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
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
  print: input =>
    pipe(
      RA.zipWith(components, input, (printer, a) =>
        pipe(
          a,
          E.fromPredicate(
            value => value !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(printer.print),
        ),
      ),
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
  printLeft: input =>
    pipe(
      RA.zipWith(components, input, (printer, b) =>
        pipe(
          b,
          E.fromPredicate(
            value => value !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(printer.printLeft),
        ),
      ),
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    ),
})

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
  <F, B>(pb: Printer<F, B>) =>
  <E, A>(pa: Printer<E, A>): Printer<E & F, A & B> => ({
    print: input =>
      pipe(
        E.Do,
        E.apS('a', pa.print(input)),
        E.apS('b', pb.print(input)),
        E.map(({ a, b }) => intersect_(a, b)),
        E.filterOrElseW(
          a => a !== undefined,
          () => new PE.InvalidValue(undefined),
        ),
      ),
    printLeft: input =>
      pipe(
        E.Do,
        E.apS('a', pa.printLeft(input)),
        E.apS('b', pb.printLeft(input)),
        E.map(({ a, b }) => intersect_(a, b)),
        E.filterOrElseW(
          a => a !== undefined,
          () => new PE.InvalidValue(undefined),
        ),
      ),
  })

/**
 * @since 1.0.2
 * @category Combinators
 */
export const sum =
  <T extends string>(tag: T) =>
  <MS extends Record<string, Printer<any, any>>>(
    members: MS,
  ): Printer<
    { [K in keyof MS]: InnerLeft<MS[K]> }[keyof MS],
    { [K in keyof MS]: InnerRight<MS[K]> }[keyof MS]
  > => ({
    print: a => {
      // @ts-expect-error -- typelevel difference
      const printer = members[a[tag]]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return printer!.print(a)
    },
    printLeft: e => {
      // @ts-expect-error -- typelevel difference
      const printer = members[e[tag]]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return printer!.printLeft(e)
    },
  })

/**
 * @since 1.0.2
 * @category Combinators
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const lazy = <E, A>(_id: string, f: () => Printer<E, A>): Printer<E, A> => ({
  print: input => {
    const get = S.memoize<void, Printer<E, A>>(f)
    return get().print(input)
  },
  printLeft: input => {
    const get = S.memoize<void, Printer<E, A>>(f)
    return get().printLeft(input)
  },
})

/**
 * @since 1.0.2
 * @category Combintors
 */
export const readonly: <E, A>(arb: Printer<E, A>) => Printer<E, Readonly<A>> = identity

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
  struct,
  partial,
  record,
  array,
  tuple,
  intersect,
  sum,
  lazy,
  readonly,
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const WithUnknownContainers: WithUnknownContainers2<URI> = {
  UnknownArray,
  UnknownRecord,
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const WithRefine: WithRefine2<URI> = {
  refine,
}
