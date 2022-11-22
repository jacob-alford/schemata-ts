/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as t from '../../../base/TypeBase'
import * as E from 'fp-ts/Either'
import { WithInvariant1 } from '../definition'
import { flow, pipe } from 'fp-ts/function'
import { Type as Type_ } from 'io-ts'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithInvariant1<t.URI> = {
  imap: (gB, name) => (get, reverseGet) => tdA =>
    new Type_(
      name,
      gB.is,
      (i, c) => pipe(tdA.validate(i, c), E.map(get)),
      flow(reverseGet, tdA.encode),
    ),
}
