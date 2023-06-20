import { identity, pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { pattern } from 'schemata-ts/schemables/pattern/utils'

export const PatternTranscoder: WithPattern<TC.SchemableLambda> = {
  pattern: (p, name, caseInsensitive) =>
    pipe(
      pattern(p, caseInsensitive),
      TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch(name, u))),
    ),
}
