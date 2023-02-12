/**
 * A schema for wrapping an inner schema's output value in a newtype.
 *
 * @since 1.4.0
 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/Guard'
import { Iso } from 'schemata-ts/iso'
import * as Nt from 'schemata-ts/newtype'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/**
 * @since 1.4.0
 * @category Model
 */
export type NewtypeS = <N extends Nt.Newtype<any, any>>(
  iso: Iso<N, Nt.CarrierOf<N>>,
  name: string,
) => <O>(innerType: SchemaExt<O, Nt.CarrierOf<N>>) => SchemaExt<O, N>

/**
 * A schema for wrapping an inner schema's output value in a newtype.
 *
 * @since 1.4.0
 * @category Schema
 */
export const Newtype: NewtypeS = (iso, name) => innerType =>
  make(S =>
    pipe(innerType(S), S.imap(getGuard(innerType), name)(iso.get, iso.reverseGet)),
  )
