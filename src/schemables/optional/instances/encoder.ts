import * as Enc from 'schemata-ts/Encoder'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const WithOptionalEncoder: WithOptional<Enc.SchemableLambda> = {
  optional: ea => ({
    encode: a => (a === undefined ? undefined : ea.encode(a)),
  }),
}
