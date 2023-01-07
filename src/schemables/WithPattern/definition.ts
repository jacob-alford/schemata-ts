/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Pattern } from 'schemata-ts/PatternBuilder'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPatternHKT2<S> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => HKT2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern1<S extends URIS> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => Kind<S, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern2<S extends URIS2> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => Kind2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern2C<S extends URIS2, E> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => Kind2<S, E, string>
}
