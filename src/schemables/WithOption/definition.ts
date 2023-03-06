/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as O from 'fp-ts/Option'
import * as Eq_ from 'schemata-ts/Eq'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOption<S extends SchemableLambda> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: SchemableKind<S, E, A>,
    eqA?: Eq_.Eq<A | E>,
  ) => SchemableKind<S, E | B, O.Option<A>>
}
