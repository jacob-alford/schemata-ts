import { unsafeCoerce } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

export const WithJsonEncoder: WithJson<Enc.SchemableLambda> = {
  json: { encode: unsafeCoerce },
  jsonString: Enc.id(),
}
