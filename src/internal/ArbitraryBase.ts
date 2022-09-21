/**
 * An instance of `Schemable` for `fast-check` arbitraries that emit valid values
 *
 * @since 0.0.2
 * @category Internal
 */
import * as fc from 'fast-check'
import { identity, pipe } from 'fp-ts/function'
import { Refinement } from 'fp-ts/Refinement'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as S from 'io-ts/Schemable'

/**
 * @since 0.0.2
 * @category Model
 */
export interface Arbitrary<A> extends fc.Arbitrary<A> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 0.0.2
 * @category Constructors
 */
export const literal = <
  A extends readonly [L, ...ReadonlyArray<L>],
  L extends S.Literal = S.Literal
>(
  ...values: A
): Arbitrary<A[number]> => fc.oneof(...values.map(v => fc.constant(v)))

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 0.0.2
 * @category Primitives
 */
export const string: Arbitrary<string> = fc.oneof(
  fc.string(),
  fc.asciiString(),
  fc.fullUnicodeString(),
  fc.hexaString(),
  fc.lorem()
)

/**
 * @since 0.0.2
 * @category Primitives
 */
export const number: Arbitrary<number> = fc.oneof(fc.float(), fc.double(), fc.integer())

/**
 * @since 0.0.2
 * @category Primitives
 */
export const boolean: Arbitrary<boolean> = fc.boolean()

/**
 * @since 0.0.2
 * @category Primitives
 */
export const UnknownArray: Arbitrary<Array<unknown>> = fc.array(fc.anything())

/**
 * @since 0.0.2
 * @category Primitives
 */
export const UnknownRecord: Arbitrary<Record<string, unknown>> = fc.dictionary(
  string,
  fc.anything()
)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 0.0.2
 * @category Combinators
 */
export const refine =
  <A, B extends A>(refinement: Refinement<A, B>) =>
  (from: Arbitrary<A>): Arbitrary<B> =>
    from.filter(refinement)

/**
 * @since 0.0.2
 * @category Combinators
 */
export const nullable = <A>(or: Arbitrary<A>): Arbitrary<null | A> =>
  fc.oneof(fc.constant(null), or)

/**
 * @since 0.0.2
 * @category Combinators
 */
export const struct = <A>(properties: {
  [K in keyof A]: Arbitrary<A[K]>
}): Arbitrary<A> => fc.record(properties)

/**
 * @since 0.0.2
 * @category Combinators
 */
export const partial = <A>(properties: { [K in keyof A]: Arbitrary<A[K]> }): Arbitrary<
  Partial<A>
> => {
  const keys = fc.oneof(...Object.keys(properties).map(p => fc.constant(p)))
  return keys.chain(key => {
    const p: { [K in keyof A]: Arbitrary<A[K]> } = { ...properties }
    delete p[key as keyof A]
    return fc.record(p)
  })
}

/**
 * @since 0.0.2
 * @category Combinators
 */
export const record = <A>(codomain: Arbitrary<A>): Arbitrary<Record<string, A>> =>
  fc.dictionary(string, codomain)

/**
 * @since 0.0.2
 * @category Combinators
 */
export const array = <A>(item: Arbitrary<A>): Arbitrary<Array<A>> => fc.array(item)

/**
 * @since 0.0.2
 * @category Combinators
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...components: { [K in keyof A]: Arbitrary<A[K]> }
): Arbitrary<A> => {
  if (components.length === 0) {
    return fc.constant(RA.zero() as A)
  }
  return fc.tuple(...components) as unknown as Arbitrary<A>
}

/**
 * @since 0.0.2
 * @category Internal
 */
export const typeOf = (x: unknown): string => (x === null ? 'null' : typeof x)

/**
 * @since 0.0.2
 * @category Internal
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
 * @since 0.0.2
 * @category Combinators
 */
export const intersect =
  <B>(right: Arbitrary<B>) =>
  <A>(left: Arbitrary<A>): Arbitrary<A & B> =>
    fc.tuple(left, right).map(([a, b]) => intersect_(a, b))

/**
 * @since 0.0.2
 * @category Combinators
 */
export const sum =
  <T extends string>(
    _tag: T // eslint-disable-line @typescript-eslint/no-unused-vars
  ) =>
  <A>(members: { [K in keyof A]: Arbitrary<A[K] & Record<T, K>> }): Arbitrary<
    A[keyof A]
  > =>
    fc.oneof(...pipe(members, RR.toReadonlyArray, RA.map(RTup.snd)))

/**
 * @since 0.0.2
 * @category Combinators
 */
export const lazy = <A>(f: () => Arbitrary<A>): Arbitrary<A> => {
  const get = S.memoize<void, Arbitrary<A>>(f)
  return fc.constant(null).chain(() => get())
}

/**
 * @since 0.0.2
 * @category Combintors
 */
export const readonly: <A>(arb: Arbitrary<A>) => Arbitrary<Readonly<A>> = identity

/**
 * @since 0.0.2
 * @category Combinators
 */
export const union = <A extends [Arbitrary<unknown>, ...Array<Arbitrary<unknown>>]>(
  ...members: A
): Arbitrary<A[number]> => fc.oneof(...members) as unknown as Arbitrary<A[number]>

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 0.0.2
 * @category Instances
 */
export const URI = 'Arbitrary'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Arbitrary: Arbitrary<A>
  }
}

/**
 * @since 0.0.2
 * @category Instances
 */
export const Schemable: S.Schemable1<URI> &
  S.WithUnknownContainers1<URI> &
  S.WithUnion1<URI> &
  S.WithRefine1<URI> = {
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
  UnknownArray,
  UnknownRecord,
  union: union as S.WithUnion1<URI>['union'],
  refine: refine as S.WithRefine1<URI>['refine'],
}
