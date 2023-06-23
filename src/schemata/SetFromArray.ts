/** @since 1.3.0 */
import { pipe } from 'fp-ts/function'
import { type Ord } from 'fp-ts/Ord'
import * as RS from 'fp-ts/ReadonlySet'
import { getGuard } from 'schemata-ts/Guard'
import type * as G from 'schemata-ts/internal/guard'
import { type Schema } from 'schemata-ts/Schema'
import { Array as Array_ } from 'schemata-ts/schemata/Array'
import { Imap } from 'schemata-ts/schemata/Imap'

const getSetGuard = <A>(guard: G.Guard<A>): G.Guard<ReadonlySet<A>> => ({
  is: (u): u is ReadonlySet<A> => u instanceof Set && pipe(u, RS.every(guard.is)),
})

/**
 * An array input that's converted to a ReadonlySet.
 *
 * @since 1.3.0
 * @category Combinators
 */
export const SetFromArray: <A>(
  ordA: Ord<A>,
) => <O>(sA: Schema<O, A>) => Schema<ReadonlyArray<O>, ReadonlySet<A>> = ordA => _ =>
  pipe(
    _,
    Array_(),
    Imap(getSetGuard(getGuard(_)), RS.fromReadonlyArray(ordA), RS.toReadonlyArray(ordA)),
  )
