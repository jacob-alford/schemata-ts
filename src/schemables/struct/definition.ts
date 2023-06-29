import { type Semigroup } from 'fp-ts/Semigroup'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type Combine } from 'schemata-ts/internal/type-utils'
import type * as _ from 'schemata-ts/schemables/struct/type-utils'

export interface WithStruct<S extends SchemableLambda> {
  readonly struct: <
    Props extends Record<string, _.StructProp<S>>,
    RestKind extends SchemableKind<S, any, any> | undefined,
  >(
    properties: Props,
    extraProps?: 'strip' | 'error',
  ) => SchemableKind<
    S,
    Combine<
      _.RestInput<S, RestKind> &
        _.OptionalInputProps<S, Props> &
        _.RequiredInputProps<S, Props>
    >,
    Combine<_.RestOutput<S, RestKind> & _.OutputProps<S, Props>>
  >
  readonly record: <I, O, K extends string>(
    key: SchemableKind<S, K, K>,
    codomain: SchemableKind<S, I, O>,
    expectedName?: string,
    combineKeys?: Semigroup<O>,
  ) => SchemableKind<S, Readonly<Record<K, I>>, Readonly<Record<K, O>>>
  readonly intersection: <
    I1 extends Record<string, any>,
    I2 extends Record<string, any>,
    O1 extends Record<string, any>,
    O2 extends Record<string, any>,
  >(
    x: SchemableKind<S, I1, O1>,
    y: SchemableKind<S, I2, O2>,
  ) => SchemableKind<S, I1 & I2, O1 & O2>
}
