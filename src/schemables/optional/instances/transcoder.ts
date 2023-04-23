import * as TC from 'schemata-ts/internal/transcoder'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalTranscoder: WithOptional<TC.SchemableLambda> = {
  optional: da =>
    makeImplicitOptional(
      {
        decode: u => (u === undefined ? TC.success(u) : da.decode(u)),
        encode: a => (a === undefined ? TC.success(undefined) : da.encode(a)),
      },
      decoder => Object.assign({}, decoder),
    ),
}
