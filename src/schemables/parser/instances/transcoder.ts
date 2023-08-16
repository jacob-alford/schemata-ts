import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'
import { PrimitivesTranscoder } from 'schemata-ts/schemables/primitives/instances/transcoder'
import { TranscodeErrors } from 'schemata-ts/TranscodeError'

export const ParserTranscoder: WithParser<TC.SchemableLambda> = {
  parse: (name, parse, print) => inner => ({
    encode: flow(
      inner.encode,
      E.chain(encoded =>
        pipe(
          print(encoded),
          E.mapLeft(err =>
            err instanceof TranscodeErrors
              ? err
              : TC.transcodeErrors(TC.serializationError(name, err, encoded)),
          ),
        ),
      ),
    ),
    decode: flow(
      PrimitivesTranscoder.string({ errorName: name }).decode,
      E.chain(preparsed =>
        pipe(
          parse(preparsed),
          E.mapLeft(err =>
            err instanceof TranscodeErrors
              ? err
              : TC.transcodeErrors(TC.serializationError(name, err, preparsed)),
          ),
        ),
      ),
      E.chain(inner.decode),
    ),
  }),
}
