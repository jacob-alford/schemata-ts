/**
 * SchemableExt intstances for Decoder
 *
 * @since 0.0.1
 */
import * as D from 'io-ts/Decoder'
import { SchemableExt2C } from './SchemableExt'

/* number */
import { Decoder as IntDecoder } from './number/int'
import { Decoder as NegativeIntDecoder } from './number/negativeInt'
import { Decoder as PositiveIntDecoder } from './number/positiveInt'

/* string */
import { Decoder as IsoDateDecoder } from './string/isoDateString'

/* date */
import { Decoder as SafeDateDecoder } from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<D.URI> = {
  ...D.Schemable,
  /* number */
  Int: IntDecoder,
  NegativeInt: NegativeIntDecoder,
  PositiveInt: PositiveIntDecoder,

  /* string */
  ISODate: IsoDateDecoder,

  /* date */
  SafeDate: SafeDateDecoder,
}
