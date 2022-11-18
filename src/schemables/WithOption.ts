/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
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
import * as t_ from 'io-ts'
import * as O from 'fp-ts/Option'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../base/SchemaBase'
import * as Arb from '../base/ArbitraryBase'
import { flow, SK } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptionHKT2<S> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: HKT2<S, E, A>,
    eqA?: Eq_.Eq<A>,
  ) => HKT2<S, E | B, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption1<S extends URIS> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(
    exclude: B,
    sa: Kind<S, A>,
    eqA?: Eq_.Eq<A>,
  ) => Kind<S, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption2<S extends URIS2> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A>,
  ) => Kind2<S, E | B, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption2C<S extends URIS2, E> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A>,
  ) => Kind2<S, E, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOption2C<D.URI, unknown> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithOption2<Enc.URI> = {
  optionFromExclude: (exclude, sa) => ({
    encode: flow(
      O.getOrElseW(() => exclude),
      sa.encode,
    ),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithOption1<Eq_.URI> = { optionFromExclude: flow(SK, O.getEq) }

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithOption1<G.URI> = {
  optionFromExclude: (_, guardA) =>
    G.union(
      G.struct({
        _tag: G.literal('None'),
      }),
      G.struct({
        _tag: G.literal('Some'),
        value: guardA,
      }),
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithOption2C<TD.URI, unknown> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, TE.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithOption1<t.URI> = {
  optionFromExclude: (exclude, tA, eqA = Eq_.eqStrict) =>
    new t_.Type(
      `OptionFromExclude<${tA.name}>`,
      Guard.optionFromExclude(exclude, tA).is,
      flow(tA.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
      Encoder.optionFromExclude(exclude, tA).encode,
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithOption1<Arb.URI> = {
  optionFromExclude: (_, arbA) =>
    fc.oneof(
      Arb.struct({ _tag: Arb.literal('None') }),
      Arb.struct({ _tag: Arb.literal('Some'), value: arbA }),
    ),
}

/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithOption2<SchemaURI>['optionFromExclude'] = (
  exclude,
  schemaA,
  eq,
) => SC.make(S => S.optionFromExclude(exclude, schemaA(S), eq))
