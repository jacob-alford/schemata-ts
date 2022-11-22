/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptionalHKT2<S> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: HKT2<S, O, A>,
  ) => HKT2<S, O | undefined, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional1<S extends URIS> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind<S, A>) => Kind<S, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional2<S extends URIS2> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: Kind2<S, O, A>,
  ) => Kind2<S, O | undefined, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional2C<S extends URIS2, E> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind2<S, E, A>) => Kind2<S, E, A | undefined>
}
