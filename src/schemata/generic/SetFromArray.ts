/**
 * An array input that's converted to a ReadonlySet. Note: does not abide the encoder <->
 * decoder law, but follows a less strict idempotence law.
 *
 * @since 1.3.0
 */
import { pipe } from 'fp-ts/function'
import { Ord } from 'fp-ts/Ord'
import * as RS from 'fp-ts/ReadonlySet'
import * as G from 'schemata-ts/Guard'
import { getGuard } from 'schemata-ts/Guard'
import { make, Schema } from 'schemata-ts/Schema'

/**
 * @since 1.3.0
 * @category Model
 */
export type SetFromArrayS = <A>(
  ordA: Ord<A>,
) => <O>(sA: Schema<O, A>) => Schema<Array<O>, ReadonlySet<A>>

const getSetGuard = <A>(
  guard: G.Guard<unknown, A>,
): G.Guard<unknown, ReadonlySet<A>> => ({
  is: (u): u is ReadonlySet<A> => u instanceof Set && pipe(u, RS.every(guard.is)),
})

/**
 * An array input that's converted to a ReadonlySet. Note: does not abide the encoder <->
 * decoder law, but follows a less strict idempotence law.
 *
 * @since 1.3.0
 */
export const SetFromArray: SetFromArrayS = ordA => sA =>
  make(S =>
    pipe(
      S.array(sA(S)),
      S.imap(getSetGuard(getGuard(sA)), 'SetFromArray')(
        RS.fromReadonlyArray(ordA),
        RS.toReadonlyArray(ordA),
      ),
    ),
  )
