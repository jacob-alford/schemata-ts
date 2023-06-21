import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/function'
import type * as IO from 'fp-ts/IO'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import type * as Sg from 'fp-ts/Semigroup'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

/** @internal */
export const getLeft = <E>(either: E.Either<E, never>): E => (either as E.Left<E>).left

/** @internal */
export const getRight = <A>(either: E.Either<never, A>): A => (either as E.Right<A>).right

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string => {
  try {
    return Buffer ? Buffer.from(s).toString('base64') : btoa(s)
  } catch (_) {
    return btoa(s)
  }
}

/** @internal */
export const base64Decode = (s: string): string => {
  try {
    return Buffer ? Buffer.from(s, 'base64').toString() : atob(s)
  } catch (_) {
    return atob(s)
  }
}

/** @internal */
export const urlifyBase64 = (s: string): string =>
  s.replace(/[=+/]/g, c => (c === '/' ? '_' : c === '+' ? '-' : ''))

/* istanbul ignore next */
/**
 * Object.hasOwn isn't available in Node 14 :(
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const hasOwn = (o: object, v: PropertyKey): boolean =>
  Object.hasOwn ? Object.hasOwn(o, v) : Object.prototype.hasOwnProperty.call(o, v)

/**
 * @since 1.0.0
 * @internal
 */
export const typeOf = (x: unknown): string => (x === null ? 'null' : typeof x)

/**
 * Performs a validative traversal over a struct's own enumerable properties while mapping
 * output types.
 *
 * @internal
 */
export const witherRemap =
  <E, A>(sgErrors: Sg.Semigroup<E>, concatKeys: Sg.Semigroup<A>) =>
  <In extends Record<string, any>>(
    f: <K extends keyof In>(
      key: K,
      value: In[K],
    ) => E.Either<E, O.Option<readonly [output: A, key: keyof In]>>,
  ) =>
  (s: In): E.Either<E, { [K in keyof In]: A }> => {
    const errors: E[] = []
    const out: { [K in keyof In]: A } = {} as any
    /* Enumerable own, Enumerable inherited */
    for (const key in s) {
      /* Ignores inherited properties */
      if (!hasOwn(s, key)) continue

      /* Perform effect */
      const result = f(key, s[key])

      /* add any errors to accumulation */
      if (E.isLeft(result)) {
        errors.push(result.left)
        continue
      }

      /* none => skip */
      if (O.isNone(result.right)) continue
      else {
        const [value, newKey] = result.right.value
        // merge two keys if the new key already exists
        if (hasOwn(out, newKey)) {
          out[newKey] = concatKeys.concat(out[newKey], value)
          continue
        }
        out[newKey] = value
      }
    }
    return RA.isNonEmpty(errors)
      ? E.left(pipe(errors, RNEA.concatAll(sgErrors)))
      : E.right(out)
  }

const getApplicativeValidationPar = <E>(sgErrors: Sg.Semigroup<E>) =>
  TE.getApplicativeTaskValidation(T.ApplicativePar, sgErrors)

/** Performs a task-validative traversal over a struct's own enumerable properties. */
export const witherRemapPar =
  <E, A>(sgErrors: Sg.Semigroup<E>, concatKeys: Sg.Semigroup<A>) =>
  <In extends Record<string, any>>(
    f: <K extends keyof In>(
      key: K,
      value: In[K],
    ) => TE.TaskEither<E, O.Option<readonly [A, keyof In]>>,
  ) =>
  (s: In): TE.TaskEither<E, { [K in keyof In]: A }> => {
    const effects: Record<string, TE.TaskEither<E, O.Option<readonly [A, keyof In]>>> = {}

    /* Enumerable own, Enumerable inherited */
    for (const key in s) {
      /* Ignores inherited properties */
      if (!hasOwn(s, key)) continue

      /* Perform effect */
      effects[key] = f(key, s[key])
    }

    return pipe(
      effects,
      RR.wither(getApplicativeValidationPar(sgErrors))(identity),
      TE.map(s => {
        const out: { [K in keyof In]: A } = {} as any
        for (const key in s) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const [value, newKey] = s[key]!
          if (hasOwn(out, newKey)) {
            out[newKey] = concatKeys.concat(out[newKey], value)
            continue
          }
          out[newKey] = value
        }
        return out
      }),
    )
  }

/**
 * Iterates over an object's own non-inherited enumerable properties.
 *
 * @internal
 */
export const forIn =
  <A extends Record<string, any>>(
    eff: <K extends keyof A>(key: K, value: A[K]) => IO.IO<void>,
  ) =>
  (a: A): IO.IO<void> => {
    return () => {
      for (const key in a) {
        if (!hasOwn(a, key)) continue
        eff(key, a[key])()
      }
    }
  }
