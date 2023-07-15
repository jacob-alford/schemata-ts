/** @since 1.4.0 */
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema } from 'schemata-ts/Schema'
import { Struct } from 'schemata-ts/schemata/Struct'

/**
 * Same as `Struct` combinator, but disallows additional properties.
 *
 * @since 2.0.0
 * @category Combinators
 */
export const Strict = <T extends Record<string, Schema<any, any>>>(
  props: T,
): Schema<
  Combine<RequiredInputProps<T> & OptionalInputProps<T>>,
  Combine<OutputProps<T>>
> => Struct(props, 'error')
