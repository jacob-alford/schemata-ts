/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'

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
export interface WithPadding<S extends TypeLambda> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind<S, string, string>) => Kind<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (
    length: PaddingLength,
    char: string,
  ) => (sa: Kind<S, string, string>) => Kind<S, string, string>
}
