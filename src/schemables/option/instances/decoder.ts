import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Eq_ from 'schemata-ts/Eq'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithOption } from 'schemata-ts/schemables/option/definition'

export const WithOptionTranscoder: WithOption<TC.SchemableLambda> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}
