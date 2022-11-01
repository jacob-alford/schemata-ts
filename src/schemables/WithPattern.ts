import * as Arb from '../internal/ArbitraryBase'
import * as D from '../internal/DecoderBase'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from '../internal/EqBase'
import * as G from '../internal/GuardBase'
import * as TD from '../internal/TaskDecoderBase'
import * as t from '../internal/TypeBase'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as SC from '../SchemaExt'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { arbitraryFromPattern, Pattern, regexFromPattern } from '../PatternBuilder'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPatternHKT2<S> {
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean
  ) => HKT2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern2<S extends URIS2> {
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean
  ) => Kind2<S, string, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern2C<S extends URIS2, E> {
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean
  ) => Kind2<S, E, string>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithPattern1<S extends URIS> {
  readonly pattern: (
    pattern: Pattern,
    description: string,
    caseInsensitive?: boolean
  ) => Kind<S, string>
}

/** @internal */
export const pattern: (
  pattern: Pattern,
  _: string,
  caseInsensitive?: boolean
) => G.Guard<unknown, string> = (pattern, _, caseInsensitive) => {
  const regex = regexFromPattern(pattern, caseInsensitive)
  return {
    is: (i): i is string => typeof i === 'string' && regex.test(i),
  }
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPattern1<Arb.URI> = {
  pattern: arbitraryFromPattern,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    D.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithPattern2<Enc.URI> = {
  pattern: () => Enc.id(),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPattern1<Eq_.URI> = {
  pattern: () => Eq_.string,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithPattern1<G.URI> = {
  pattern,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    TD.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPattern1<t.URI> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(t.string, t.refine<string, string>(pattern(p, desc, caseInsensitive).is, desc)),
}

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema: WithPattern2<SchemaURI>['pattern'] = (pattern, description) =>
  SC.make(S => S.pattern(pattern, description))
