import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/** @since 1.0.0 */
export type PaddingLength =
  | { readonly by: 'MaxLength'; readonly maxLength: number | ((s: string) => number) }
  | {
      readonly by: 'ExactLength'
      readonly exactLength: number | ((s: string) => number)
    }

export interface WithPadding<S extends SchemableLambda> {
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: SchemableKind<S, string, string>) => SchemableKind<S, string, string>
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: SchemableKind<S, string, string>) => SchemableKind<S, string, string>
}
