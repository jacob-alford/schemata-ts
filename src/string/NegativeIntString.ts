/**
 * Negative integer branded newtype string.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Str from 'fp-ts/string'
import { pipe, unsafeCoerce } from 'fp-ts/function'

import * as Arb from '../internal/ArbitraryBase'
import { isIntString, toInt } from './IntString'
import * as NegativeInt from '../number/NegativeInt'

/**
 * @since 0.0.1
 * @category Internal
 */
interface NegativeIntStringBrand {
  readonly NegativeIntString: unique symbol
}

/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 0.0.1
 * @category Model
 */
export type NegativeIntString = string & NegativeIntStringBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, NegativeIntString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NegativeIntString>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NegativeIntString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeIntString>

/**
 * @since 0.0.1
 * @category Refinements
 */
export const isNegativeIntString = (n: string): n is NegativeIntString =>
  isIntString(n) && toInt(n) < 0

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNegativeIntString, 'NegativeIntString')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(
  G.string,
  G.refine(isNegativeIntString)
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNegativeIntString, 'NegativeIntString')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNegativeIntString, 'NegativeIntString')
)

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toNegativeInt: (s: NegativeIntString) => NegativeInt.NegativeInt = s =>
  unsafeCoerce(Number(s))

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = NegativeInt.Arbitrary.map(i =>
  i.toString()
) as Arb.Arbitrary<NegativeIntString>
