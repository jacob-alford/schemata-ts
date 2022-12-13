import { Kind, TypeLambda } from '@fp-ts/core/HKT'
/**
 * @since 2.0.0
 * @category Model
 */
export interface Schema<RI extends SchemableLambda, E, A> {
  <S extends TypeLambda>(requirements: Schemable<RI, S>): Kind<S, never, never, E, A>
}

/**
 * @since 2.0.0
 * @category Schemable
 */
export interface SchemableLambda {
  readonly Kind: TypeLambda
}

/**
 * @since 2.0.0
 * @category Schemable
 */
export type Schemable<R extends SchemableLambda, Kind extends TypeLambda> = R extends {
  readonly type: unknown
}
  ? (R & { readonly Kind: Kind })['type']
  : { readonly R: R; readonly Kind: () => Kind }

/**
 * @since 2.0.0
 * @category Schemable
 */
export type ComposeSchemables<
  R1 extends SchemableLambda,
  R2 extends SchemableLambda,
> = R1 extends { readonly type: unknown }
  ? R2 extends { readonly type: unknown }
    ? R1 &
        R2 & {
          readonly type: Schemable<R1 & R2, R1['Kind'] & R2['Kind']>
        }
    : { readonly R: R1 & R2; readonly Kind: () => R1['Kind'] & R2['Kind'] }
  : { readonly R: R1 & R2; readonly Kind: () => R1['Kind'] & R2['Kind'] }

/**
 * @since 2.0.0
 * @category Constructors
 */
export const makeSchema: <R extends SchemableLambda, E, A>(
  s: Schema<R, E, A>,
) => Schema<R, E, A> = s => s

/**
 * @since 2.0.0
 * @category Utilities
 */
export type RequirementsOf<S> = S extends Schema<infer R, unknown, unknown> ? R : never

/**
 * @since 2.0.0
 * @category Utilities
 */
export type InputOf<S> = S extends Schema<any, infer E, unknown> ? E : never

/**
 * @since 2.0.0
 * @category Utilities
 */
export type OutputOf<S> = S extends Schema<any, unknown, infer A> ? A : never
