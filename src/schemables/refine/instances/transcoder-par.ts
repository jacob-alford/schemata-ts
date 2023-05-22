import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineTranscoderPar: WithRefine<TCP.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    encode: from.encode,
    decode: flow(
      from.decode,
      TE.filterOrElse(refinement, u =>
        TC.transcodeErrors(TC.typeMismatch(refinedName, u)),
      ),
    ),
  }),
}
