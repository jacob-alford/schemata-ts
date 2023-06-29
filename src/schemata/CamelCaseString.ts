/** @since 2.0.0 */
import { identity, pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { camelCase } from 'schemata-ts/internal/camelcase'
import { type Schema } from 'schemata-ts/Schema'
import { type StringParams } from 'schemata-ts/schemables/primitives/definition'
import { Imap } from 'schemata-ts/schemata/Imap'
import { String } from 'schemata-ts/schemata/String'

/**
 * A schema that converts any string to camel-case
 *
 * @since 2.0.0
 * @category String
 */
export const CamelCaseString: (
  params?: StringParams,
) => Schema<string, string> = params => {
  const string = String(params)
  return pipe(string, Imap(getGuard(string), camelCase, identity))
}
