/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/base/EncoderBase'
import { WithBrand2 } from 'schemata-ts/schemables/WithBrand/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithBrand2<Enc.URI> = {
  brand: () => identity,
}
