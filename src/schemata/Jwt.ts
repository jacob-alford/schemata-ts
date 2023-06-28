/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
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
 * A valid, Base64-encoded JWT.
 *
 * @since 1.0.0
 * @category String
 */
export const Jwt: Schema<Jwt> = Brand<JwtBrand>()(Pattern(k.patterns.jwt, 'Jwt'))
