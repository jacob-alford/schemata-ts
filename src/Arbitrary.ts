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
import type * as hkt from 'schemata-ts/HKT'
import { typeOf } from 'schemata-ts/internal/util'

/**
 * @since 1.0.0
 * @category Model
 */
export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as a decoder
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getArbitrary,
} from 'schemata-ts/derivations/arbitrary-schemable'

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
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Arbitrary<this['Output']>
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
