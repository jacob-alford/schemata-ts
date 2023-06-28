import { regexFromPattern } from 'kuvio'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternJsonSchema: WithPattern<JS.SchemableLambda> = {
  pattern: (pattern, _, caseInsensitive) =>
    JS.make<string>(
      new JS.JsonString(
        undefined,
        undefined,
        regexFromPattern(pattern, caseInsensitive).source,
      ),
    ),
}
