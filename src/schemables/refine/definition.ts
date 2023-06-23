import { type Refinement } from 'fp-ts/Refinement'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithRefine<S extends SchemableLambda> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    refinedName: string,
  ) => <O>(from: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
