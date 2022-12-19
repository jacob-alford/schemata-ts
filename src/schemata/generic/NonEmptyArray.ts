/**
 * A read-only Array containing one or more elements.
 *
 * @since 1.1.0
 */
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'

import { make, SchemaExt } from '../../SchemaExt'

/**
 * @since 1.1.0
 * @category Model
 */
export type NonEmptyArrayS = <A, O>(
  sA: SchemaExt<O, A>,
) => SchemaExt<Array<O>, RNEA.ReadonlyNonEmptyArray<A>>

/**
 * A read-only Array containing one or more elements.
 *
 * @since 1.1.0
 * @category Schema
 */
export const NonEmptyArray: NonEmptyArrayS = sA =>
  make(S => pipe(S.array(sA(S)), S.readonly, S.refine(RA.isNonEmpty, 'NonEmptyArray')))
