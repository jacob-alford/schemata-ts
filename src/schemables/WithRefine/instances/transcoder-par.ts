/** @since 1.0.0 */
import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/Transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

export const WithRefineTranscoderPar: WithRefine<TCP.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    decode: flow(
      from.decode,
      TE.filterOrElse(refinement, u =>
        TC.transcodeErrors(TC.typeMismatch(refinedName, u)),
      ),
    ),
  }),
}
