import { flow, pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithParser } from 'schemata-ts/schemables/parser/definition'
import { PrimitivesTranscoderPar } from 'schemata-ts/schemables/primitives/instances/transcoder-par'

export const ParserTranscoderPar: WithParser<TCP.SchemableLambda> = {
  parse: (name, parse, print) => inner => ({
    encode: flow(
      inner.encode,
      TE.chain(encoded =>
        pipe(
          print(encoded),
          TE.fromEither,
          TE.mapLeft(err =>
            TC.transcodeErrors(TC.serializationError(name, err, encoded)),
          ),
        ),
      ),
    ),
    decode: flow(
      PrimitivesTranscoderPar.string().decode,
      TE.chain(preparsed =>
        pipe(
          parse(preparsed),
          TE.fromEither,
          TE.mapLeft(err =>
            TC.transcodeErrors(TC.serializationError(name, err, preparsed)),
          ),
        ),
      ),
      TE.chain(inner.decode),
    ),
  }),
}
