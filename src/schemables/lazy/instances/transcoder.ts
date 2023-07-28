import { type Lazy } from 'fp-ts/function'
import { memoize } from 'schemata-ts/internal/schema'
import type * as TC from 'schemata-ts/internal/transcoder'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyTranscoder: WithLazy<TC.SchemableLambda> = {
  lazy: <I, O>(_: string, f: Lazy<TC.Transcoder<I, O>>): TC.Transcoder<I, O> => {
    const get = memoize<void, TC.Transcoder<I, O>>(f)
    return {
      decode: u => get().decode(u),
      encode: a => get().encode(a),
    }
  },
}
