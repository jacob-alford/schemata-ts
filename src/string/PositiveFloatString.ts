/**
 * Positive floating point branded newtype string.
 *
 * Represents positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f > 0, f <= 2 ** 53 - 1 }
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

import * as PositiveFloat from '../number/PositiveFloat'
import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.2
 * @category Internal
 */
interface PositiveFloatStringBrand {
  readonly PositiveFloatString: unique symbol
}

/**
 * Positive floating point branded newtype string.
 *
 * Represents positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f > 0, f <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.2
 * @category Model
 */
export type PositiveFloatString = string & PositiveFloatStringBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, PositiveFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, PositiveFloatString>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, PositiveFloatString>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, PositiveFloatString>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isPositiveFloatString = (s: string): s is PositiveFloatString =>
  pipe(s, Number, PositiveFloat.isPositiveFloat)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isPositiveFloatString, 'PositiveFloatString')
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
  G.refine(isPositiveFloatString)
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isPositiveFloatString, 'PositiveFloatString')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isPositiveFloatString, 'PositiveFloatString')
)

/**
 * @since 0.0.2
 * @category Utilities
 */
export const toPositiveFloat: (
  s: PositiveFloatString
) => PositiveFloat.PositiveFloat = s => unsafeCoerce(Number(s))

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = PositiveFloat.Arbitrary.map(f =>
  f.toString()
) as Arb.Arbitrary<PositiveFloatString>
