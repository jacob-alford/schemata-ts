/** @since 1.0.0 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

export const WithRefineTranscoder: WithRefine<TC.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    decode: flow(
      from.decode,
      E.filterOrElse(refinement, u => TC.decodeErrors(TC.typeMismatch(refinedName, u))),
    ),
  }),
}
