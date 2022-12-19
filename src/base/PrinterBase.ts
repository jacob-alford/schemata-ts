/**
 * An instance of `Schemable` for `Printer`.
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { flow, identity, pipe, unsafeCoerce } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import { Branded } from 'io-ts'
import * as S from 'io-ts/Schemable'

import { typeOf, witherS } from '../internal/util'
import * as PE from '../PrintError'
import { WithRefine2 } from '../schemables/WithRefine/definition'
import { Schemable2 } from './SchemableBase'

/** @internal */
interface JsonStringBrand {
  readonly JsonString: unique symbol
}

/** @internal */
interface SafeNumberBrand {
  readonly SafeNumber: unique symbol
}

/** @internal */
interface SafeRecordBrand {
  readonly SafeRecord: unique symbol
}

/** @internal */
interface SafeArrayBrand {
  readonly SafeArray: unique symbol
}

/**
 * A parsable Json string
 *
 * @since 1.1.0
 * @category Model
 */
export type JsonString = Branded<string, JsonStringBrand>

/**
 * A valid Json number
 *
 * @since 1.1.0
 * @category Model
 */
export type SafeNumber = Branded<number, SafeNumberBrand>

/**
 * A valid Json object
 *
 * @since 1.1.0
 * @category Model
 */
export type SafeJson =
  | boolean
  | SafeNumber
  | string
  | null
  | SafeJsonArray
  | SafeJsonRecord

/**
 * A Json with validated keys
 *
 * @since 1.1.0
 * @category Model
 */
interface JsonRecord {
  readonly [key: string]: SafeJson
}

/**
 * A validated JSON Record
 *
 * @since 1.1.0
 * @category Model
 */
export type SafeJsonRecord = Branded<SafeRecordBrand, JsonRecord>

/** @internal */
export const safeJsonRecord: (r: JsonRecord) => SafeJsonRecord = unsafeCoerce

/**
 * An array with validated keys
 *
 * @since 1.1.0
 * @category Model
 */
export interface JsonArray extends ReadonlyArray<SafeJson> {}

/**
 * A validated JSON Array
 *
 * @since 1.1.0
 * @category Model
 */
export type SafeJsonArray = Branded<SafeArrayBrand, JsonArray>

/** @internal */
export const safeJsonArray: (as: ReadonlyArray<SafeJson>) => SafeJsonArray = unsafeCoerce

/**
 * @since 1.1.0
 * @category Model
 */
export interface Printer<E, A> {
  readonly domainToJson: (a: A) => E.Either<PE.PrintError, SafeJson>
  readonly codomainToJson: (e: E) => E.Either<PE.PrintError, SafeJson>
}

/** @internal */
export const printerValidation = E.getApplicativeValidation(PE.semigroupPrintingError)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/** @internal */
export const toJson = (input: unknown): E.Either<PE.PrintError, SafeJson> => {
  if (input === undefined) return E.left(new PE.InvalidValue(input))
  if (typeof input === 'function') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'symbol') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'bigint') return E.left(new PE.InvalidValue(input))
  if (typeof input === 'number' && Number.isNaN(input)) return E.left(new PE.NotANumber())
  if (typeof input === 'number' && !Number.isFinite(input))
    return E.left(new PE.InfiniteValue())
  if (typeof input === 'number') return E.right(input as SafeNumber)
  if (typeof input === 'string') return E.right(input)
  if (typeof input === 'boolean') return E.right(input)
  if (input === null) return E.right(input)
  // This tests for circularity using JSON.stringify's internal circularity checks
  // Because bigints are caught above, this error can only be a circular reference
  const circular = E.tryCatch(
    () => JSON.stringify(input),
    () => new PE.CircularReference(input),
  )
  if (E.isLeft(circular)) return circular
  if (Array.isArray(input)) {
    return pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, val) =>
        pipe(
          toJson(val),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(safeJsonArray),
    )
  }
  return pipe(
    input,
    RR.traverseWithIndex(printerValidation)((key, val) =>
      pipe(
        toJson(val),
        E.mapLeft(err => new PE.ErrorAtKey(key, err)),
      ),
    ),
    E.map(safeJsonRecord),
  )
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export const literal = <
  A extends readonly [L, ...ReadonlyArray<L>],
  L extends S.Literal = S.Literal,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._args: A
): Printer<A[number], A[number]> => ({
  domainToJson: toJson,
  codomainToJson: toJson,
})

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Primitives
 */
export const string: Printer<string, string> = {
  domainToJson: toJson,
  codomainToJson: toJson,
}

/**
 * @since 1.1.0
 * @category Primitives
 */
export const number: Printer<number, number> = {
  domainToJson: toJson,
  codomainToJson: toJson,
}

/**
 * @since 1.1.0
 * @category Primitives
 */
export const boolean: Printer<boolean, boolean> = {
  domainToJson: toJson,
  codomainToJson: toJson,
}

/**
 * @since 1.1.0
 * @category Primitives
 */
export const UnknownArray: Printer<Array<unknown>, Array<unknown>> = {
  domainToJson: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, v) =>
        pipe(
          toJson(v),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(safeJsonArray),
    ),
  codomainToJson: input =>
    pipe(
      input,
      RA.traverseWithIndex(printerValidation)((i, v) =>
        pipe(
          toJson(v),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(safeJsonArray),
    ),
}

/**
 * @since 1.1.0
 * @category Primitives
 */
export const UnknownRecord: Printer<Record<string, unknown>, Record<string, unknown>> = {
  domainToJson: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((key, v) =>
        pipe(
          toJson(v),
          E.mapLeft(err => new PE.ErrorAtKey(key, err)),
        ),
      ),
      E.map(safeJsonRecord),
    ),
  codomainToJson: input =>
    pipe(
      input,
      RR.traverseWithIndex(printerValidation)((key, v) =>
        pipe(
          toJson(v),
          E.mapLeft(err => new PE.ErrorAtKey(key, err)),
        ),
      ),
      E.map(safeJsonRecord),
    ),
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Combinators
 */
export const refine: WithRefine2<URI>['refine'] = (f, id) => pa => ({
  domainToJson: a =>
    f(a) ? pa.domainToJson(a) : E.left(new PE.NamedError(id, new PE.InvalidValue(a))),
  codomainToJson: pa.codomainToJson,
})

/**
 * @since 1.1.0
 * @category Combinators
 */
export const nullable = <E, A>(or: Printer<E, A>): Printer<null | E, null | A> => ({
  domainToJson: a => (a === null ? E.right(null) : or.domainToJson(a)),
  codomainToJson: e => (e === null ? E.right(null) : or.codomainToJson(e)),
})

/** @internal */
export type InnerLeft<E extends Printer<any, any>> = [E] extends [Printer<infer L, any>]
  ? L
  : never

/** @internal */
export type InnerRight<A extends Printer<any, any>> = [A] extends [Printer<any, infer R>]
  ? R
  : never

/**
 * @since 1.1.0
 * @category Combinators
 */
export const struct = <P extends Record<string, Printer<any, any>>>(
  properties: P,
): Printer<
  { [K in keyof P]: InnerLeft<P[K]> },
  { [K in keyof P]: InnerRight<P[K]> }
> => ({
  domainToJson: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) =>
        O.some(
          pipe(
            printer.domainToJson(input[key]),
            E.mapLeft((err): PE.PrintError => new PE.ErrorAtKey(key as string, err)),
          ),
        ),
      ),
      E.map(safeJsonRecord),
    ),
  codomainToJson: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) =>
        O.some(
          pipe(
            printer.codomainToJson(input[key]),
            E.mapLeft(err => new PE.ErrorAtKey(key as string, err)),
          ),
        ),
      ),
      E.map(safeJsonRecord),
    ),
})

/**
 * @since 1.1.0
 * @category Combinators
 */
export const partial = <P extends Record<string, Printer<any, any>>>(
  properties: P,
): Printer<
  Partial<{ [K in keyof P]: InnerLeft<P[K]> }>,
  Partial<{ [K in keyof P]: InnerRight<P[K]> }>
> => ({
  domainToJson: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) =>
        pipe(
          input[key],
          O.fromNullable,
          O.map(value =>
            pipe(
              printer.domainToJson(value),
              E.mapLeft(err => new PE.ErrorAtKey(key as string, err)),
            ),
          ),
        ),
      ),
      E.map(safeJsonRecord),
    ),
  codomainToJson: input =>
    pipe(
      properties,
      witherS(PE.semigroupPrintingError)((key, printer) =>
        pipe(
          input[key],
          O.fromNullable,
          O.map(value =>
            pipe(
              printer.codomainToJson(value),
              E.mapLeft(err => new PE.ErrorAtKey(key as string, err)),
            ),
          ),
        ),
      ),
      E.map(safeJsonRecord),
    ),
})

/**
 * @since 1.1.0
 * @category Combinators
 */
export const record = <E, A>(
  codomain: Printer<E, A>,
): Printer<Record<string, E>, Record<string, A>> => ({
  domainToJson: flow(
    RR.traverseWithIndex(printerValidation)((k, a) =>
      pipe(
        codomain.domainToJson(a),
        E.mapLeft(err => new PE.ErrorAtKey(k, err)),
      ),
    ),

    E.map(safeJsonRecord),
  ),
  codomainToJson: flow(
    RR.traverseWithIndex(printerValidation)((k, a) =>
      pipe(
        codomain.codomainToJson(a),
        E.mapLeft(err => new PE.ErrorAtKey(k, err)),
      ),
    ),
    E.map(safeJsonRecord),
  ),
})

/**
 * @since 1.1.0
 * @category Combinators
 */
export const array = <E, A>(
  item: Printer<E, A>,
): Printer<ReadonlyArray<E>, ReadonlyArray<A>> => ({
  domainToJson: flow(
    RA.traverseWithIndex(printerValidation)((i, a) =>
      pipe(
        item.domainToJson(a),
        E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
      ),
    ),
    E.map(safeJsonArray),
  ),
  codomainToJson: flow(
    RA.traverseWithIndex(printerValidation)((i, a) =>
      pipe(
        item.codomainToJson(a),
        E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
      ),
    ),
    E.map(safeJsonArray),
  ),
})

/**
 * @since 1.1.0
 * @category Combinators
 */
export const tuple = <C extends ReadonlyArray<Printer<any, any>>>(
  ...components: C
): Printer<
  { [K in keyof C]: InnerLeft<C[K]> },
  { [K in keyof C]: InnerRight<C[K]> }
> => ({
  domainToJson: input =>
    pipe(
      RA.zipWith(components, input, (printer, a) => printer.domainToJson(a)),
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(safeJsonArray),
    ),
  codomainToJson: input =>
    pipe(
      RA.zipWith(components, input, (printer, b) => printer.codomainToJson(b)),
      RA.traverseWithIndex(printerValidation)((i, a) =>
        pipe(
          a,
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(safeJsonArray),
    ),
})

/**
 * @since 1.1.0
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
 * @since 1.1.0
 * @category Combinators
 */
export const intersect =
  <F, B>(pb: Printer<F, B>) =>
  <E, A>(pa: Printer<E, A>): Printer<E & F, A & B> => ({
    domainToJson: input =>
      pipe(
        E.Do,
        E.apS('a', pa.domainToJson(input)),
        E.apS('b', pb.domainToJson(input)),
        E.map(({ a, b }) => intersect_(a, b)),
        E.filterOrElseW(
          a => a !== undefined,
          () => new PE.NamedError('Nonzero Intersection', new PE.InvalidValue(undefined)),
        ),
      ),
    codomainToJson: input =>
      pipe(
        E.Do,
        E.apS('a', pa.codomainToJson(input)),
        E.apS('b', pb.codomainToJson(input)),
        E.map(({ a, b }) => intersect_(a, b)),
        E.filterOrElseW(
          a => a !== undefined,
          () => new PE.NamedError('Nonzero Intersection', new PE.InvalidValue(undefined)),
        ),
      ),
  })

/**
 * @since 1.1.0
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
    domainToJson: a => {
      // @ts-expect-error -- typelevel difference
      const printer = members[a[tag]]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return printer!.domainToJson(a)
    },
    codomainToJson: e => {
      // @ts-expect-error -- typelevel difference
      const printer = members[e[tag]]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return printer!.codomainToJson(e)
    },
  })

/**
 * @since 1.1.0
 * @category Combinators
 */
export const lazy = <E, A>(id: string, f: () => Printer<E, A>): Printer<E, A> => ({
  domainToJson: input => {
    const get = S.memoize<void, Printer<E, A>>(f)
    return pipe(
      // Check circularity before printing input
      toJson(input),
      E.chainW(() =>
        pipe(
          get().domainToJson(input),
          E.mapLeft(err => new PE.NamedError(id, err)),
        ),
      ),
    )
  },
  codomainToJson: input => {
    const get = S.memoize<void, Printer<E, A>>(f)
    return pipe(
      // Check circularity before printing input
      toJson(input),
      E.chainW(() =>
        pipe(
          get().codomainToJson(input),
          E.mapLeft(err => new PE.NamedError(id, err)),
        ),
      ),
    )
  },
})

/**
 * @since 1.1.0
 * @category Combintors
 */
export const readonly: <E, A>(arb: Printer<E, A>) => Printer<E, Readonly<A>> = identity

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Instances
 */
export const URI = 'Printer'

/**
 * @since 1.1.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly Printer: Printer<E, A>
  }
}

/**
 * @since 1.1.0
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

// -------------------------------------------------------------------------------------
// Destructors
// -------------------------------------------------------------------------------------

/**
 * Safely parses a Json String
 *
 * @since 1.1.0
 * @category Destructors
 */
export const safeParse: (s: JsonString) => SafeJson = s => JSON.parse(s)

/**
 * Safely stringifies a safe Json
 *
 * @since 1.1.0
 * @category Destructors
 */
export const safeStringify: (s: SafeJson) => JsonString = s =>
  unsafeCoerce(JSON.stringify(s, null, 2))
