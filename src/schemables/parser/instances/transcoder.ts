import * as E from 'fp-ts/Either'
import { flow, identity, pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithParser } from 'schemata-ts/schemables/parser/definition'
import { ParserGuard } from 'schemata-ts/schemables/parser/instances/guard'
import { PrimitivesTranscoder } from 'schemata-ts/schemables/primitives/instances/transcode'

export const ParserTranscoder: WithParser<TC.SchemableLambda> = {
  parse: (name, parse, print) => inner => ({
    encode: flow(
      inner.encode,
      E.chain(encoded =>
        pipe(
          print(encoded),
          E.mapLeft(err => TC.transcodeErrors(TC.serializationError(name, err, encoded))),
        ),
      ),
    ),
    decode: flow(
      PrimitivesTranscoder.string().decode,
      E.chain(preparsed =>
        pipe(
          parse(preparsed),
          E.mapLeft(err =>
            TC.transcodeErrors(TC.serializationError(name, err, preparsed)),
          ),
        ),
      ),
      E.chain(inner.decode),
    ),
  }),
  jsonString: pipe(
    ParserGuard.jsonString,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('JsonString', u))),
  ),
}
