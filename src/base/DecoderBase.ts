/** @since 2.0.0 */
import { TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import { Refinement } from '@fp-ts/data/Predicate'
import * as RA from '@fp-ts/data/ReadonlyArray'
import * as T from '@fp-ts/data/These'

import * as DE from '../_DecodeError'
import { Guard } from './GuardBase'

/**
 * @since 2.0.0
 * @category Model
 */
export interface Decoder<I, A> extends TypeClass<DecoderTypeLambda> {
  readonly decode: (input: I) => T.Validated<DE.DecodeError<string>, A>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface DecoderTypeLambda extends TypeLambda {
  readonly type: Decoder<unknown, this['Target']>
}

/**
 * @since 2.0.0
 * @category Transformations
 */
export const fromRefinement: <I, A extends I>(
  refinement: Refinement<I, A>,
  name: string,
) => Decoder<I, A> = (refinement, name) => ({
  decode: input =>
    refinement(input) ? T.right(input) : T.left(RA.of(DE.failedConstraint(name)(input))),
})

/**
 * @since 2.0.0
 * @category Transformations
 */
export const fromGuard: <I, A>(guard: Guard<A>, name: string) => Decoder<I, A> = (
  guard,
  name,
) => ({
  decode: input =>
    guard.is(input) ? T.right(input) : T.left(RA.of(DE.notType(name)(input))),
})
