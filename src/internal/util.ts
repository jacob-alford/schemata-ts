import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)

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
 * Performs a validative traversal over a struct's own enumerable properties.
 *
 * @internal
 */
export const witherS =
  <E>(sgErrors: Sg.Semigroup<E>) =>
  <In extends Record<string, any>, A>(
    f: <K extends keyof In>(key: K, value: In[K]) => E.Either<E, O.Option<A>>,
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
      else out[key] = result.right.value
    }
    return RA.isNonEmpty(errors)
      ? E.left(pipe(errors, RNEA.concatAll(sgErrors)))
      : E.right(out)
  }

/**
 * Performs a validative traversal over a struct's own enumerable properties while mapping
 * output types.
 *
 * @internal
 */
export const witherSWithRemap =
  <E>(sgErrors: Sg.Semigroup<E>) =>
  <In extends Record<string, any>, A>(
    f: <K extends keyof In>(
      key: K,
      value: In[K],
    ) => E.Either<E, O.Option<readonly [A, keyof In]>>,
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
        out[newKey] = value
      }
    }
    return RA.isNonEmpty(errors)
      ? E.left(pipe(errors, RNEA.concatAll(sgErrors)))
      : E.right(out)
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
