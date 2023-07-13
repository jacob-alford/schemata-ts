import * as JS from 'schemata-ts/internal/json-schema'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserJsonSchema: WithParser<JS.SchemableLambda> = {
  parse: (_, __, ___, contentEncoding, contentMediaType, format) => inner =>
    JS.make(
      new JS.JsonString(
        undefined,
        undefined,
        undefined,
        contentEncoding,
        contentMediaType,
        contentMediaType === undefined ? undefined : inner,
        format,
      ),
    ),
}
