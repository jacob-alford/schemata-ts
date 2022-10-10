/**
 * Represents strings which can be converted into `BitInt`.
 *
 * @since 0.0.4
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
import { flow, pipe } from 'fp-ts/function'

import * as NonEmptyString from './nonemptyString'

/**
 * @since 0.0.4
 * @category Internal
 */
interface BigIntStringBrand {
  readonly BigIntString: unique symbol
}

/**
 * Represents strings which can be converted into `BitInt`
 *
 * @since 0.0.4
 * @category Model
 */
export type BigIntString = string & BigIntStringBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, BigIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, BigIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, BigIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, BigIntString>

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isBigIntString = (s: string): s is BigIntString =>
  pipe(
    s,
    O.fromPredicate(flow(Str.trim, NonEmptyString.isNonemptyString)),
    O.chain(O.tryCatchK(s => BigInt(s))),
    O.isSome
  )

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isBigIntString, 'BigIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = {
  encode: String,
}

/**
 * @since 0.0.4
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.4
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isBigIntString))

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isBigIntString, 'BigIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isBigIntString, 'BigIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .bigInt()
  .map(b => b.toString()) as SchemableParams1<Arb.URI>

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toBigInt: (n: BigIntString) => bigint = n => BigInt(n)
