/**
 * A Typescript Record type with unknown keys and known values.
 *
 * @since 1.4.0
 * @category Model
 */
import { make, Schema } from 'schemata-ts/Schema'

/**
 * A Typescript Record type with unknown keys and known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Record = <E, A>(
  codomain: Schema<E, A>,
): Schema<Record<string, E>, Record<string, A>> =>
  make(S => S.structM({}, { extraProps: 'restParam', restParam: codomain(S) }))
