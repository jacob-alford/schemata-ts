/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import * as O from 'fp-ts/Option'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptionHKT2<S> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: HKT2<S, E, A>,
    eqA?: Eq_.Eq<A | E>,
  ) => HKT2<S, E | B, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption1<S extends URIS> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(
    exclude: B,
    sa: Kind<S, A>,
    eqA?: Eq_.Eq<A>,
  ) => Kind<S, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption2<S extends URIS2> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A | E>,
  ) => Kind2<S, E | B, O.Option<A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption2C<S extends URIS2, E> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A | E>,
  ) => Kind2<S, E, O.Option<A>>
}
