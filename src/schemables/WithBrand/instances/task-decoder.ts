/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as TD from '../../../base/TaskDecoderBase'
import { identity } from 'fp-ts/function'
import { WithBrand2C } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithBrand2C<TD.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}
