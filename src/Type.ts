/**
 * SchemableExt intstances for Type
 *
 * @since 0.0.1
 */
import * as t from 'io-ts/Type'
import { SchemableExt1 } from './SchemableExt'

/* number */
import { Type as IntType } from './number/int'
import { Type as NegativeIntType } from './number/negativeInt'
import { Type as PositiveIntType } from './number/positiveInt'

/* string */
import { Type as IsoDateType } from './string/isoDateString'

/* date */
import { Type as SafeDateType } from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<t.URI> = {
  ...t.Schemable,
  /* number */
  Int: IntType,
  NegativeInt: NegativeIntType,
  PositiveInt: PositiveIntType,

  /* string */
  ISODate: IsoDateType,

  /* date */
  SafeDate: SafeDateType,
}
