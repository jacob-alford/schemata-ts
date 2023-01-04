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
export interface WithAnnotationHKT2<S> {
  readonly annotate: (
    name?: string,
    description?: string,
  ) => <E, A>(schema: HKT2<S, E, A>) => HKT2<S, E, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotation1<S extends URIS> {
  readonly annotate: (
    name?: string,
    description?: string,
  ) => <A>(schema: Kind<S, A>) => Kind<S, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotation2<S extends URIS2> {
  readonly annotate: (
    name?: string,
    description?: string,
  ) => <E, A>(schema: Kind2<S, E, A>) => Kind2<S, E, A>
}

/**
 * @since 1.2.0
 * @category Model
 */
export interface WithAnnotation2C<S extends URIS2, E> {
  readonly annotate: (
    name?: string,
    description?: string,
  ) => <A>(schema: Kind2<S, E, A>) => Kind2<S, E, A>
}
