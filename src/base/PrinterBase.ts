/**
 * An instance of `Schemable` for `Printer`.
 *
 * @since 1.0.2
 */
import * as E from 'fp-ts/Either'
import { flow, identity, pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as S from 'io-ts/Schemable'

import { forIn } from '../internal/util'
import { WithRefine2 } from '../schemables/WithRefine/definition'
import { Schemable2 } from './SchemableBase'

/**
 * @since 1.0.2
 * @category Model
 */
export type PrintingError =
  | ErrorContext
  | CircularReference
  | InfiniteValue
  | NotANumber
  | InvalidValue
  | UnknownError

/**
 * @since 1.0.2
 * @category Model
 */
export class ErrorContext {
  readonly _tag = 'Context'
  constructor(readonly context: ReadonlyArray<string>, readonly error: PrintingError) {}
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
 * @category Model
 */
export interface Printer<E, A> {
  readonly print: (a: A) => E.Either<PrintingError, string>
  readonly printLeft: (e: E) => E.Either<PrintingError, string>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.2
 * @category Constructors
 */
export const printErrorFromInput: (input: unknown) => (error: unknown) => PrintingError =
  input => error => {
    if (input === undefined) return new InvalidValue(input)
    if (typeof input === 'function') return new InvalidValue(input)
    if (typeof input === 'symbol') return new InvalidValue(input)
    if (typeof input === 'bigint') return new InvalidValue(input)
    if (typeof input === 'number' && Number.isNaN(input)) return new NotANumber()
    if (typeof input === 'number' && !Number.isFinite(input)) return new InfiniteValue()
    return new UnknownError(error)
  }

/** @internal */
const stringify: (a: unknown) => E.Either<PrintingError, string> = input =>
  pipe(J.stringify(input), E.mapLeft(printErrorFromInput(input)))

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
export const nullable = <E, A>(or: Printer<E, A>): Printer<null | E, null | A> => ({
  print: a => (a === null ? E.right('null') : or.print(a)),
  printLeft: e => (e === null ? E.right('null') : or.printLeft(e)),
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
    for (const key in a) {
      if (!Object.hasOwn(a, key)) continue
      if (a[key] === a)
        return E.left(new ErrorContext([key], new CircularReference(a[key])))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = properties[key as keyof P]!.print(a[key])
      if (E.isLeft(result)) return E.left(new ErrorContext([key], result.left))
      out[key] = result.right
    }
    return stringify(out)
  },
  printLeft: e => {
    const out: { [K in keyof P]: string } = {} as any
    for (const key in e) {
      if (!Object.hasOwn(e, key)) continue
      if (e[key] === e)
        return E.left(new ErrorContext([key], new CircularReference(e[key])))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = properties[key as keyof P]!.printLeft(e[key])
      if (E.isLeft(result)) return E.left(new ErrorContext([key], result.left))
      out[key] = result.right
    }
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
  print: input =>
    stringify(RA.zipWith(components, input, (printer, a) => printer.print(a))),
  printLeft: input =>
    stringify(RA.zipWith(components, input, (printer, b) => printer.printLeft(b))),
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
  <F, B>(pb: Printer<F, B>) =>
  <E, A>(pa: Printer<E, A>): Printer<E & F, A & B> => ({
    print: input => {
      const a = pa.print(input)
      const b = pb.print(input)
      return stringify(intersect_(a, b))
    },
    printLeft: input => {
      const a = pa.printLeft(input)
      const b = pb.printLeft(input)
      return stringify(intersect_(a, b))
    },
  })

type EnsureTagPrinter<T extends string, M> = {
  [K in keyof M]: Printer<{ [_ in T]: K }, any>
}

/**
 * @since 1.0.2
 * @category Combinators
 */
export const sum =
  <T extends string>(_tag: T) =>
  <A extends Record<PropertyKey, Printer<any, any>>>(
    members: EnsureTagPrinter<T, A> & A,
  ): Printer<
    { [K in keyof A]: InnerLeft<A[K]> }[keyof A],
    { [K in keyof A]: InnerRight<A[K]> }[keyof A]
  > => ({
    print: a => {
      const tag = a[_tag]
      const printer = members[tag]
      return printer.print(a)
    },
    printLeft: e => {
      const tag = e[_tag]
      const printer = members[tag]
      return printer.printLeft(e)
    },
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
