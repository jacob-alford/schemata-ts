import type * as E from 'fp-ts/Either'
import { type Branded } from 'schemata-ts/brand'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

declare const jsonString: unique symbol
export type JsonString = Branded<string, { JsonString: typeof jsonString }>

export interface WithParser<S extends SchemableLambda> {
  readonly parse: <I, IO extends string = string>(
    name: string,
    parse: (encoded: string) => E.Either<unknown, unknown>,
    print: (a: I) => E.Either<unknown, IO>,
    contentEncoding?: string,
    contentMediaType?: string,
    format?: string,
  ) => <A>(inner: SchemableKind<S, I, A>) => SchemableKind<S, IO, A>
}
