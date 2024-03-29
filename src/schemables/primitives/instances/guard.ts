import { flow } from 'fp-ts/function'
import { type ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import * as G from 'schemata-ts/internal/guard'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { isFloat, isInt } from 'schemata-ts/schemables/primitives/utils'

const isString = (s: unknown): s is string => typeof s === 'string'
const isBoolean = (b: unknown): b is boolean => typeof b === 'boolean'
const isNumber = (n: unknown): n is number => typeof n === 'number'
const isNull = (n: unknown): n is null => n === null

export const PrimitivesGuard: WithPrimitives<G.SchemableLambda> = {
  string: (params = {}) => ({
    is: (s): s is string =>
      isString(s) &&
      (params.minLength === undefined || s.length >= params.minLength) &&
      (params.maxLength === undefined || s.length <= params.maxLength),
  }),
  int: flow(isInt, G.fromPredicate),
  float: flow(isFloat, G.fromPredicate),
  boolean: G.fromPredicate(isBoolean),
  unknown: {
    is: (_): _ is unknown => true,
  },
  literal: <Literals extends ReadonlyNonEmptyArray<string | number | boolean | null>>(
    ...literals: Literals
  ) => ({
    is: (u): u is Literals[number] =>
      (isString(u) || isNumber(u) || isBoolean(u) || isNull(u)) && literals.includes(u),
  }),
}
