/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * This is heavily inspired by the `validator.js` module
 * [`isBtcAddress`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBtcAddress.js).
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
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.2
 * @category Internal
 */
interface BtcAddressBrand {
  readonly BtcAddress: unique symbol
}

/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * This is heavily inspired by the `validator.js` module
 * [`isBtcAddress`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBtcAddress.js).
 *
 * @since 0.0.2
 * @category Model
 */
export type BtcAddress = string & BtcAddressBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, BtcAddress>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, BtcAddress>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, BtcAddress>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, BtcAddress>

/**
 * @since 0.0.2
 * @category Internal
 */
const bech32 = /^(bc1)[a-z0-9]{25,39}$/

/**
 * @since 0.0.2
 * @category Internal
 */
const base58 = /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isBtcAddress = (s: string): s is BtcAddress =>
  pipe(s, Str.startsWith('bc1')) ? bech32.test(s) : base58.test(s)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isBtcAddress, 'BtcAddress')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isBtcAddress))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isBtcAddress, 'BtcAddress')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isBtcAddress, 'BtcAddress')
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
export const Arbitrary: SchemableParams1<Arb.URI> = fc.oneof(
  // bech32
  fc
    .stringOf(
      fc.oneof(
        fc.nat(9).map(c => c.toString()),
        fc
          .integer({
            min: 'a'.charCodeAt(0),
            max: 'z'.charCodeAt(0),
          })
          .map(n => String.fromCharCode(n))
      ),
      { minLength: 25, maxLength: 39 }
    )
    .map(s => 'bc1' + s),
  // base58
  fc
    .stringOf(
      fc.base64().filter(c => !'IOl0+=/'.includes(c)),
      { minLength: 25, maxLength: 39 }
    )
    .chain(addr =>
      fc.oneof(fc.constant('1'), fc.constant('3')).map(prefix => prefix + addr)
    )
) as Arb.Arbitrary<BtcAddress>
