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
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as S from 'io-ts/Schemable'

import { traverseVESO, typeOf } from '../internal/util'
import { WithRefine2 } from '../schemables/WithRefine/definition'
import { WithUnknownContainers2 } from '../schemables/WithUnknownContainers/definition'
import { Schemable2 } from './SchemableBase'

/**
 * @since 1.0.2
 * @category Model
 */
export type PrintingError =
  | ErrorGroup
  | ErrorAtIndex
  | ErrorAtKey
  | CircularReference
  | InfiniteValue
  | NotANumber
  | InvalidValue
  | UnknownError

/**
 * @since 1.0.2
 * @category Model
 */
export class ErrorGroup {
  readonly _tag = 'ErrorGroup'
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<PrintingError>) {}
}

/**
 * @since 1.0.2
 * @category Model
 */
export class ErrorAtIndex {
  readonly _tag = 'ErrorAtIndex'
  constructor(readonly index: number, readonly error: PrintingError) {}
}

/**
 * @since 1.0.2
 * @category Model
 */
export class ErrorAtKey {
  readonly _tag = 'ErrorAtKey'
  constructor(readonly key: string, readonly error: PrintingError) {}
}

/**
 * @since 1.0.2
 * @category Model
 */
export class CircularReference {
  readonly _tag = 'CircularReference'
  constructor(readonly circularValue: unknown) {}
}

/**
 * @since 1.0.2
 * @category Model
 */
export class InfiniteValue {
  readonly _tag = 'Infinity'
}

/**
 * @since 1.0.2
 * @category Model
 */
export class NotANumber {
  readonly _tag = 'NaN'
}

/**
 * @since 1.0.2
 * @category Model
 */
export class InvalidValue {
  readonly _tag = 'InvalidValue'
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly value: undefined | Function | symbol | bigint,
  ) {}
}

/**
 * @since 1.0.2
 * @category Model
 */
export class UnknownError {
  readonly _tag = 'UnknownError'
  constructor(readonly error: unknown) {}
}

/**
 * @since 1.0.2
 * @category Instances
 */
export const semigroupPrintingError: Sg.Semigroup<PrintingError> = {
  concat: (x, y): PrintingError =>
    x instanceof ErrorGroup && y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(x.errors))
      : x instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(RNEA.of(y))(x.errors))
      : y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(RNEA.of(x)))
      : new ErrorGroup(RNEA.concat(RNEA.of(y))(RNEA.of(x))),
}

/**
 * @since 1.0.2
 * @category Model
 */
export interface Printer<E, A> {
  readonly print: (a: A) => E.Either<PrintingError, J.Json>
  readonly printLeft: (e: E) => E.Either<PrintingError, J.Json>
}

/** @internal */
const printerValidation = E.getApplicativeValidation(semigroupPrintingError)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/** @internal */
const toJson = (input: unknown): E.Either<PrintingError, J.Json> => {
  if (input === undefined) return E.left(new InvalidValue(input))
  if (typeof input === 'function') return E.left(new InvalidValue(input))
  if (typeof input === 'symbol') return E.left(new InvalidValue(input))
  if (typeof input === 'bigint') return E.left(new InvalidValue(input))
  if (typeof input === 'number' && Number.isNaN(input)) return E.left(new NotANumber())
  if (typeof input === 'number' && !Number.isFinite(input))
    return E.left(new InfiniteValue())
  if (typeof input === 'number') return E.right(input)
  if (typeof input === 'string') return E.right(input)
  if (typeof input === 'boolean') return E.right(input)
  if (input === null) return E.right(input)
  return E.tryCatch(
    () => JSON.stringify(input, null, 2),
    error => new UnknownError(error),
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
            () => new CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new ErrorAtIndex(i, err)),
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
            () => new CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new ErrorAtIndex(i, err)),
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
            () => new CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new ErrorAtKey(key, err)),
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
            () => new CircularReference(v),
          ),
          E.chain(toJson),
          E.mapLeft(err => new ErrorAtKey(key, err)),
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
      traverseVESO(semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === input)
          return O.some(
            E.left(new ErrorAtKey(key as string, new CircularReference(value))),
          )
        return O.some(
          pipe(
            printer.print(value),
            E.mapLeft((err): PrintingError => new ErrorAtKey(key as string, err)),
          ),
        )
      }),
    ),
  printLeft: input =>
    pipe(
      properties,
      traverseVESO(semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === input)
          return O.some(
            E.left(new ErrorAtKey(key as string, new CircularReference(value))),
          )
        return O.some(
          pipe(
            printer.printLeft(value),
            E.mapLeft(err => new ErrorAtKey(key as string, err)),
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
      traverseVESO(semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === undefined) return O.none
        if (value === input)
          return O.some(
            E.left(new ErrorAtKey(key as string, new CircularReference(value))),
          )
        return O.some(printer.print(value))
      }),
    ),
  printLeft: input =>
    pipe(
      properties,
      traverseVESO(semigroupPrintingError)((key, printer) => {
        const value = input[key]
        if (value === undefined) return O.none
        if (value === input)
          return O.some(
            E.left(new ErrorAtKey(key as string, new CircularReference(value))),
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
  print: RR.traverseWithIndex(E.Applicative)((k, a) =>
    pipe(
      codomain.print(a),
      E.mapLeft(err => new ErrorAtKey(k, err)),
    ),
  ),
  printLeft: RR.traverseWithIndex(E.Applicative)((k, a) =>
    pipe(
      codomain.printLeft(a),
      E.mapLeft(err => new ErrorAtKey(k, err)),
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
  print: E.traverseReadonlyArrayWithIndex((i, a) =>
    pipe(
      item.print(a),
      E.mapLeft(err => new ErrorAtIndex(i, err)),
    ),
  ),
  printLeft: E.traverseReadonlyArrayWithIndex((i, a) =>
    pipe(
      item.printLeft(a),
      E.mapLeft(err => new ErrorAtIndex(i, err)),
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
      RA.zipWith(components, input, (printer, a) => printer.print(a)),
      E.sequenceArray,
    ),
  printLeft: input =>
    pipe(
      RA.zipWith(components, input, (printer, b) => printer.printLeft(b)),
      E.sequenceArray,
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
          () => new InvalidValue(undefined),
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
          () => new InvalidValue(undefined),
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
