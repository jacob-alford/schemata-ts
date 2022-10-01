/**
 * NonPositive integer branded newtype string.
 *
 * Represents integer strings which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 0.0.4
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Arb from '../internal/ArbitraryBase'
import { pipe } from 'fp-ts/function'
import * as NonPositiveInt from '../number/NonPositiveInt'

/**
 * @since 0.0.4
 * @category Internal
 */
interface NonPositiveIntStringBrand {
  readonly NonPositiveIntString: unique symbol
}

/**
 * NonPositive integer branded newtype string.
 *
 * Represents integer strings which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 0.0.4
 * @category Model
 */
export type NonPositiveIntString = string & NonPositiveIntStringBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, NonPositiveIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NonPositiveIntString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveIntString>

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isNonPositiveIntString = (s: string): s is NonPositiveIntString =>
  typeof s === 'string' && pipe(s, Number, NonPositiveInt.isNonPositiveInt)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNonPositiveIntString, 'NonPositiveIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.4
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.4
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(
  G.string,
  G.refine(isNonPositiveIntString)
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNonPositiveIntString, 'NonPositiveIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNonPositiveIntString, 'NonPositiveIntString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = NonPositiveInt.Arbitrary.map(f =>
  f.toString()
) as Arb.Arbitrary<NonPositiveIntString>
