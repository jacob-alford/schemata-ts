import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineTranscoder: WithRefine<TC.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    encode: from.encode,
    decode: flow(
      from.decode,
      E.filterOrElse(refinement, u =>
        TC.transcodeErrors(TC.typeMismatch(refinedName, u)),
      ),
    ),
  }),
}
