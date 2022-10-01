/**
 * TODO: Add module comment
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
import * as NonPositiveFloat from '../number/NonPositiveFloat'

/**
 * @since 0.0.4
 * @category Internal
 */
interface NonPositiveFloatStringBrand {
  readonly NonPositiveFloatString: unique symbol
}

/**
 * TODO: Add module comment
 *
 * @since 0.0.4
 * @category Model
 */
export type NonPositiveFloatString = string & NonPositiveFloatStringBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, NonPositiveFloatString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NonPositiveFloatString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, NonPositiveFloatString>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonPositiveFloatString>

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isNonPositiveFloatString = (s: string): s is NonPositiveFloatString =>
  typeof s === 'string' && pipe(s, Number, NonPositiveFloat.isNonPositiveFloat)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNonPositiveFloatString, 'NonPositiveFloatString')
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
  G.refine(isNonPositiveFloatString)
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNonPositiveFloatString, 'NonPositiveFloatString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNonPositiveFloatString, 'NonPositiveFloatString')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = NonPositiveFloat.Arbitrary.map(f =>
  f.toString()
) as Arb.Arbitrary<NonPositiveFloatString>
