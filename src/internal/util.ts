/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)

/** @internal */
export const urlifyBase64 = (s: string): string =>
  s.replace(/[=+/]/g, c => (c === '/' ? '_' : c === '+' ? '-' : c === '=' ? '' : c))
