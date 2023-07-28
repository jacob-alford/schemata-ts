import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type ImplicitOptional } from 'schemata-ts/internal/struct'

export type OptionalParams<I> = {
  readonly fallbackInput?: I
}

export interface WithOptional<S extends SchemableLambda> {
  readonly optional: <I, A, Fallback extends I | undefined>(
    target: SchemableKind<S, I, A>,
    name: string,
    params: OptionalParams<Fallback>,
  ) => ImplicitOptional & SchemableKind<S, I | undefined, A | undefined>
}
