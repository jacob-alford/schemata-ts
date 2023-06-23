/**
 * A collection of error reporters tied with their underlying type
 *
 * @since 2.0.0
 */
import { type Const } from 'fp-ts/Const'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as TCE from 'schemata-ts/TranscodeError'
import { type Primitive } from 'type-fest/source/primitive'

type FieldErrors<T extends Record<string, Primitive>> = {
  [K in keyof T]: ReadonlyArray<string>
}

type FieldError =
  | {
      readonly _tag: 'error'
      readonly error: string
    }
  | {
      readonly _tag: 'errors'
      readonly key: string
      readonly errors: ReadonlyArray<FieldError>
    }

const flattenErrors: (
  errors: ReadonlyArray<FieldError>,
) => ReadonlyArray<string> = errors =>
  pipe(
    errors,
    RA.chain(error =>
      error._tag === 'error' ? [error.error] : flattenErrors(error.errors),
    ),
  )

const makeFieldErrors = <T extends Record<string, Primitive>>(
  errors: ReadonlyArray<FieldError>,
): FieldErrors<T> =>
  pipe(
    errors,
    RA.foldMap(RR.getMonoid<string, ReadonlyArray<string>>(RA.getSemigroup<string>()))(
      fieldError =>
        fieldError._tag === 'errors'
          ? { [fieldError.key]: flattenErrors(fieldError.errors) }
          : {},
    ),
    _ => _ as FieldErrors<T>,
  )

/** @since 2.0.0 */
export const reportFieldErrors = <T extends Record<string, Primitive>>(
  errors: Const<TCE.TranscodeErrors, T>,
): FieldErrors<T> =>
  pipe(
    errors,
    TCE.foldMap(RA.getMonoid<FieldError>())({
      TypeMismatch: (expected, actual) => [
        { _tag: 'error', error: `${expected} expected, got ${actual}` },
      ],
      UnexpectedValue: (expected, actual) => [
        { _tag: 'error', error: `${expected} expected, got ${actual}` },
      ],
      SerializationError: (expected, _, actual) => [
        { _tag: 'error', error: `${expected} expected, got ${actual}` },
      ],
      ErrorAtIndex: () => [],
      ErrorAtKey: (key, errors) => [{ _tag: 'errors', key, errors }],
      ErrorAtUnionMember: () => [],
    }),
    _ => makeFieldErrors(_),
  )
