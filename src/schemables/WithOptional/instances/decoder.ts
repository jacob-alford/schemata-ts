/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOptional<D.SchemableLambda> = {
  optional: da => ({
    decode: u =>
      pipe(
        u === undefined ? D.success(u) : da.decode(u),
        E.mapLeft(e => D.liftDecodeError(e)),
      ),
  }),
}
