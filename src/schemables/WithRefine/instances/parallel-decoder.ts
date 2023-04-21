/** @since 1.0.0 */
import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/Transcoder'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

export const WithRefineParallelDecoder: WithRefine<PD.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    decode: flow(
      from.decode,
      TE.filterOrElse(refinement, u => TC.decodeErrors(TC.typeMismatch(refinedName, u))),
    ),
  }),
}
