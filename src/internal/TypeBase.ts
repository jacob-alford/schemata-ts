import { flow, identity, pipe } from 'fp-ts/function'
import * as t from 'io-ts/Type'
import { Type as Type_ } from 'io-ts'
import * as E from 'fp-ts/Either'
import { pattern as guardPattern } from './GuardBase'
import { WithBrand1 } from './WithBrand'
import { WithPattern1 } from './WithPattern'
import { WithIso1 } from './WithIso'

export * from 'io-ts/Type'

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithPattern: WithPattern1<t.URI> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(
      t.string,
      t.refine<string, string>(guardPattern(p, desc, caseInsensitive).is, desc)
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithBrand: WithBrand1<t.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithIso: WithIso1<t.URI> = {
  iso:
    ({ get, reverseGet }, gB, nameB) =>
    tdA =>
      new Type_(
        `Iso<${tdA.name}, ${nameB}>`,
        gB.is,
        (i, c) => pipe(tdA.validate(i, c), E.map(get)),
        flow(reverseGet, tdA.encode)
      ),
}
