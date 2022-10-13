import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Brand } from 'io-ts'

export interface WithBrandHKT2<S> {
  readonly brand: <B extends Brand<symbol>>() => <O, A>(
    target: HKT2<S, O, A>
  ) => HKT2<S, O, A & B>
}

export interface WithBrand1<S extends URIS> {
  readonly brand: <B extends Brand<symbol>>() => <A>(target: Kind<S, A>) => Kind<S, A & B>
}

export interface WithBrand2<S extends URIS2> {
  readonly brand: <B extends Brand<symbol>>() => <O, A>(
    target: Kind2<S, O, A>
  ) => Kind2<S, O, A & B>
}

export interface WithBrand2C<S extends URIS2, E> {
  readonly brand: <B extends Brand<symbol>>() => <A>(
    target: Kind2<S, E, A>
  ) => Kind2<S, E, A & B>
}
