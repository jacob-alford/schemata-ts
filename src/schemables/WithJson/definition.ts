/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as J from 'fp-ts/Json'
import { JsonString, SafeJson } from 'schemata-ts/base/PrinterBase'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.1.0
 * @category Model
 */
export interface WithJson<S extends TypeLambda> {
  /**
   * @since 1.1.0
   * @category Model
   */
  readonly json: Kind<S, J.Json, SafeJson>
  /**
   * @since 1.1.0
   * @category Model
   */
  readonly jsonString: Kind<S, string, JsonString>
}
