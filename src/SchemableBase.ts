/**
 * A base `Schemable` built with a type arity of two to support Encoder.
 *
 * @since 1.0.0
 */
import { type HKT2, type Kind2, type URIS2 } from 'fp-ts/HKT'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

type AofHKT2<S, X> = [X] extends [HKT2<S, Any, infer A>] ? A : never
type EofHKT2<S, X> = [X] extends [HKT2<S, infer E, Any>] ? E : never

type AofKind2<S extends URIS2, X> = [X] extends [Kind2<S, Any, infer A>] ? A : never
type EofKind2<S extends URIS2, X> = [X] extends [Kind2<S, infer E, Any>] ? E : never

type EnsureTagHKT2<S, T extends string, M> = {
  [K in keyof M]: HKT2<S, { [_ in T]: K }, Any>
}

type EnsureTagKind2<S extends URIS2, T extends string, M> = {
  [K in keyof M]: Kind2<S, { [_ in T]: K }, Any>
}

/**
 * A base `Schemable` built with a type arity of two to support Encoder.
 *
 * @since 1.0.0
 */
export interface Schemable2<S extends URIS2> {
  readonly URI: S
  readonly nullable: <O, A>(or: Kind2<S, O, A>) => Kind2<S, null | O, null | A>
  readonly partial: <Properties extends Record<PropertyKey, Kind2<S, Any, Any>>>(
    properties: Properties,
  ) => Kind2<
    S,
    Partial<{ [K in keyof Properties]: EofKind2<S, Properties[K]> }>,
    Partial<{ [K in keyof Properties]: AofKind2<S, Properties[K]> }>
  >
  readonly record: <O, A>(
    codomain: Kind2<S, O, A>,
  ) => Kind2<S, Record<string, O>, Record<string, A>>
  readonly array: <O, A>(item: Kind2<S, O, A>) => Kind2<S, Array<O>, Array<A>>
  readonly tuple: <Components extends Array<Kind2<S, Any, Any>>>(
    ...components: Components
  ) => Kind2<
    S,
    { [K in keyof Components]: EofKind2<S, Components[K]> },
    { [K in keyof Components]: AofKind2<S, Components[K]> }
  >
  readonly intersect: <O2, A2>(
    right: Kind2<S, O2, A2>,
  ) => <O1, A1>(left: Kind2<S, O1, A1>) => Kind2<S, O1 & O2, A1 & A2>
  readonly sum: <T extends string>(
    tag: T,
  ) => <Members extends Record<PropertyKey, Kind2<S, Any, Any>>>(
    members: EnsureTagKind2<S, T, Members> & Members,
  ) => Kind2<
    S,
    { [K in keyof Members]: EofKind2<S, Members[K]> }[keyof Members],
    { [K in keyof Members]: AofKind2<S, Members[K]> }[keyof Members]
  >
  readonly lazy: <O, A>(id: string, f: () => Kind2<S, O, A>) => Kind2<S, O, A>
  readonly readonly: <O, A>(soa: Kind2<S, O, A>) => Kind2<S, O, Readonly<A>>
}
