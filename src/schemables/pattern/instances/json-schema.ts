import { pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import * as PB from 'schemata-ts/PatternBuilder'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternJsonSchema: WithPattern<JS.SchemableLambda> = {
  pattern: (pattern, description, caseInsensitive) =>
    pipe(
      JS.make<string>(
        new JS.JsonString(
          undefined,
          undefined,
          PB.regexFromPattern(pattern, caseInsensitive).source,
        ),
      ),
      JS.addDescription({ description }),
    ),
}
