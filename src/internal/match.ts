/** @internal */
export const matchOn =
  <D extends string>(d: D) =>
  <
    TaggedUnion extends { [DK in D]: string },
    M extends {
      [K in TaggedUnion[D]]: (v: Extract<TaggedUnion, { [DK in D]: K }>) => unknown
    }
  >(
    matchObj: M
  ) =>
  (v: TaggedUnion): ReturnType<M[keyof M]> =>
    matchObj[v[d] as keyof M](
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      v as any
    ) as ReturnType<M[keyof M]>

/** @internal */
export const match = matchOn('tag')
