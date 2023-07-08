import * as N from 'fp-ts/number'
import * as Str from 'fp-ts/string'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

// import * as TC from 'schemata-ts/Transcoder'
import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Record(S.CamelCaseString(), S.Tuple(S.String(), S.Float()), {
  number: N.SemigroupSum,
  string: Str.Semigroup,
  fallback: 'last',
})

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass(
      {
        'foo bar baz': ['foo', 1.2],
        'baz-quux-foo': ['foo', 3.4],
        foo_bar_baz: ['bar', 5.6],
        BAZ_QUUX_FOO: ['baz', 7.8],
      },
      {
        fooBarBaz: ['foobar', 6.8],
        bazQuuxFoo: ['bazfoo', 11.2],
      },
    ),
  ],
  jsonSchema: JS.record(JS.tuple(JS.string(), JS.number())),
  typeString: 'Record<string, [string, Float]>',
}))()
