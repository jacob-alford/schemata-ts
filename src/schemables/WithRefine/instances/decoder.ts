/** @since 1.0.0 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithRefine<D.SchemableLambda> = {
  refine: (refinement, refinedName) => from => ({
    decode: flow(
      from.decode,
      E.filterOrElse(refinement, u => D.liftDecodeError(D.typeMismatch(refinedName, u))),
    ),
  }),
}
