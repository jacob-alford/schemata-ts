import * as O from 'fp-ts/Option'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithParser<S extends SchemableLambda> {
  readonly parse: <I>(
    name: string,
    parse: (encoded: string) => O.Option<unknown>,
    print: (a: I) => O.Option<string>,
    contentEncoding?: string,
    contentMediaType?: string,
    format?: string,
  ) => <A>(inner: SchemableKind<S, I, A>) => SchemableKind<S, string, A>
}
