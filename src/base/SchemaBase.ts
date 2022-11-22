/**
 * An instance of `Schemable` for Schema. This can be thought of as an identity schema.
 *
 * @since 1.0.0
 */
import * as SC from '../SchemaExt'
import * as S2 from './SchemableBase'
import { identity } from 'fp-ts/function'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

/**
 * @since 1.0.0
 * @category Instances
 */
export const URI = 'SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly SchemaExt: SC.SchemaExt<E, A>
  }
}

/**
 * @since 1.0.0
 * @category Constructors
 */
export const Literal: S2.Schemable2<URI>['literal'] = (...values) =>
  SC.make(_ => _.literal(...values))

/**
 * @since 1.0.0
 * @category Primitives
 */
export const String: S2.Schemable2<URI>['string'] = SC.make(_ => _.string)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const Number: S2.Schemable2<URI>['number'] = SC.make(_ => _.number)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const Boolean: S2.Schemable2<URI>['boolean'] = SC.make(_ => _.boolean)

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Nullable: S2.Schemable2<URI>['nullable'] = or =>
  SC.make(_ => _.nullable(or(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Struct: S2.Schemable2<URI>['struct'] = props =>
  SC.make(_ => {
    const out = {} as Any
    for (const [key, schemaKey] of Object.entries(props)) {
      out[key] = schemaKey(_)
    }
    return _.struct(out) as Any
  })

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Partial: S2.Schemable2<URI>['partial'] = props =>
  SC.make(_ => {
    const out = {} as Any
    for (const [key, schemaKey] of Object.entries(props)) {
      out[key] = schemaKey(_)
    }
    return _.partial(out) as Any
  })

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Array: S2.Schemable2<URI>['array'] = item => SC.make(_ => _.array(item(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Record: S2.Schemable2<URI>['record'] = codomain =>
  SC.make(_ => _.record(codomain(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Tuple: S2.Schemable2<URI>['tuple'] = (...components) =>
  SC.make(_ => _.tuple(...components.map(c => c(_)))) as Any

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Intersection: S2.Schemable2<URI>['intersect'] = right => left =>
  SC.make(_ => _.intersect(left(_))(right(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Sum =
  <T extends string>(tag: T) =>
  <MS extends Record<string, SC.SchemaExt<Any, Any>>>(
    members: MS,
  ): SC.SchemaExt<OutputOf<MS[keyof MS]>, TypeOf<MS[keyof MS]>> =>
    SC.make(_ => {
      const out = {} as Any
      for (const [tag, taggedSchema] of Object.entries(members)) {
        out[tag] = taggedSchema(_)
      }
      return _.sum(tag)(out) as Any
    })

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Lazy: S2.Schemable2<URI>['lazy'] = (id, f) =>
  SC.make(_ => _.lazy(id, () => f()(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Readonly: S2.Schemable2<URI>['readonly'] = identity

/**
 * @since 1.0.0
 * @category Utilities
 */
export type TypeOf<S> = S extends SC.SchemaExt<Any, infer A> ? A : never

/**
 * @since 1.0.0
 * @category Utilities
 */
export type OutputOf<S> = S extends SC.SchemaExt<infer O, Any> ? O : never
