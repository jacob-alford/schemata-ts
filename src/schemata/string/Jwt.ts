/**
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, Schema } from 'schemata-ts/Schema'
import { base64Url } from 'schemata-ts/schemata/string/Base64Url'

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
export type JwtS = Schema<string, Jwt>

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
