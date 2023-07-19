import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/function'
import type * as O from 'fp-ts/Option'
import * as RR from 'fp-ts/ReadonlyRecord'
import type * as Sg from 'fp-ts/Semigroup'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string => {
  try {
    return Buffer ? Buffer.from(s).toString('base64') : btoa(s)
  } catch (_) {
    return btoa(s)
  }
}

// istanbul ignore next
/** @internal */
export const base64Decode = (s: string): string => {
  try {
    return Buffer ? Buffer.from(s, 'base64').toString() : atob(s)
  } catch (_) {
    return atob(s)
  }
}

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
 * Performs a validative traversal over a struct's own enumerable properties while mapping
 * output types.
 *
 * @internal
 */
export const witherRemap =
  <E, A>(sgErrors: Sg.Semigroup<E>) =>
  <In extends Record<string, any>>(
    f: <K extends keyof In>(
      key: K,
      value: In[K],
    ) => E.Either<
      E,
      O.Option<readonly [output: A, key: keyof In, semigroup: Sg.Semigroup<A>]>
    >,
  ) =>
  (s: In): E.Either<E, { [K in keyof In]: A }> => {
    const effects: Record<
      string,
      E.Either<E, O.Option<readonly [A, keyof In, Sg.Semigroup<A>]>>
    > = {}

    /* Enumerable own, Enumerable inherited */
    for (const key in s) {
      /* Ignores inherited properties */
      // istanbul ignore next
      if (!hasOwn(s, key)) continue

      /* Perform effect */
      effects[key] = f(key, s[key])
    }

    return pipe(
      effects,
      RR.wither(E.getApplicativeValidation(sgErrors))(identity),
      E.map(s => {
        const out: { [K in keyof In]: A } = {} as any
        for (const key in s) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const [value, newKey, semigroup] = s[key]!
          if (hasOwn(out, newKey)) {
            out[newKey] = semigroup.concat(out[newKey], value)
            continue
          }
          out[newKey] = value
        }
        return out
      }),
    )
  }

const getApplicativeValidationPar = <E>(sgErrors: Sg.Semigroup<E>) =>
  TE.getApplicativeTaskValidation(T.ApplicativePar, sgErrors)

/** Performs a task-validative traversal over a struct's own enumerable properties. */
export const witherRemapPar =
  <E, A>(sgErrors: Sg.Semigroup<E>) =>
  <In extends Record<string, any>>(
    f: <K extends keyof In>(
      key: K,
      value: In[K],
    ) => TE.TaskEither<E, O.Option<readonly [A, keyof In, Sg.Semigroup<A>]>>,
  ) =>
  (s: In): TE.TaskEither<E, { [K in keyof In]: A }> => {
    const effects: Record<
      string,
      TE.TaskEither<E, O.Option<readonly [A, keyof In, Sg.Semigroup<A>]>>
    > = {}

    /* Enumerable own, Enumerable inherited */
    for (const key in s) {
      /* Ignores inherited properties */
      // istanbul ignore next
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
          const [value, newKey, semigroup] = s[key]!
          if (hasOwn(out, newKey)) {
            out[newKey] = semigroup.concat(out[newKey], value)
            continue
          }
          out[newKey] = value
        }
        return out
      }),
    )
  }
