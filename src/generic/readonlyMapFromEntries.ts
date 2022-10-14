/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as B from 'fp-ts/boolean'
import * as D from 'io-ts/Decoder'
import * as DE from 'io-ts/DecodeError'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as FS from 'io-ts/FreeSemigroup'
import * as E from 'fp-ts/Either'
import * as fc from 'fast-check'
import * as TE from 'fp-ts/TaskEither'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as t from 'io-ts/Type'
import { ContextEntry, Errors, Type as Type_ } from 'io-ts'
import * as Ord from 'fp-ts/Ord'
import * as Arb from '../internal/ArbitraryBase'
import { flow, pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = <K, A, EK, EA>(
  ordEK: Ord.Ord<K>,
  sk: HKT2<S, EK, K>,
  sa: HKT2<S, EA, A>
) => HKT2<S, ReadonlyArray<readonly [K, A]>, ReadonlyMap<K, A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = <K, A>(
  ordK: Ord.Ord<K>,
  sk: Kind<S, K>,
  sa: Kind<S, A>
) => Kind<S, ReadonlyMap<K, A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = <K, A, EK, EA>(
  ordEK: Ord.Ord<K>,
  sk: Kind2<S, EK, K>,
  sa: Kind2<S, EA, A>
) => Kind2<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = <K, A>(
  ordK: Ord.Ord<K>,
  sk: Kind2<S, unknown, K>,
  sa: Kind2<S, unknown, A>
) => Kind2<S, unknown, ReadonlyMap<K, A>>

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = (ordK, sk, sa) => ({
  decode: flow(
    D.array(D.tuple(sk, sa)).decode,
    E.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable))
  ),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = (ordK, sk, sa) => ({
  encode: flow(RM.toReadonlyArray(ordK), RA.map(RTup.bimap(sa.encode, sk.encode))),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = (_, sk, sa) => RM.getEq(sk, sa)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = <K, A>(
  ordK: Ord.Ord<K>,
  sk: G.Guard<unknown, K>,
  sa: G.Guard<unknown, A>
) => ({
  is: (a): a is ReadonlyMap<K, A> =>
    a instanceof Map &&
    pipe(
      a,
      RM.foldMap(ordK)(B.MonoidAll)(
        entry =>
          Array.isArray(entry) && entry.length === 2 && sk.is(entry[0]) && sa.is(entry[1])
      )
    ),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = (ordK, sk, sa) => ({
  decode: flow(
    TD.array(TD.tuple(sk, sa)).decode,
    TE.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable))
  ),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = <K, A>(
  ordK: Ord.Ord<K>,
  typeK: t.Type<K>,
  typeA: t.Type<A>
) =>
  new Type_(
    `ReadonlyMap<${typeK.name},${typeA.name}>`,
    Guard<K, A>(ordK, { is: typeK.is }, { is: typeA.is }).is,
    flow(
      Decoder<K, A>(
        ordK,
        {
          decode: flow(
            typeK.decode,
            E.mapLeft<Errors, D.DecodeError>(errs =>
              FS.of(
                DE.leaf(
                  errs,
                  pipe(
                    errs,
                    RA.foldMap(Str.Monoid)(e => `${e.message ?? ''}\n`)
                  )
                )
              )
            )
          ),
        },
        {
          decode: flow(
            typeA.decode,
            E.mapLeft<Errors, D.DecodeError>(errs =>
              FS.of(
                DE.leaf(
                  errs,
                  pipe(
                    errs,
                    RA.foldMap(Str.Monoid)(e => `${e.message ?? ''}\n`)
                  )
                )
              )
            )
          ),
        }
      ).decode,
      E.mapLeft(
        flow(
          D.draw,
          (errMsg): Errors => [
            { message: errMsg, context: RA.zero<ContextEntry>(), value: undefined },
          ]
        )
      )
    ),
    Encoder(ordK, typeK, typeA).encode
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = (ordK, arbK, arbA) =>
  fc.array(fc.tuple(arbK, arbA)).map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable))
