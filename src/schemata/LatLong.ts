/**
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface LatLongBrand {
  readonly LatLong: unique symbol
}

/**
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 * @category Model
 */
export type LatLong = Branded<string, LatLongBrand>

/**
 * Represents a Lat/Long coordinate.
 *
 * @since 1.0.0
 * @category String
 */
export const LatLong: Schema<LatLong> = Brand<LatLongBrand>()(
  Pattern(k.patterns.latLong, 'LatLong'),
)
