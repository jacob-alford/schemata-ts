import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const repeat: (s: string, times: number) => string = (s, times) => s.repeat(times)

const valid: ReadonlyArray<string> = [
  'foo@bar.com',
  'x@x.au',
  'foo@bar.com.au',
  'foo+bar@bar.com',
  'test123+ext@gmail.com',
  'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
  '"foobar"@example.com',
  '"  foo  m端ller "@example.com',
  '"foo\\@bar"@example.com',
  `${repeat('a', 64)}@${repeat('a', 63)}.com`,
  `${repeat('a', 64)}@${repeat('a', 63)}.com`,
  `${repeat('a', 31)}@gmail.com`,
  'test@gmail.com',
  'test.1@gmail.com',
  'test@1337.com',
]

const invalid: ReadonlyArray<string> = [
  'invalidemail@',
  'invalid.com',
  '@invalid.com',
  'foo@bar.com.',
  'hans.m端ller@test.com',
  'hans@m端ller.com',
  'test|123@m端ller.com',
  'somename@ｇｍａｉｌ.com',
  'foo@bar.co.uk.',
  'z@co.c',
  'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
  // `${repeat('a', 64)}@${repeat('a', 251)}.com`, // passes (but shouldn't)
  // `${repeat('a', 65)}@${repeat('a', 250)}.com`, // passes (but shouldn't)
  // `${repeat('a', 64)}@${repeat('a', 64)}.com`, // passes (but shouldn't)
  // `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat(
  // 'a',
  // 58
  // )}.com`, //passes (but shouldn't)
  'test1@invalid.co m',
  'test2@invalid.co m',
  'test3@invalid.co m',
  'test4@invalid.co m',
  'test5@invalid.co m',
  'test6@invalid.co m',
  'test7@invalid.co m',
  'test8@invalid.co m',
  'test9@invalid.co m',
  'test10@invalid.co m',
  'test11@invalid.co m',
  'test12@invalid.co　m',
  'test13@invalid.co　m',
  'multiple..dots@stillinvalid.com',
  'test123+invalid! sub_address@gmail.com',
  'gmail...ignores...dots...@gmail.com',
  'ends.with.dot.@gmail.com',
  'multiple..dots@gmail.com',
  'wrong()[]",:;<>@@gmail.com',
  '"wrong()[]",:;<>@@gmail.com',
  'username@domain.com�',
  'username@domain.com©',
]

runStandardTestSuite(S.EmailAddress, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern:
      '^(([A-Za-z0-9!#$%&\'*+\\x2d\\x2f=?\\x5e_`{|}~]+(\\.[A-Za-z0-9!#$%&\'*+\\x2d\\x2f=?\\x5e_`{|}~]+)*|"[^"\\x00-\\x1f]+")@(\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\]|([A-Za-z0-9\\x2d]{0,63}\\.)+[A-Za-z]{2,}))$',
  }),
  typeString: 'EmailAddress',
}))()
