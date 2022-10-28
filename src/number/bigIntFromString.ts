/**
 * Represents bigints converted from strings
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as fc from 'fast-check'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Arb from '../internal/ArbitraryBase'
import { success, failure, Type as Type_ } from 'io-ts'
import { flow, pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, bigint>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, bigint>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, bigint>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, bigint>

/**
 * @since 1.0.0
 * @category Refinements
 */
export const isBigIntString = (s: string): boolean =>
  pipe(
    s,
    O.fromPredicate(flow(Str.trim, s => s.length > 0)),
    O.chain(O.tryCatchK(s => BigInt(s))),
    O.isSome
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = {
  decode: s =>
    typeof s === 'string' && isBigIntString(s)
      ? D.success(BigInt(s))
      : D.failure(s, 'bigIntFromString'),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = {
  encode: String,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Eq_.eqStrict

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = {
  is: (bi): bi is bigint => typeof bi === 'bigint',
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = {
  decode: s =>
    typeof s === 'string' && isBigIntString(s)
      ? TD.success(BigInt(s))
      : TD.failure(s, 'bigIntFromString'),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = new Type_(
  'bigIntFromString',
  Guard.is,
  (s, ctx) =>
    typeof s === 'string' && isBigIntString(s)
      ? success(BigInt(s))
      : failure(s, ctx, 'bigIntFromString'),
  Encoder.encode
)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc.bigInt()
