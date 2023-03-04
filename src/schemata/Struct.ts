/**
 * Used to construct a struct schema with enumerated keys.
 *
 * @since 1.4.0
 * @category Model
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { InputOf, make, OutputOf, Schema } from 'schemata-ts/Schema'
import * as s from 'schemata-ts/struct'

/**
 * Used to construct a struct schema with enumerated keys.
 *
 * @since 1.0.0
 * @category Combinators
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *
 *   const SomeDomainType = S.Struct({
 *     a: S.String,
 *     b: S.BooleanFromNumber,
 *   })
 *
 *   // SomeDomainType will have the type:
 *   // Schema<{ a: string, b: number }, { a: string, b: boolean }>
 *
 *   const decoder = getDecoder(SomeDomainType)
 *
 *   assert.deepStrictEqual(
 *     decoder.decode({
 *       a: 'foo',
 *       b: 0,
 *     }),
 *     E.right({
 *       a: 'foo',
 *       b: false,
 *     }),
 *   )
 */
export const Struct = <T extends Record<string, Schema<unknown, unknown>>>(
  props: T,
): Schema<
  {
    [K in keyof T]: InputOf<T[K]>
  },
  {
    [K in keyof T]: OutputOf<T[K]>
  }
> =>
  make(S => {
    const hktStruct: Record<
      string,
      s.Prop<
        s.RequiredKeyFlag,
        SchemableLambda,
        SchemableKind<SchemableLambda, unknown, unknown>,
        s.KeyNotMapped
      >
    > = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prop = props[key]!
      hktStruct[key] = s.required(prop(S))
    }
    return S.structM(hktStruct as any)
  })
