import { identity, pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'

import { runStandardTestSuite } from '../test-utils/test-suite'

class ErrorClass {
  constructor(public readonly error: string) {}
}

const SchemaInput = S.Struct({
  error: S.String(),
})

const Schema = pipe(
  SchemaInput,
  S.Class(ErrorClass, _ => new ErrorClass(_.error), identity),
)

runStandardTestSuite(Schema, _ => ({
  decoderTests: [_.decoder.pass({ error: 'foo' }, new ErrorClass('foo'))],
  encoderTests: [_.encoder.pass(new ErrorClass('foo'), { error: 'foo' })],
}))()
