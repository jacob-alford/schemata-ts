/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrandHKT2<S> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <O, A>(target: HKT2<S, O, A>) => HKT2<S, O, Branded<A, B>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand1<S extends URIS> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <A>(target: Kind<S, A>) => Kind<S, Branded<A, B>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand2<S extends URIS2> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <O, A>(target: Kind2<S, O, A>) => Kind2<S, O, Branded<A, B>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand2C<S extends URIS2, E> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <A>(target: Kind2<S, E, A>) => Kind2<S, E, Branded<A, B>>
}
