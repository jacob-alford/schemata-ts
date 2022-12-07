/**
 * A Codec is a combined Decoder, Encoder, and Guard
 *
 * @since 1.0.1
 */
import { Decoder, getDecoder } from './Decoder'
import { Encoder, getEncoder } from './Encoder'
import { getGuard, Guard } from './Guard'
import { SchemaExt } from './SchemaExt'

/**
 * A Codec is a combined Decoder, Encoder, and Guard.
 *
 * @since 1.0.1
 * @category Model
 */
export interface Codec<E, A>
  extends Decoder<unknown, A>,
    Encoder<E, A>,
    Guard<unknown, A> {}

/**
 * @since 1.0.1
 * @category Interpreters
 */
export const getCodec = <E, A>(schema: SchemaExt<E, A>): Codec<E, A> => ({
  ...getDecoder(schema),
  ...getEncoder(schema),
  ...getGuard(schema),
})
