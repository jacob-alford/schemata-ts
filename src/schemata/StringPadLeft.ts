import { type Schema, make } from 'schemata-ts/Schema'
import { type PaddingLength } from 'schemata-ts/schemables/padding/definition'

/**
 * A Schema combinator to narrow a string type to a string with a maximum length or exact
 * length with padding on the left
 *
 * @since 1.0.0
 */
export const StringPadLeft: (
  params: PaddingLength,
  char: string,
) => (inner: Schema<string, string>) => Schema<string, string> =
  (params, char) => inner =>
    make(_ => _.padLeft(params, char)(inner.runSchema(_)))
