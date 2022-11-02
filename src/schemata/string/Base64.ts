/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'
import { pipe } from 'fp-ts/function'

/** @internal */
type Base64Brand = Brand<{ readonly Base64: unique symbol }['Base64']>

/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64 = string & Base64Brand

/**
 * @since 1.0.0
 * @category Model
 */
export type Base64S = SchemaExt<string, Base64>

/**
 * /^([A-Za-z0-9+/]*?([=]{0,2}))$/
 *
 * @since 1.0.0
 * @category Pattern
 */
export const base64: PB.Pattern = pipe(
  PB.alnum,
  PB.and(PB.characterClass(false, '+', '/')),
  PB.anyNumber(),
  PB.then(pipe(PB.characterClass(false, '='), PB.between(0, 2), PB.subgroup))
)

/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category Schema
 */
export const Base64: Base64S = make(S =>
  pipe(
    S.pattern(base64, 'Base64'),
    S.padRight({ by: 'ExactLength', exactLength: s => s.length + (s.length % 2) }, '='),
    S.brand<Base64Brand>()
  )
)
