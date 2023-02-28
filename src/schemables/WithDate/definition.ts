/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithDate<S extends TypeLambda> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind<S, Date, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into
   * valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind<S, string, Date>
}
