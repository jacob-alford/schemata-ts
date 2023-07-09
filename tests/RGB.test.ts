import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid: ReadonlyArray<string> = [
  'rgb(0,0,0)',
  'rgb(255,255,255)',
  'rgba(0,0,0,0)',
  'rgba(255,255,255,1)',
  'rgba(255,255,255,.1)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,.12)',
  'rgb(5%,5%,5%)',
  'rgba(5%,5%,5%,.3)',
]

const invalid: ReadonlyArray<string> = [
  'rgb(0,0,0,)',
  'rgb(0,0,)',
  'rgb(0,0,256)',
  'rgb()',
  'rgba(0,0,0)',
  'rgba(255,255,255,2)',
  'rgba(255,255,256,0.1)',
  'rgb(4,4,5%)',
  'rgba(5%,5%,5%)',
  'rgba(3,3,3%,.3)',
  'rgb(101%,101%,101%)',
  'rgba(3%,3%,101%,0.3)',
]

runStandardTestSuite(S.RGB, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern:
      '^((rgb\\()(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5])),(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5])),(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5]))\\)|(rgba\\()(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5])),(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5])),(\\d|[1-8]\\d|9\\d|[1]\\d\\d|2(0\\d|[1-4]\\d|5[0-5])),(0|1|(1\\.0)|0?\\.\\d+)\\)|(rgb\\()(\\d|[1-8]\\d|9\\d|1(00))(%,)(\\d|[1-8]\\d|9\\d|1(00))(%,)(\\d|[1-8]\\d|9\\d|1(00))(%\\))|(rgba\\()(\\d|[1-8]\\d|9\\d|1(00))(%,)(\\d|[1-8]\\d|9\\d|1(00))(%,)(\\d|[1-8]\\d|9\\d|1(00))(%,)(0|1|(1\\.0)|0?\\.\\d+)\\))$',
  }),
  typeString: 'RGB',
}))()
