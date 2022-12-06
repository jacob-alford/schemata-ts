/**
 * A collection of utility functions for mapping `DecodeError`s from io-ts/DecodeError.
 *
 * @since 1.0.1
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as Str from 'fp-ts/string'
 *   import { pipe } from 'fp-ts/function'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *   import { foldMap } from 'schemata-ts/DecodeError'
 *   import * as S from 'schemata-ts/schemata'
 *
 *   const User = S.Struct({
 *     name: S.NonEmptyString,
 *     favoriteIntegers: S.Array(S.Int()),
 *   })
 *
 *   const decoder = getDecoder(User)
 *
 *   type DomainError = string
 *
 *   const mapError = foldMap(Str.Semigroup)<DomainError>({
 *     Leaf: (got, err) => `Expected ${err}, but Received ${got === '' ? '""' : got}; `,
 *     Key: (key, kind, errors) => `At property key ${key} (${kind}): ${errors}`,
 *     Index: (index, kind, errors) => `At index ${index} (${kind}): ${errors}`,
 *     Member: (index, errors) => `At Union Member ${index}: ${errors}`,
 *     Lazy: (_, errors) => errors,
 *     Wrap: (error, errors) => `${error}; ${errors}`,
 *   })
 *
 *   const input = {
 *     name: '',
 *     favoriteIntegers: [1, NaN, 3, 4.1, 5],
 *   }
 *
 *   const result = pipe(decoder.decode(input), E.mapLeft(mapError))
 *
 *   assert.deepStrictEqual(
 *     result,
 *     E.left(
 *       'At property key name (required): Expected NonEmptyString, but Received ""; At property key favoriteIntegers (required): At index 1 (optional): Expected number, but Received NaN; At index 3 (optional): Expected int, but Received 4.1; ',
 *     ),
 *   )
 */
import * as Sg from 'fp-ts/Semigroup'
import * as DE from 'io-ts/DecodeError'
import * as FSg from 'io-ts/FreeSemigroup'

export {
  /**
   * Draws a `DecodeError` as a tree structure using indentation markings and newlines.
   *
   * @since 1.0.1
   * @category Destructors
   */
  draw as drawTree,
} from 'io-ts/Decoder'

/**
 * Converts a DecodeError to a type of a given Semigroup using a supplied instance and
 * mapping function.
 *
 * @since 1.0.1
 * @category Destructors
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as Str from 'fp-ts/string'
 *   import { pipe } from 'fp-ts/function'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *   import { foldMap } from 'schemata-ts/DecodeError'
 *   import * as S from 'schemata-ts/schemata'
 *
 *   const User = S.Struct({
 *     name: S.NonEmptyString,
 *     favoriteIntegers: S.Array(S.Int()),
 *   })
 *
 *   const decoder = getDecoder(User)
 *
 *   type DomainError = string
 *
 *   const mapError = foldMap(Str.Semigroup)<DomainError>({
 *     Leaf: (got, err) => `Expected ${err}, but Received ${got === '' ? '""' : got}; `,
 *     Key: (key, kind, errors) => `At property key ${key} (${kind}): ${errors}`,
 *     Index: (index, kind, errors) => `At index ${index} (${kind}): ${errors}`,
 *     Member: (index, errors) => `At Union Member ${index}: ${errors}`,
 *     Lazy: (_, errors) => errors,
 *     Wrap: (error, errors) => `${error}; ${errors}`,
 *   })
 *
 *   const input = {
 *     name: '',
 *     favoriteIntegers: [1, NaN, 3, 4.1, 5],
 *   }
 *
 *   const result = pipe(decoder.decode(input), E.mapLeft(mapError))
 *
 *   assert.deepStrictEqual(
 *     result,
 *     E.left(
 *       'At property key name (required): Expected NonEmptyString, but Received ""; At property key favoriteIntegers (required): At index 1 (optional): Expected number, but Received NaN; At index 3 (optional): Expected int, but Received 4.1; ',
 *     ),
 *   )
 */
export const foldMap =
  <S>(S: Sg.Semigroup<S>) =>
  <E>(matchers: {
    readonly Leaf: (input: unknown, e: E) => S
    readonly Key: (key: string, kind: DE.Kind, errors: S) => S
    readonly Index: (index: number, kind: DE.Kind, errors: S) => S
    readonly Member: (index: number, errors: S) => S
    readonly Lazy: (id: string, errors: S) => S
    readonly Wrap: (error: E, errors: S) => S
  }) =>
  (errors: FSg.FreeSemigroup<DE.DecodeError<E>>): S => {
    const foldDecodeError: (params: DE.DecodeError<E>) => S = DE.fold({
      Leaf: matchers.Leaf,
      Key: (key, kind, errors) => matchers.Key(key, kind, foldFreeSemigroup(errors)),
      Index: (index, kind, errors) =>
        matchers.Index(index, kind, foldFreeSemigroup(errors)),
      Member: (index, errors) => matchers.Member(index, foldFreeSemigroup(errors)),
      Lazy: (id, errors) => matchers.Lazy(id, foldFreeSemigroup(errors)),
      Wrap: (error, errors) => matchers.Wrap(error, foldFreeSemigroup(errors)),
    })

    const foldFreeSemigroup: (errors: FSg.FreeSemigroup<DE.DecodeError<E>>) => S =
      FSg.fold(foldDecodeError, (left, right) =>
        S.concat(foldFreeSemigroup(left), foldFreeSemigroup(right)),
      )

    return foldFreeSemigroup(errors)
  }

/**
 * Disregards a DecodeError's structure, mapping and combining into/using a supplied Semigroup.
 *
 * @since 1.0.1
 * @category Destructors
 */
export const foldMapFlat =
  <S>(S: Sg.Semigroup<S>) =>
  <E>(fold: (e: E) => S): ((errors: FSg.FreeSemigroup<DE.DecodeError<E>>) => S) =>
    foldMap(S)<E>({
      Leaf: (_, e) => fold(e),
      Key: (_, __, errors) => errors,
      Index: (_, __, errors) => errors,
      Member: (_, errors) => errors,
      Lazy: (_, errors) => errors,
      Wrap: (_, errors) => errors,
    })
