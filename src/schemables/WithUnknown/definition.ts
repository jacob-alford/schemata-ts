/**
 * Represents an unknown value
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknownHKT2<S> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: HKT2<S, unknown, unknown>
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknown1<S extends URIS> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: Kind<S, unknown>
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknown2<S extends URIS2> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: Kind2<S, unknown, unknown>
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknown2C<S extends URIS2, E> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: Kind2<S, E, unknown>
}
