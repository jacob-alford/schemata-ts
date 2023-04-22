import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Enc from 'schemata-ts/Encoder'
import { WithOption } from 'schemata-ts/schemables/option/definition'

export const WithOptionEncoder: WithOption<Enc.SchemableLambda> = {
  optionFromExclude: (exclude, sa) => ({
    encode: flow(
      O.getOrElseW(() => exclude),
      sa.encode,
    ),
  }),
}
