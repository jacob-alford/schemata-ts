/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { Kind2, URIS2, HKT2 } from 'fp-ts/HKT'
import { Refinement } from 'fp-ts/Refinement'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithRefineHKT2<S> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string,
  ) => <O>(from: HKT2<S, O, A>) => HKT2<S, O, B>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithRefine1,
} from 'io-ts/Schemable'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithRefine2<S extends URIS2> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string,
  ) => <O>(from: Kind2<S, O, A>) => Kind2<S, O, B>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithRefine2C,
} from 'io-ts/Schemable'
