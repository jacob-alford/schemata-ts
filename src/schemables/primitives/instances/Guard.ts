/** @since 2.0.0 */
import * as G from '../../../base/GuardBase'
import { make } from '..'

/**
 * @since 2.0.0
 * @category Instances
 */
export const string: G.Guard<string> = {
  is: (u): u is string => typeof u === 'string',
}

/**
 * @since 2.0.0
 * @category Instances
 */
export const number: G.Guard<number> = {
  is: (u): u is number => typeof u === 'number',
}

/**
 * @since 2.0.0
 * @category Instances
 */
export const boolean: G.Guard<boolean> = {
  is: (u): u is boolean => typeof u === 'boolean',
}

/**
 * @since 2.0.0
 * @category Instances
 */
export const Guard = make<G.GuardTypeLambda>(
  string,
  number,
  boolean,
  undefined as any,
  undefined as any,
)
