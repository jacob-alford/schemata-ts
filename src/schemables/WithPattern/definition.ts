/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Pattern } from 'schemata-ts/PatternBuilder'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern<S extends SchemableLambda> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean,
  ) => SchemableKind<S, string, string>
}
