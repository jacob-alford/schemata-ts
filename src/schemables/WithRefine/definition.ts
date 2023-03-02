/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { Refinement } from 'fp-ts/Refinement'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithRefine<S extends SchemableLambda> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string,
  ) => <O>(from: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
