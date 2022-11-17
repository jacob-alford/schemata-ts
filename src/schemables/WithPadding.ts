/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Arb from '../base/ArbitraryBase'
import { URI as SchemaURI } from '../base/SchemaBase'
import * as SC from '../SchemaExt'
import { flow, identity, pipe } from 'fp-ts/function'
import { matchOn } from '../internal/match'

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

/** @internal */
const match = matchOn('by')

/** @internal */
const foldUnion: (n: number | ((s: string) => number)) => (s: string) => number =
  n => s =>
    typeof n === 'function' ? n(s) : n

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPadding2C<D.URI, unknown> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      D.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      D.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      D.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      D.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithPadding2<Enc.URI> = {
  padLeft: () => identity,
  padRight: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPadding1<Eq_.URI> = {
  padLeft: () => identity,
  padRight: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithPadding1<G.URI> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      G.refine((s: string): s is string => s.length <= foldUnion(maxLength)(s)),
    ExactLength: ({ exactLength }) =>
      G.refine((s: string): s is string => s.length === foldUnion(exactLength)(s)),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      G.refine((s: string): s is string => s.length <= foldUnion(maxLength)(s)),
    ExactLength: ({ exactLength }) =>
      G.refine((s: string): s is string => s.length === foldUnion(exactLength)(s)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPadding2C<TD.URI, unknown> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      TD.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      TD.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      TD.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      TD.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPadding1<t.URI> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      t.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      t.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      t.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      t.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

/**
 * Removes characters starting at the right while a condition is met
 *
 * @internal
 */
const stripRightWhile: (predicate: (char: string) => boolean) => (s: string) => string =
  predicate => s => {
    const out = s.split('')
    for (let i = out.length - 1; i >= 0; --i) {
      if (!predicate(out[i] as string)) {
        break
      }
      out[i] = ''
    }
    return out.join('')
  }

/**
 * Removes characters starting at the left while a condition is met
 *
 * @internal
 */
const stripLeftWhile: (predicate: (char: string) => boolean) => (s: string) => string =
  predicate => s => {
    const out = s.split('')
    for (let i = 0; i < out.length; ++i) {
      if (!predicate(out[i] as string)) {
        break
      }
      out[i] = ''
    }
    return out.join('')
  }

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPadding1<Arb.URI> = {
  padLeft: (length, char) => aS =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) => maxLength,
        ExactLength: ({ exactLength }) => exactLength,
      }),
      length =>
        aS.map(
          flow(
            stripLeftWhile(c => c === char),
            s =>
              s.length > length
                ? s.slice(0, foldUnion(length)(s))
                : s.padStart(foldUnion(length)(s), char),
          ),
        ),
    ),

  padRight: (length, char) => aS =>
    pipe(
      length,
      match({
        MaxLength: ({ maxLength }) => maxLength,
        ExactLength: ({ exactLength }) => exactLength,
      }),
      length =>
        aS.map(
          flow(
            stripRightWhile(c => c === char),
            s =>
              s.length > length
                ? s.slice(0, foldUnion(length)(s))
                : s.padEnd(foldUnion(length)(s), char),
          ),
        ),
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithPadding2<SchemaURI> = {
  padLeft: (modulus, char) => sS => SC.make(S => S.padLeft(modulus, char)(sS(S))),
  padRight: (modulus, char) => sS => SC.make(S => S.padRight(modulus, char)(sS(S))),
}
