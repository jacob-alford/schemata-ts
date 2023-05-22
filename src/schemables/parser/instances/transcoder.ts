import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithParser } from 'schemata-ts/schemables/parser/definition'
import { PrimitivesTranscoder } from 'schemata-ts/schemables/primitives/instances/transcode'

export const ParserTranscoder: WithParser<TC.SchemableLambda> = {
  parse: (name, parse, print) => inner => ({
    encode: flow(
      inner.encode,
      E.chain(encoded =>
        pipe(
          print(encoded),
          E.fromOption(() => TC.transcodeErrors(TC.typeMismatch(name, encoded))),
        ),
      ),
    ),
    decode: flow(
      PrimitivesTranscoder.string().decode,
      E.chain(preparsed =>
        pipe(
          parse(preparsed),
          E.fromOption(() => TC.transcodeErrors(TC.typeMismatch(name, preparsed))),
        ),
      ),
      E.chain(inner.decode),
    ),
  }),
}
