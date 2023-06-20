import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptionalType } from 'schemata-ts/struct'

export const OptionalTranscoderPar: WithOptional<TCP.SchemableLambda> = {
  optional: da =>
    makeImplicitOptionalType({
      decode: u => (u === undefined ? TCP.success<any>(u) : da.decode(u)),
      encode: a => (a === undefined ? TCP.success(undefined) : da.encode(a)),
    }),
}
