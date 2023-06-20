import type * as G from 'schemata-ts/internal/guard'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayGuard: WithArray<G.SchemableLambda> = {
  array: (params = {}) => {
    const { minLength = 0, maxLength = 2 ** 32 - 2 } = params
    return <A>(item: G.Guard<A>) => ({
      is: (u): u is ReadonlyArray<A> =>
        Array.isArray(u) &&
        u.length >= minLength &&
        u.length <= maxLength &&
        u.every(item.is),
    })
  },
  tuple: <T extends ReadonlyArray<G.Guard<any>>>(...items: T) => ({
    is: (
      u,
    ): u is { readonly [K in keyof T]: T[K] extends G.Guard<infer A> ? A : never } =>
      Array.isArray(u) &&
      u.length === items.length &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (u.every((a, i) => items[i]!.is(a)) as any),
  }),
}
