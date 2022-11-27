/**
 * An instance of `Schemable` for `fast-check` arbitraries that emit valid values
 *
 * @since 1.0.0
 */
import type * as FastCheck from 'fast-check'
import { identity, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as S from 'io-ts/Schemable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

/**
 * @since 1.0.0
 * @category Model
 */
export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Constructors
 */
export const literal = <
  A extends readonly [L, ...ReadonlyArray<L>],
  L extends S.Literal = S.Literal,
>(
  ...values: A
): Arbitrary<A[number]> => ({
  arbitrary: fc => fc.oneof(...values.map(v => fc.constant(v))),
})

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Primitives
 */
export const string: Arbitrary<string> = {
  arbitrary: fc =>
    fc.oneof(
      fc.string(),
      fc.asciiString(),
      fc.fullUnicodeString(),
      fc.hexaString(),
      fc.lorem(),
    ),
}

/**
 * @since 1.0.0
 * @category Primitives
 */
export const number: Arbitrary<number> = {
  arbitrary: fc =>
    fc.oneof(
      fc.float({ noDefaultInfinity: true, noNaN: true }),
      fc.double({ noDefaultInfinity: true, noNaN: true }),
      fc.integer(),
    ),
}

/**
 * @since 1.0.0
 * @category Primitives
 */
export const boolean: Arbitrary<boolean> = { arbitrary: fc => fc.boolean() }

/**
 * @since 1.0.0
 * @category Primitives
 */
export const UnknownArray: Arbitrary<Array<unknown>> = {
  arbitrary: fc => fc.array(fc.anything()),
}

/**
 * @since 1.0.0
 * @category Primitives
 */
export const UnknownRecord: Arbitrary<Record<string, unknown>> = {
  arbitrary: fc => fc.dictionary(string.arbitrary(fc), fc.anything()),
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Combinators
 */
export const refine: S.WithRefine1<URI>['refine'] = refinement => from => ({
  arbitrary: fc => from.arbitrary(fc).filter(refinement),
})

/**
 * @since 1.0.0
 * @category Combinators
 */
export const nullable = <A>(or: Arbitrary<A>): Arbitrary<null | A> => ({
  arbitrary: fc => fc.oneof(fc.constant(null), or.arbitrary(fc)),
})

/**
 * @since 1.0.0
 * @category Combinators
 */
export const struct = <A>(properties: {
  [K in keyof A]: Arbitrary<A[K]>
}): Arbitrary<A> => ({
  arbitrary: fc => {
    const out: Any = {}
    for (const [k, arbitrary] of Object.entries<Arbitrary<Any>>(properties)) {
      out[k] = arbitrary.arbitrary(fc)
    }
    return fc.record(out) as FastCheck.Arbitrary<A>
  },
})

/**
 * @since 1.0.0
 * @category Combinators
 */
export const partial = <A>(properties: { [K in keyof A]: Arbitrary<A[K]> }): Arbitrary<
  Partial<A>
> => ({
  arbitrary: fc => {
    const keys = fc.oneof(...Object.keys(properties).map(p => fc.constant(p)))
    return keys.chain(key => {
      const out: Any = {}
      for (const [k, arbitrary] of Object.entries<Arbitrary<Any>>(properties)) {
        if (k !== key) {
          out[k] = arbitrary.arbitrary(fc)
        }
      }
      return fc.record(out)
    })
  },
})

/**
 * @since 1.0.0
 * @category Combinators
 */
export const record = <A>(codomain: Arbitrary<A>): Arbitrary<Record<string, A>> => ({
  arbitrary: fc => fc.dictionary(string.arbitrary(fc), codomain.arbitrary(fc)),
})

/**
 * @since 1.0.0
 * @category Combinators
 */
export const array = <A>(item: Arbitrary<A>): Arbitrary<Array<A>> => ({
  arbitrary: fc => fc.array(item.arbitrary(fc)),
})

/**
 * @since 1.0.0
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
 * @since 1.0.0
 * @internal
 */
export const typeOf = (x: unknown): string => (x === null ? 'null' : typeof x)

/**
 * @since 1.0.0
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
 * @since 1.0.0
 * @category Combinators
 */
export const intersect =
  <B>(right: Arbitrary<B>) =>
  <A>(left: Arbitrary<A>): Arbitrary<A & B> => ({
    arbitrary: fc =>
      fc.tuple(left.arbitrary(fc), right.arbitrary(fc)).map(([a, b]) => intersect_(a, b)),
  })

/**
 * @since 1.0.0
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
 * @since 1.0.0
 * @category Combinators
 */
export const lazy = <A>(f: () => Arbitrary<A>): Arbitrary<A> => ({
  arbitrary: fc => {
    const get = S.memoize<void, Arbitrary<A>>(f)
    return fc.constant(null).chain(() => get().arbitrary(fc))
  },
})

/**
 * @since 1.0.0
 * @category Combintors
 */
export const readonly: <A>(arb: Arbitrary<A>) => Arbitrary<Readonly<A>> = identity

/**
 * @since 1.0.0
 * @category Combinators
 */
export const union: S.WithUnion1<URI>['union'] = (...members) => ({
  arbitrary: fc => fc.oneof(...members.map(arb => arb.arbitrary(fc))),
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instances
 */
export const URI = 'Arbitrary'

/**
 * @since 1.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Arbitrary: Arbitrary<A>
  }
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schemable: S.Schemable1<URI> = {
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
 * @since 1.0.0
 * @category Instances
 */
export const WithUnknownContainers: S.WithUnknownContainers1<URI> = {
  UnknownArray,
  UnknownRecord,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithUnion: S.WithUnion1<URI> = {
  union,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithRefine: S.WithRefine1<URI> = {
  refine,
}
