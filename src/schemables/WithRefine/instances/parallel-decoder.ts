/** @since 1.0.0 */
import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as D from 'schemata-ts/internal/Decoder'
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithRefine<PD.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    decode: flow(
      from.decode,
      TE.filterOrElse(refinement, u => D.decodeErrors(D.typeMismatch(refinedName, u))),
    ),
  }),
}
