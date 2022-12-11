/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import * as J from 'fp-ts/Json'
import { Branded } from 'io-ts'

/** @internal */
interface JsonStringBrand {
  readonly JsonString: unique symbol
}

/**
 * A valid Json string
 *
 * @since 1.0.2
 * @category Model
 */
export type JsonString = Branded<string, JsonStringBrand>

/**
 * @since 1.0.2
 * @category Model
 */
export interface WithJsonHKT2<S> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: HKT2<S, J.Json, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: HKT2<S, string, JsonString>
}

/**
 * @since 1.0.2
 * @category Model
 */
export interface WithJson1<S extends URIS> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind<S, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind<S, JsonString>
}

/**
 * @since 1.0.2
 * @category Model
 */
export interface WithJson2<S extends URIS2> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind2<S, J.Json, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind2<S, string, JsonString>
}

/**
 * @since 1.0.2
 * @category Model
 */
export interface WithJson2C<S extends URIS2, E> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind2<S, E, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind2<S, E, JsonString>
}
