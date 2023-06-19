/**
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
import { base64Url } from 'schemata-ts/schemata/Base64Url'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

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
export const Jwt: Schema<Jwt> = Brand<JwtBrand>()(Pattern(jwt, 'Jwt'))
