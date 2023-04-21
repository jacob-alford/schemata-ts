import { pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

export const WithPatternTranscoder: WithPattern<TC.SchemableLambda> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(
      pattern(p, desc, caseInsensitive),
      D.fromGuard(u => TC.decodeErrors(TC.typeMismatch(desc, u))),
    ),
}
