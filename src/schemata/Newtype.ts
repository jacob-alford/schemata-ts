/**
 * A schema for wrapping an inner schema's output value in a newtype.
 *
 * @since 1.4.0
 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/Guard'
import { Iso } from 'schemata-ts/iso'
import * as Nt from 'schemata-ts/newtype'
import { Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'

/**
 * A schema for wrapping an inner schema's output value in a newtype.
 *
 * @since 1.4.0
 * @category Schema
 */
export const Newtype: <N extends Nt.Newtype<any, any>>(
  iso: Iso<N, Nt.CarrierOf<N>>,
) => <O>(innerType: Schema<O, Nt.CarrierOf<N>>) => Schema<O, N> = iso => _ =>
  pipe(_, Imap(getGuard(_), iso.get, iso.reverseGet))
