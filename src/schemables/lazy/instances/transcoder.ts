import { Lazy } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { memoize } from 'schemata-ts/Schema'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyTranscoder: WithLazy<TC.SchemableLambda> = {
  lazy: <I, O>(_: string, f: Lazy<TC.Transcoder<I, O>>): TC.Transcoder<I, O> => {
    const get = memoize<void, TC.Transcoder<I, O>>(f)
    return {
      decode: u => get().decode(u),
      encode: a => get().encode(a),
    }
  },
}
