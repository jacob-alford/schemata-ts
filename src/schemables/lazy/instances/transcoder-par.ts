import { Lazy } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { memoize } from 'schemata-ts/Schema'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyTranscoderPar: WithLazy<TCP.SchemableLambda> = {
  lazy: <I, O>(_: string, f: Lazy<TCP.TranscoderPar<I, O>>): TCP.TranscoderPar<I, O> => {
    const get = memoize<void, TCP.TranscoderPar<I, O>>(f)
    return {
      decode: u => get().decode(u),
      encode: a => get().encode(a),
    }
  },
}
