import { Refinement } from 'fp-ts/Refinement'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithRefine<S extends SchemableLambda> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    refinedName: string,
  ) => <O>(from: SchemableKind<S, O, A>) => SchemableKind<S, O, B>
}
