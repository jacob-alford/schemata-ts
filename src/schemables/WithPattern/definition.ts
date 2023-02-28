/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'
import { Pattern } from 'schemata-ts/PatternBuilder'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern<S extends TypeLambda> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => Kind<S, string, string>
}
