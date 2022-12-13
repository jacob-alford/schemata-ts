import * as D from '../../../base/DecoderBase'
import { make2C, WithPrimitives2C } from '../definition'

/**
 * @since 2.0.0
 * @category Instances
 */
export const Decoder: WithPrimitives2C<D.URI, unknown> = make2C<D.URI, unknown>(
  D.string,
  D.number,
  D.boolean,
  D.struct,
  D.array,
)
