/**
 * The extended Schemable typeclass
 *
 * @since 0.0.1
 */
import { URIS, URIS2 } from 'fp-ts/HKT'
import { Schemable, Schemable1, Schemable2C } from 'io-ts/Schemable'
import * as SafeDate from './date/SafeDate'
import * as Int from './number/Int'
import * as NegativeInt from './number/NegativeInt'
import * as PositiveInt from './number/PositiveInt'
import * as ISODate from './string/ISODateString'

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt<S> extends Schemable<S> {
  /* number */
  readonly Int: Int.SchemableParams<S>
  readonly PositiveInt: PositiveInt.SchemableParams<S>
  readonly NegativeInt: NegativeInt.SchemableParams<S>

  /* string */
  readonly ISODate: ISODate.SchemableParams<S>
  readonly SafeDate: SafeDate.SchemableParams<S>
}

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt1<S extends URIS> extends Schemable1<S> {
  /* number */
  readonly Int: Int.SchemableParams1<S>
  readonly PositiveInt: PositiveInt.SchemableParams1<S>
  readonly NegativeInt: NegativeInt.SchemableParams1<S>

  /* string */
  readonly ISODate: ISODate.SchemableParams1<S>
  readonly SafeDate: SafeDate.SchemableParams1<S>
}

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemableExt2C<S extends URIS2> extends Schemable2C<S, unknown> {
  /* number */
  readonly Int: Int.SchemableParams2C<S>
  readonly PositiveInt: PositiveInt.SchemableParams2C<S>
  readonly NegativeInt: NegativeInt.SchemableParams2C<S>

  /* string */
  readonly ISODate: ISODate.SchemableParams2C<S>
  readonly SafeDate: SafeDate.SchemableParams2C<S>
}
