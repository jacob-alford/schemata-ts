/**
 * SchemableExt intstances for Guard
 *
 * @since 0.0.1
 */
import * as G from 'io-ts/Guard'
import { SchemableExt1 } from './SchemableExt'

/* number */
import { Guard as IntGuard } from './number/int'
import { Guard as NegativeIntGuard } from './number/negativeInt'
import { Guard as PositiveIntGuard } from './number/positiveInt'

/* string */
import { Guard as IsoDateGuard } from './string/isoDateString'

/* date */
import { Guard as SafeDateGuard } from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<G.URI> = {
  ...G.Schemable,
  /* number */
  Int: IntGuard,
  NegativeInt: NegativeIntGuard,
  PositiveInt: PositiveIntGuard,

  /* string */
  ISODate: IsoDateGuard,

  /* date */
  SafeDate: SafeDateGuard,
}
