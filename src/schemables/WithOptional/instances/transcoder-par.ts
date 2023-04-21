import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const WithOptionalTranscoderPar: WithOptional<TCP.SchemableLambda> = {
  optional: da =>
    makeImplicitOptional(
      {
        decode: u => (u === undefined ? PD.success<any>(u) : da.decode(u)),
      },
      decoder => Object.assign({}, decoder),
    ),
}
