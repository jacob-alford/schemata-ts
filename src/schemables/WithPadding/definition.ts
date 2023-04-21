import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithPadding<S extends SchemableLambda> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: SchemableKind<S, string, string>) => SchemableKind<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: SchemableKind<S, string, string>) => SchemableKind<S, string, string>
}
