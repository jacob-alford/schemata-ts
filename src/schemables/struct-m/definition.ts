import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Combine } from 'schemata-ts/internal/type-utils'
import * as _ from 'schemata-ts/schemables/structm/type-utils'

export interface WithStructM<S extends SchemableLambda> {
  readonly structM: <
    Props extends Record<string, SchemableKind<S, any, any>>,
    RestKind extends SchemableKind<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
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
