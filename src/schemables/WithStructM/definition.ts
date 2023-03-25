/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Combine } from 'schemata-ts/internal/type-utils'
import * as _ from 'schemata-ts/schemables/WithStructM/type-utils'

/**
 * Mapped struct configuration determining how to handle extra (non-specified) fields.
 * Default is to strip additional params.
 *
 * Options:
 *
 * - `restParam` - add a rest parameter to the struct
 * - `error` - decode to an error with extra params
 * - `strip` - strips additional params
 *
 * @since 1.3.0
 * @category Model
 */
export type StructOptions<RestKind> =
  | StructWithRestParam<RestKind>
  | StrictStruct
  | StrippedStruct

/**
 * @since 1.3.0
 * @category Model
 */
interface StructWithRestParam<RestKind> {
  readonly extraProps: 'restParam'
  readonly restParam: RestKind
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrictStruct {
  readonly extraProps: 'error'
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrippedStruct {
  readonly extraProps: 'strip'
}

/**
 * @since 1.3.0
 * @category Model
 */
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
