/** @since 1.4.0 */
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'
import { Struct } from 'schemata-ts/schemata/Struct'
import { type Simplify } from 'type-fest'

/**
 * Same as `Struct` combinator, but disallows additional properties.
 *
 * @deprecated Use `Struct({}).strict()` instead
 * @since 2.0.0
 * @category Combinators
 */
export const Strict = <T extends Record<string, Schema<any, any>>>(
  props: T,
): Schema<
  Simplify<RequiredInputProps<T> & OptionalInputProps<T>>,
  Simplify<OutputProps<T>>
> => Struct(props, 'error')
