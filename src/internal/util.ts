import fc, { Arbitrary } from 'fast-check'

/* istanbul ignore next */
/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)

/** @internal */
export const urlifyBase64 = (s: string): string =>
  s.replace(/[=+/]/g, c => (c === '/' ? '_' : c === '+' ? '-' : ''))

/** @internal */
export const digits = (ns: ReadonlyArray<number>): Arbitrary<string> =>
  fc
    .oneof(...ns.map(n => fc.array(fc.nat({ max: 9 }), { maxLength: n, minLength: n })))
    .map(ds => ds.join(''))
