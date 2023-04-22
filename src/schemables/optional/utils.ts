import { hasOwn } from 'schemata-ts/internal/util'

const OptionalSymbol = Symbol.for('schemata-ts/schemable/WithOptional')
type OptionalSymbol = typeof OptionalSymbol

interface ImplicitOptional {
  [OptionalSymbol]: OptionalSymbol
}

/** @internal */
export const makeImplicitOptional = <A>(a: A, clone: (a: A) => A): ImplicitOptional & A =>
  Object.assign(clone(a) as any, { [OptionalSymbol]: OptionalSymbol }) as any

/** @internal */
export const hasImplicitOptional = (a: object): a is ImplicitOptional =>
  hasOwn(a, OptionalSymbol)
