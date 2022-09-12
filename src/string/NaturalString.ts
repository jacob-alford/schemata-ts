/**
 * Natural branded newtype string.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Str from 'fp-ts/string'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { Natural } from '../number/Natural'

/**
 * @since 0.0.1
 * @category Internal
 */
interface NaturalStringBrand {
  readonly Int: unique symbol
}

/**
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 0.0.1
 * @category Model
 */
export type NaturalString = string & NaturalStringBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT<S, NaturalString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, NaturalString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NaturalString>

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isNaturalString(n: string): n is NaturalString {
  return pipe(n, parseFloat, n => Number.isSafeInteger(n) && n >= 0)
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isNaturalString, 'Natural')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isNaturalString))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isNaturalString, 'Natural')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isNaturalString, 'Natural')
)

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toNatural: (n: NaturalString) => Natural = n => unsafeCoerce(parseInt(n))
