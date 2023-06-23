import type * as E from 'fp-ts/Either'
import { type Brand, type Branded } from 'schemata-ts/brand'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

declare const jsonString: unique symbol

type JsonStringBrand = Brand<{ JsonString: typeof jsonString }>

export type JsonString = Branded<string, JsonStringBrand>

export interface WithParser<S extends SchemableLambda> {
  readonly parse: <I>(
    name: string,
    parse: (encoded: string) => E.Either<unknown, unknown>,
    print: (a: I) => E.Either<unknown, string>,
    contentEncoding?: string,
    contentMediaType?: string,
    format?: string,
  ) => <A>(inner: SchemableKind<S, I, A>) => SchemableKind<S, string, A>
}
