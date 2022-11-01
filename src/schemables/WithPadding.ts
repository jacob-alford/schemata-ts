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
import * as Arb from '../internal/ArbitraryBase'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as SC from '../SchemaExt'
import { flow, identity, pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPaddingHKT2<S> {
  /** Adds a character to the left of a string until it reaches a certain length. */
  readonly padLeft: (
    modulus: number,
    char: string
  ) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>

  /** Adds a character to the right of a string until it reaches a certain length. */
  readonly padRight: (
    modulus: number,
    char: string
  ) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding1<S extends URIS> {
  /** Adds a character to the left of a string until it reaches a certain length. */
  readonly padLeft: (
    modulus: number,
    char: string
  ) => (sa: Kind<S, string>) => Kind<S, string>

  /** Adds a character to the right of a string until it reaches a certain length. */
  readonly padRight: (
    modulus: number,
    char: string
  ) => (sa: Kind<S, string>) => Kind<S, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding2<S extends URIS2> {
  /** Adds a character to the left of a string until it reaches a certain length. */
  readonly padLeft: (
    modulus: number,
    char: string
  ) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>

  /** Adds a character to the right of a string until it reaches a certain length. */
  readonly padRight: (
    modulus: number,
    char: string
  ) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPadding2C<S extends URIS2, E> {
  /** Adds a character to the left of a string until it reaches a certain length. */
  readonly padLeft: (
    modulus: number,
    char: string
  ) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
  /** Adds a character to the right of a string until it reaches a certain length. */
  readonly padRight: (
    modulus: number,
    char: string
  ) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPadding2C<D.URI, unknown> = {
  padLeft: (modulus, char) => da =>
    pipe(
      da,
      D.refine(
        (s): s is string => s.length % modulus === 0,
        `padLeft(${modulus}, ${char})`
      )
    ),
  padRight: (modulus, char) => da =>
    pipe(
      da,
      D.refine(
        (s): s is string => s.length % modulus === 0,
        `padRight(${modulus}, ${char})`
      )
    ),
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
  padLeft: modulus => G.refine((s): s is string => s.length % modulus === 0),
  padRight: modulus => G.refine((s): s is string => s.length % modulus === 0),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPadding2C<TD.URI, unknown> = {
  padLeft: (modulus, char) => tdS =>
    pipe(
      tdS,
      TD.refine(
        (s): s is string => s.length % modulus === 0,
        `padLeft(${modulus}, ${char})`
      )
    ),
  padRight: (modulus, char) => tdS =>
    pipe(
      tdS,
      TD.refine(
        (s): s is string => s.length % modulus === 0,
        `padRight(${modulus}, ${char})`
      )
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPadding1<t.URI> = {
  padLeft: (modulus, char) => tS =>
    pipe(
      tS,
      t.refine(
        (s): s is string => s.length % modulus === 0,
        `padRight(${modulus}, ${char})`
      )
    ),
  padRight: (modulus, char) => tS =>
    pipe(
      tS,
      t.refine(
        (s): s is string => s.length % modulus === 0,
        `padRight(${modulus}, ${char})`
      )
    ),
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
  padLeft: (modulus, char) => aS =>
    aS.map(
      flow(
        stripLeftWhile(c => c === char),
        s => s.padStart(s.length + (modulus - (s.length % modulus)), char)
      )
    ),
  padRight: (modulus, char) => aS =>
    aS.map(
      flow(
        stripRightWhile(c => c === char),
        s => s.padEnd(s.length + (modulus - (s.length % modulus)), char)
      )
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
