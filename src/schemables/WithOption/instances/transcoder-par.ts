import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as Eq_ from 'schemata-ts/Eq'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

export const WithOptionTranscoderPar: WithOption<TCP.SchemableLambda> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, TE.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}
