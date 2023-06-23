import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalTranscoder: WithOptional<TC.SchemableLambda> = {
  optional: da =>
    makeImplicitOptionalType({
      decode: u => (u === undefined ? TC.success(u) : da.decode(u)),
      encode: a => (a === undefined ? TC.success(undefined) : da.encode(a)),
    }),
}
