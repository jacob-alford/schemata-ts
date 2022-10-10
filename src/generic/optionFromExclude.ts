/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 0.0.4
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as E from 'fp-ts/Either'
import * as fc from 'fast-check'
import * as TE from 'fp-ts/TaskEither'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as O from 'fp-ts/Option'
import * as Arb from '../internal/ArbitraryBase'
import { flow, SK } from 'fp-ts/function'

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = <A, B extends A, E>(
  exclude: B,
  sa: HKT2<S, E, A>,
  eqA?: Eq_.Eq<A>
) => HKT2<S, E | B, O.Option<A>>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = <A, B extends A>(
  exclude: B,
  sa: Kind<S, A>,
  eqA?: Eq_.Eq<A>
) => Kind<S, O.Option<A>>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = <A, B extends A, E>(
  exclude: B,
  sa: Kind2<S, E, A>,
  eqA?: Eq_.Eq<A>
) => Kind2<S, E | B, O.Option<A>>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = <A, B extends A>(
  exclude: B,
  sa: Kind2<S, unknown, A>,
  eqA?: Eq_.Eq<A>
) => Kind2<S, unknown, O.Option<A>>

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = (exclude, sa, eqA = Eq_.eqStrict) => ({
  decode: flow(sa.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
})

/**
 * @since 0.0.4
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = (exclude, sa) => ({
  encode: flow(
    O.getOrElseW(() => exclude),
    sa.encode
  ),
})

/**
 * @since 0.0.4
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = flow(SK, O.getEq)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = (_, guardA) =>
  G.union(
    G.struct({
      _tag: G.literal('None'),
    }),
    G.struct({
      _tag: G.literal('Some'),
      value: guardA,
    })
  )

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = (
  exclude,
  sa,
  eqA = Eq_.eqStrict
) => ({
  decode: flow(sa.decode, TE.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
})

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = (_, typeA) =>
  t.union(
    t.struct({
      _tag: t.literal('None'),
    }),
    t.struct({
      _tag: t.literal('Some'),
      value: typeA,
    })
  )

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = (_, arbA) =>
  fc.oneof(
    Arb.struct({ _tag: Arb.literal('None') }),
    Arb.struct({ _tag: Arb.literal('Some'), value: arbA })
  )
