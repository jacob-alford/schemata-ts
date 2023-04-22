import { pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { pattern } from 'schemata-ts/schemables/pattern/utils'

export const WithPatternTranscoder: WithPattern<TC.SchemableLambda> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(
      pattern(p, desc, caseInsensitive),
      D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch(desc, u))),
    ),
}
