/**
 * SchemableExt intstances for Eq
 *
 * @since 0.0.1
 */
import * as Eq from 'fp-ts/Eq'
import { Schemable as EqSchemable } from 'io-ts/Eq'
import { SchemableExt1 } from './SchemableExt'

/* number */
import { Eq as IntEq } from './number/int'
import { Eq as NegativeIntEq } from './number/negativeInt'
import { Eq as PositiveIntEq } from './number/positiveInt'

/* string */
import { Eq as IsoDateEq } from './string/isoDateString'

/* date */
import { Eq as SafeDateEq } from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<Eq.URI> = {
  ...EqSchemable,
  /* number */
  Int: IntEq,
  NegativeInt: NegativeIntEq,
  PositiveInt: PositiveIntEq,

  /* string */
  ISODate: IsoDateEq,

  /* date */
  SafeDate: SafeDateEq,
}
