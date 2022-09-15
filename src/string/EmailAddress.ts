/**
 * Represents strings (emailAddresss) that conform to the RFC 5322 standard.
 *
 * See: https://emailregex.com/
 *
 * **Note: Does not validate international addresses**
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.1
 * @category Internal
 */
interface EmailAddressBrand {
  readonly EmailAddress: unique symbol
}

/**
 * See: https://emailregex.com/
 *
 * @since 0.0.1
 * @category Internal
 */
const emailAddressRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Represents strings (emailAddresss) that conform to the RFC 5322 standard.
 *
 * See: https://emailregex.com/
 *
 * **Note: Does not validate international addresses**
 *
 * @since 0.0.1
 * @category Model
 */
export type EmailAddress = string & EmailAddressBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT<S, EmailAddress>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, EmailAddress>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, EmailAddress>

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isEmailAddress(s: string): s is EmailAddress {
  return typeof s === 'string' && emailAddressRegex.test(s)
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isEmailAddress, 'EmailAddress')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isEmailAddress))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isEmailAddress, 'EmailAddress')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isEmailAddress, 'EmailAddress')
)
