/**
 * A string of hexadecimal characters.
 *
 * Inspired by
 * [isHexadecimal](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexadecimal.js)
 *
 * @since 0.0.3
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.3
 * @internal
 */
interface HexadecimalBrand {
  readonly Hexadecimal: unique symbol
}

/**
 * A string of hexadecimal characters.
 *
 * Inspired by
 * [isHexadecimal](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexadecimal.js)
 *
 * @since 0.0.3
 * @category Model
 */
export type Hexadecimal = string & HexadecimalBrand

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, Hexadecimal>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Hexadecimal>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, Hexadecimal>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Hexadecimal>

/**
 * @since 0.0.3
 * @internal
 */
const reHex = /^(0x|0h)?[0-9A-F]+$/i

/**
 * @since 0.0.3
 * @category Refinements
 */
export const isHexadecimal = (s: string): s is Hexadecimal => reHex.test(s)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isHexadecimal, 'Hexadecimal')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.3
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isHexadecimal))

/**
 * @since 0.0.3
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isHexadecimal, 'Hexadecimal')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isHexadecimal, 'Hexadecimal')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc.hexaString({
  minLength: 1,
}) as Arb.Arbitrary<Hexadecimal>
