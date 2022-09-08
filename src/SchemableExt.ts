/**
 * The extended Schemable typeclass
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import { Schemable, Schemable1, Schemable2C } from 'io-ts/Schemable'
import { SafeDate } from './date/safeDate'
import { Int } from './number/int'
import { NegativeInt } from './number/negativeInt'
import { PositiveInt } from './number/positiveInt'
import { ISODate } from './string/isoDateString'

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt<S> extends Schemable<S> {
  /* number */
  readonly Int: HKT<S, Int>
  readonly PositiveInt: HKT<S, PositiveInt>
  readonly NegativeInt: HKT<S, NegativeInt>

  /* string */
  readonly ISODate: HKT<S, ISODate>
  readonly SafeDate: HKT<S, SafeDate>
}

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt1<S extends URIS> extends Schemable1<S> {
  /* number */
  readonly Int: Kind<S, Int>
  readonly PositiveInt: Kind<S, PositiveInt>
  readonly NegativeInt: Kind<S, NegativeInt>

  /* string */
  readonly ISODate: Kind<S, ISODate>
  readonly SafeDate: Kind<S, SafeDate>
}

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt2C<S extends URIS2> extends Schemable2C<S, unknown> {
  /* number */
  readonly Int: Kind2<S, unknown, Int>
  readonly PositiveInt: Kind2<S, unknown, PositiveInt>
  readonly NegativeInt: Kind2<S, unknown, NegativeInt>

  /* string */
  readonly ISODate: Kind2<S, unknown, ISODate>
  readonly SafeDate: Kind2<S, unknown, SafeDate>
}
