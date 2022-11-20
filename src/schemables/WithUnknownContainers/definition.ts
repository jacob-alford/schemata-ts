/**
 * Re-export of `WithUnknownContainers` from `io-ts/Schemable/WithUnknownContainers`
 *
 * @since 1.0.0
 */
import { Kind2, URIS2, HKT2 } from 'fp-ts/HKT'

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
