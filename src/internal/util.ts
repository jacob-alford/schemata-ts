import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'

import * as PB from '../PatternBuilder'
import { bigIntString } from '../schemata/number/BigIntFromString'

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)

/** @internal */
export const urlifyBase64 = (s: string): string =>
  s.replace(/[=+/]/g, c => (c === '/' ? '_' : c === '+' ? '-' : ''))

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
        if (Object.hasOwn(a, key)) eff(key, a[key])()
      }
    }
  }

/** @internal */
export const stringify = (a: unknown): string =>
  JSON.stringify(
    a,
    function (k, v) {
      const safeStringify: (v: any) => string = v => {
        if (typeof v === 'bigint') return `${v}n`
        if (v === undefined) return '[undefined]'
        if (typeof v === 'number' && Number.isNaN(v)) return '[NaN]'
        if (typeof v === 'number' && !Number.isFinite(v))
          return v > 0 ? '[Infinity]' : '[-Infinity]'
        return v
      }
      if (k !== '' && v === a) return '[Circular]'
      return safeStringify(v)
    },
    2,
  )

/**
 * Not currently using this... But it's here if we need it.
 *
 * @internal
 */
export const parse = (s: string): unknown =>
  JSON.parse(s, function (_, v) {
    if (typeof v !== 'string') return v
    // returning undefined here will remove this key from the object
    // if (v === '[undefined]') return undefined
    if (v === '[NaN]') return NaN
    if (v === '[Infinity]') return Infinity
    if (v === '[-Infinity]') return -Infinity
    if (
      PB.regexFromPattern(pipe(PB.subgroup(bigIntString), PB.then(PB.char('n')))).test(v)
    )
      return BigInt(v.slice(0, -1))
    return v
  })
