/**
 * Negative floating point branded newtype string.
 *
 * Represents negative floating point number strings:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe, unsafeCoerce } from 'fp-ts/function'

import * as Arb from '../internal/ArbitraryBase'
import * as NegativeFloat from '../number/negativeFloat'

/**
 * @since 0.0.2
 * @internal
 */
interface NegativeFloatStringBrand {
  readonly NegativeFloatString: unique symbol
}

/**
 * Negative floating point branded newtype string.
 *
 * Represents negative floating point number strings:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 0.0.2
 * @category Model
 */
export type NegativeFloatString = string & NegativeFloatStringBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, NegativeFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NegativeFloatString>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NegativeFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NegativeFloatString>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isNegativeFloatString = (s: string): s is NegativeFloatString =>
  pipe(s, Number, NegativeFloat.isNegativeFloat)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNegativeFloatString, 'NegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(
  G.string,
  G.refine(isNegativeFloatString)
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNegativeFloatString, 'NegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNegativeFloatString, 'NegativeFloatString')
)

/**
 * @since 0.0.2
 * @category Utilities
 */
export const toNegativeFloat: (
  s: NegativeFloatString
) => NegativeFloat.NegativeFloat = s => unsafeCoerce(Number(s))

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = NegativeFloat.Arbitrary.map(f =>
  f.toString()
) as Arb.Arbitrary<NegativeFloatString>
