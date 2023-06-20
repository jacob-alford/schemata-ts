import * as JS from 'schemata-ts/internal/json-schema'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserJsonSchema: WithParser<JS.SchemableLambda> = {
  parse: (_, __, ___, contentEncoding, contentMediaType, format) => inner =>
    JS.make(
      inner instanceof JS.JsonString
        ? new JS.JsonString(
            inner.minLength,
            inner.maxLength,
            inner.pattern,
            contentEncoding ?? inner.contentEncoding,
            contentMediaType ?? inner.contentMediaType,
            inner.contentSchema,
            format ?? inner.format,
          )
        : new JS.JsonString(),
    ),
}
