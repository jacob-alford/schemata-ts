import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  'hsl(360,0000000000100%,000000100%)',
  'hsl(000010, 00000000001%, 00000040%)',
  // 'HSL(00000,0000000000100%,000000100%)', // TODO -- Shouldn't fail
  // 'hsL(0, 0%, 0%)', // TODO -- Shouldn't fail
  // 'hSl(  360  , 100%  , 100%   )', // TODO -- Shouldn't fail
  // 'Hsl(  00150  , 000099%  , 01%   )', // TODO -- Shouldn't fail
  'hsl(01080, 03%, 4%)',
  'hsl(-540, 03%, 4%)',
  'hsla(+540, 03%, 4%)',
  'hsla(+540, 03%, 4%, 500)',
  'hsl(+540deg, 03%, 4%, 500)',
  // 'hsl(+540gRaD, 03%, 4%, 500)', // TODO -- Shouldn't fail
  'hsl(+540.01e-98rad, 03%, 4%, 500)',
  'hsl(-540.5turn, 03%, 4%, 500)',
  'hsl(+540, 03%, 4%, 500e+80)',
  'hsl(+540, 03%, 4%, 500e-01)',
  'hsl(4.71239rad, 60%, 70%)',
  'hsl(270deg, 60%, 70%)',
  'hsl(200, +.1%, 62%, 1)',
  'hsl(270 60% 70%)',
  'hsl(200, +.1e-9%, 62e10%, 1)',
  'hsl(.75turn, 60%, 70%)',
  // 'hsl(200grad+.1%62%/1)', //supposed to pass, but need to handle delimiters
  'hsl(200grad +.1% 62% / 1)',
  'hsl(270, 60%, 50%, .15)',
  'hsl(270, 60%, 50%, 15%)',
  'hsl(270 60% 50% / .15)',
  'hsl(270 60% 50% / 15%)',
]

const invalid = [
  'hsl (360,0000000000100%,000000100%)',
  'hsl(0260, 100 %, 100%)',
  'hsl(0160, 100%, 100%, 100 %)',
  'hsl(-0160, 100%, 100a)',
  'hsl(-0160, 100%, 100)',
  'hsl(-0160 100%, 100%, )',
  'hsl(270 deg, 60%, 70%)',
  'hsl( deg, 60%, 70%)',
  'hsl(, 60%, 70%)',
  'hsl(3000deg, 70%)',
]

runStandardTestSuite(S.HslColor, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern:
      '^((hsl)a?\\([ \\x09]*((\\+|-)?(\\d+(\\.\\d+)?|(\\.\\d+))(e(\\+|-)?\\d+)?((deg)|(grad)|(rad)|(turn))?)(([ \\x09]*,[ \\x09]*)(\\+?0*((100)(\\.0+)?|(\\d|[1-8]\\d|9\\d)(\\.\\d+)?|(\\.\\d+))(e(\\+|-)?\\d+)?%)([ \\x09]*,[ \\x09]*)(\\+?0*((100)(\\.0+)?|(\\d|[1-8]\\d|9\\d)(\\.\\d+)?|(\\.\\d+))(e(\\+|-)?\\d+)?%)(([ \\x09]*,[ \\x09]*)(\\d*(\\d|(\\.\\d+))(e(\\+|-)?\\d+)?%?))?|[ \\x09]*(\\+?0*((100)(\\.0+)?|(\\d|[1-8]\\d|9\\d)(\\.\\d+)?|(\\.\\d+))(e(\\+|-)?\\d+)?%)[ \\x09]*(\\+?0*((100)(\\.0+)?|(\\d|[1-8]\\d|9\\d)(\\.\\d+)?|(\\.\\d+))(e(\\+|-)?\\d+)?%)(([ \\x09]*\\/[ \\x09]*)(\\d*(\\d|(\\.\\d+))(e(\\+|-)?\\d+)?%?))?)[ \\x09]*\\))$',
  }),
  typeString: 'HslColor',
}))()
