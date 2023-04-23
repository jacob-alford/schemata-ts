import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalTranscoderPar: WithOptional<TCP.SchemableLambda> = {
  optional: da =>
    makeImplicitOptional(
      {
        decode: u => (u === undefined ? TCP.success<any>(u) : da.decode(u)),
        encode: a => (a === undefined ? TCP.success(undefined) : da.encode(a)),
      },
      decoder => Object.assign({}, decoder),
    ),
}
