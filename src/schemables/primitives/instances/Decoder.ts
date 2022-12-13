/** @since 2.0.0 */
import * as D from '../../../base/DecoderBase'
import { make } from '..'
import * as G from './Guard'

/**
 * @since 2.0.0
 * @category Instances
 */
export const Decoder = make<D.DecoderTypeLambda>(
  D.fromGuard(G.string, 'string'),
  D.fromGuard(G.number, 'number'),
  D.fromGuard(G.boolean, 'boolean'),
  undefined as any,
  undefined as any,
)
