import * as SC from './_Schema'
import * as D from './base/DecoderBase'
import { Decoder as Primitive } from './schemables/primitives/instances/Decoder'

/**
 * @since 2.0.0
 * @category Schemable
 */
export const Schemable: SC.Schemable<D.DecoderTypeLambda> = {
  ...Primitive,
}

/**
 * @since 2.0.0
 * @category Schemable
 */
export const getDecoder: <E, A>(s: SC.Schema<E, A>) => D.Decoder<unknown, A> =
  SC.interpret(Schemable)
