import { Kind2, URIS2, HKT2 } from 'fp-ts/HKT'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as SC from '../SchemaExt'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithUnknownContainersHKT2<S> {
  readonly UnknownArray: HKT2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: HKT2<S, Record<string, unknown>, Record<string, unknown>>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithUnknownContainers1,
} from 'io-ts/Schemable'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithUnknownContainers2<S extends URIS2> {
  readonly UnknownArray: Kind2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: Kind2<S, Record<string, unknown>, Record<string, unknown>>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithUnknownContainers2C,
} from 'io-ts/Schemable'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Arbitrary,
} from '../internal/ArbitraryBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Decoder,
} from '../internal/DecoderBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Encoder,
} from '../internal/EncoderBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Eq,
} from '../internal/EqBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Guard,
} from '../internal/GuardBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as TaskDecoder,
} from '../internal/TaskDecoderBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithUnknownContainers as Type,
} from '../internal/TypeBase'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithUnknownContainers2<SchemaURI> = {
  UnknownArray: SC.make(_ => _.UnknownArray),
  UnknownRecord: SC.make(_ => _.UnknownRecord),
}
