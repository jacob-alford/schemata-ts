import { make, Schema } from 'schemata-ts/Schema'
import { PaddingLength } from 'schemata-ts/schemables/padding/definition'

/**
 * A Schema combinator to narrow a string type to a string with a maximum length or exact
 * length with padding on the left
 *
 * @since 1.0.0
 */
export const StringPadRight: (
  params: PaddingLength,
  char: string,
) => (inner: Schema<string, string>) => Schema<string, string> =
  (params, char) => inner =>
    make(_ => _.padRight(params, char)(inner.runSchema(_)))
