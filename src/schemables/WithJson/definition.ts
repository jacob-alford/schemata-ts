/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as J from 'fp-ts/Json'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { JsonString, SafeJson } from 'schemata-ts/Printer'

/**
 * @since 1.1.0
 * @category Model
 */
export interface WithJson<S extends SchemableLambda> {
  /**
   * @since 1.1.0
   * @category Model
   */
  readonly json: SchemableKind<S, J.Json, SafeJson>
  /**
   * @since 1.1.0
   * @category Model
   */
  readonly jsonString: SchemableKind<S, string, JsonString>
}
