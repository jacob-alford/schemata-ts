/** @since 1.0.0 */
import { TypeClass, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @since 2.0.0
 * @category Model
 */
export interface Guard<A> extends TypeClass<GuardTypeLambda> {
  readonly is: (input: unknown) => input is A
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface GuardTypeLambda extends TypeLambda {
  readonly type: Guard<this['Target']>
}
