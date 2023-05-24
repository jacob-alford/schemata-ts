import { unsafeCoerce } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalInformation: WithOptional<Inf.SchemableLambda> = {
  optional: inner => unsafeCoerce(Inf.makeInformation(inner + 1)),
}
