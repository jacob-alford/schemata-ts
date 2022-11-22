/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as Enc from '../../../base/EncoderBase'
import { WithBrand2 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithBrand2<Enc.URI> = {
  brand: () => identity,
}
