/**
 * Used to construct a struct schema with optional enumerated keys.
 *
 * @since 1.4.0
 * @category Model
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { InputOf, make, OutputOf, Schema } from 'schemata-ts/Schema'
import * as s from 'schemata-ts/struct'

/**
 * Used to construct a struct schema with optional enumerated keys.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Partial = <T extends Record<string, Schema<unknown, unknown>>>(
  props: T,
): Schema<
  {
    [K in keyof T]?: InputOf<T[K]>
  },
  {
    [K in keyof T]?: OutputOf<T[K]>
  }
> =>
  make(S => {
    const hktStruct: Record<
      string,
      s.Prop<
        s.OptionalKeyFlag,
        SchemableLambda,
        SchemableKind<SchemableLambda, unknown, unknown>,
        s.KeyNotMapped
      >
    > = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prop = props[key]!
      hktStruct[key] = s.optional(prop(S))
    }
    return S.structM(hktStruct as any)
  })
