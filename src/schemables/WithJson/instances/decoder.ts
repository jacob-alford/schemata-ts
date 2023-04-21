import { pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Guard } from 'schemata-ts/schemables/WithJson/instances/guard'

export const WithJsonTranscoder: WithJson<TC.SchemableLambda> = {
  json: pipe(
    Guard.json,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('Json', u))),
  ),
  jsonString: pipe(
    Guard.jsonString,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('JsonString', u))),
  ),
}
