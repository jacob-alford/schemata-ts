/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithDateHKT2<S> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: HKT2<S, Date, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into
   * valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: HKT2<S, string, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithDate1<S extends URIS> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind<S, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into
   * valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind<S, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithDate2<S extends URIS2> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind2<S, Date, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into
   * valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind2<S, string, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithDate2C<S extends URIS2, E> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind2<S, E, Date>
  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into
   * valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind2<S, E, Date>
}
