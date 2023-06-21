import { type SchemableKind, type SchemableLambda } from 'schemata-ts/HKT'
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
}
