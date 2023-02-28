/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption<S extends TypeLambda> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: Kind<S, E, A>,
    eqA?: Eq_.Eq<A | E>,
  ) => Kind<S, E | B, O.Option<A>>
}
