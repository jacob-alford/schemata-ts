/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotateHKT2<S> {
  readonly annotate: (
    title?: string,
    description?: string,
  ) => <E, A>(schema: HKT2<S, E, A>) => HKT2<S, E, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotate1<S extends URIS> {
  readonly annotate: (
    title?: string,
    description?: string,
  ) => <A>(schema: Kind<S, A>) => Kind<S, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotate2<S extends URIS2> {
  readonly annotate: (
    title?: string,
    description?: string,
  ) => <E, A>(schema: Kind2<S, E, A>) => Kind2<S, E, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotate2C<S extends URIS2, E> {
  readonly annotate: (
    title?: string,
    description?: string,
  ) => <A>(schema: Kind2<S, E, A>) => Kind2<S, E, A>
}
