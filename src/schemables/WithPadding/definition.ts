/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export type PaddingLength =
  | { readonly by: 'MaxLength'; readonly maxLength: number | ((s: string) => number) }
  | {
      readonly by: 'ExactLength'
      readonly exactLength: number | ((s: string) => number)
    }

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPaddingHKT2<S> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding1<S extends URIS> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind<S, string>) => Kind<S, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind<S, string>) => Kind<S, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding2<S extends URIS2> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding2C<S extends URIS2, E> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
}
