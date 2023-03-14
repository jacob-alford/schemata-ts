/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithArray<G.SchemableLambda> = {
  array: <A>(item: G.Guard<A>) => ({
    is: (u): u is ReadonlyArray<A> => Array.isArray(u) && u.every(item.is),
  }),
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
