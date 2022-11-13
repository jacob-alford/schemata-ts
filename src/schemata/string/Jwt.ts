/**
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import { Branded } from 'io-ts'
import { pipe } from 'fp-ts/function'
import { base64Url } from './Base64Url'

/** @internal */
interface JwtBrand {
  readonly Jwt: unique symbol
}

/**
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 * @category Model
 */
export type Jwt = Branded<string, JwtBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type JwtS = SchemaExt<string, Jwt>

/**
 * /^(base64).(base64)(.(base64)){0,1}$/
 *
 * @since 1.0.0
 * @category Pattern
 */
export const jwt: PB.Pattern = pipe(
  PB.subgroup(base64Url),
  PB.then(PB.char('.')),
  PB.then(PB.subgroup(base64Url)),
  PB.then(
    pipe(PB.char('.'), PB.then(PB.subgroup(base64Url)), PB.subgroup, PB.between(0, 1)),
  ),
)

/**
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 * @category Schema
 */
export const Jwt: JwtS = make(s => s.brand<JwtBrand>()(s.pattern(jwt, 'Jwt')))
