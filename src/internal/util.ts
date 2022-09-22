/** @internal */
export const base64Encode = (s: string): string =>
  Buffer ? Buffer.from(s).toString('base64') : btoa(s)
