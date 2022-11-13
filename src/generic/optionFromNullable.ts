/**
 * Represents a conversion from a nullable value to an Optional type
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
import * as O from 'fp-ts/Option'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Arb from '../internal/ArbitraryBase'
import { flow, pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = <A, E>(
  sa: HKT2<S, E, A>,
) => HKT2<S, E | null, O.Option<A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = <A>(sa: Kind<S, A>) => Kind<S, O.Option<A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = <A, E>(
  sa: Kind2<S, E, A>,
) => Kind2<S, E | null, O.Option<A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = <A>(
  sa: Kind2<S, unknown, A>,
) => Kind2<S, unknown, O.Option<A>>

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = decoderA => ({
  decode: u => (u === null ? D.success(O.none) : pipe(decoderA.decode(u), E.map(O.some))),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = encoderA => ({
  encode: flow(O.map(encoderA.encode), O.toNullable),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = O.getEq

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = guardA =>
  G.union(
    G.struct({
      _tag: G.literal('None'),
    }),
    G.struct({
      _tag: G.literal('Some'),
      value: guardA,
    }),
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = taskDecoderA => ({
  decode: u =>
    u === null ? TD.success(O.none) : pipe(taskDecoderA.decode(u), TE.map(O.some)),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = typeA =>
  t.union(
    t.struct({
      _tag: t.literal('None'),
    }),
    t.struct({
      _tag: t.literal('Some'),
      value: typeA,
    }),
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = arbA =>
  fc.oneof(
    Arb.struct({ _tag: Arb.literal('None') }),
    Arb.struct({ _tag: Arb.literal('Some'), value: arbA }),
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = sA =>
  SC.make(S => S.optionFromNullable(sA(S)))
