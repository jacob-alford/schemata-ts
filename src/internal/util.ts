import * as E from 'fp-ts/Either'
import * as IO from 'fp-ts/IO'
import * as O from 'fp-ts/Option'

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)

/** @internal */
export const urlifyBase64 = (s: string): string =>
  s.replace(/[=+/]/g, c => (c === '/' ? '_' : c === '+' ? '-' : ''))

/**
 * @since 1.0.0
 * @internal
 */
export const typeOf = (x: unknown): string => (x === null ? 'null' : typeof x)

/**
 * Performs a fail-fast skippable traversal over a struct's own enumerable properties.
 *
 * Not to be confused with traveling across spain
 */
export const traverseESO =
  <In extends Record<string, any>, E, A>(
    f: <K extends keyof In>(key: K, value: In[K]) => O.Option<E.Either<E, A>>,
  ) =>
  (s: In): E.Either<E, { [K in keyof In]: A }> => {
    const out: { [K in keyof In]: A } = {} as any
    /* Enumerable own, Enumerable inherited */
    for (const key in s) {
      /* Ignores inherited properties */
      if (!Object.hasOwn(s, key)) continue
      /* Perform effect */
      const result = f(key, s[key])
      /* none => skip */
      if (O.isNone(result)) continue
      /* Bail early if effect failed */
      if (E.isLeft(result.value)) return result.value
      /* Otherwise, add result to output */
      out[key] = result.value.right
    }
    return E.right(out)
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
        if (!Object.hasOwn(a, key)) continue
        eff(key, a[key])()
      }
    }
  }
