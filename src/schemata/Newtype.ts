/** @since 1.4.0 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/Guard'
import type * as Nt from 'schemata-ts/newtype'
import { type Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'

/**
 * A schema for wrapping an inner schema's output value in a newtype.
 *
 * @since 1.4.0
 * @category Combinators
 */
export const Newtype: <N extends Nt.Newtype<any, any>>(
  iso: Nt.NewtypeIso<N, Nt.CarrierOf<N>>,
  name?: string,
) => <O>(innerType: Schema<O, Nt.CarrierOf<N>>) => Schema<O, N> = (iso, name) => _ =>
  pipe(_, Imap(getGuard(_), iso.wrap, iso.unwrap, name))
