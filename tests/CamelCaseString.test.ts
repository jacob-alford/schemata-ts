import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const typefestCases: ReadonlyArray<readonly [string, string]> = [
  ['FooBar', 'fooBar'],
  ['foo-bar', 'fooBar'],
  ['foo-bar-abc-123', 'fooBarAbc123'],
  ['foo bar', 'fooBar'],
  ['foo_bar', 'fooBar'],
  ['foobar', 'foobar'],
  ['foo-bar_abc xyzBarFoo', 'fooBarAbcXyzBarFoo'],
  ['-webkit-animation', 'webkitAnimation'],
  ['--very-prefixed', 'veryPrefixed'],
  ['foo____bar', 'fooBar'],
  ['FOO', 'foo'],
  ['foo', 'foo'],
  ['FOO_BAR', 'fooBar'],
  ['FOO-BAR', 'fooBar'],
  // non-matching camelcase tests
  ['IDs', 'iDs'],
  ['FooIDs', 'fooIDs'],
  ['foo.bar', 'foo.bar'], // <-- not handling period separators
  ['..foo..bar..', '..foo..bar..'], // <-- not handling period separators
  ['.', '.'], // <-- not handling period separators
  ['..', '..'], // <-- not handling period separators
]

const camelcaseCases: ReadonlyArray<readonly [string, string]> = [
  ['foo', 'foo'],
  ['foo-bar', 'fooBar'],
  ['foo-bar-baz', 'fooBarBaz'],
  ['foo--bar', 'fooBar'],
  ['--foo-bar', 'fooBar'],
  ['--foo--bar', 'fooBar'],
  ['FOO-BAR', 'fooBar'],
  ['FOÈ-BAR', 'foèBar'],
  ['-foo-bar-', 'fooBar'],
  ['--foo--bar--', 'fooBar'],
  ['foo-1', 'foo1'],
  ['foo_bar', 'fooBar'],
  ['__foo__bar__', 'fooBar'],
  ['foo bar', 'fooBar'],
  ['  foo  bar  ', 'fooBar'],
  ['-', ''],
  [' - ', ''],
  ['fooBar', 'fooBar'],
  ['fooBar-baz', 'fooBarBaz'],
  ['foìBar-baz', 'foìBarBaz'],
  ['fooBarBaz-bazzy', 'fooBarBazBazzy'],
  ['FBBazzy', 'fbBazzy'],
  ['F', 'f'],
  ['FooBar', 'fooBar'],
  ['Foo', 'foo'],
  ['FOO', 'foo'],
  ['--', ''],
  ['', ''],
  ['_', ''],
  [' ', ''],
  ['--', ''],
  ['  ', ''],
  ['__', ''],
  ['--__--_--_', ''],
  ['foo bar?', 'fooBar?'],
  ['foo bar!', 'fooBar!'],
  ['foo bar$', 'fooBar$'],
  ['foo-bar#', 'fooBar#'],
  ['XMLHttpRequest', 'xmlHttpRequest'],
  ['AjaxXMLHttpRequest', 'ajaxXmlHttpRequest'],
  ['Ajax-XMLHttpRequest', 'ajaxXmlHttpRequest'],
  ['mGridCol6@md', 'mGridCol6@md'],
  ['A::a', 'a::a'],
  ['Hello1World', 'hello1World'],
  ['Hello11World', 'hello11World'],
  ['hello1world', 'hello1World'],
  ['Hello1World11foo', 'hello1World11Foo'],
  ['Hello1', 'hello1'],
  ['hello1', 'hello1'],
  ['1Hello', '1Hello'],
  ['1hello', '1Hello'],
  ['h2w', 'h2W'],
  ['розовый_пушистый-единороги', 'розовыйПушистыйЕдинороги'],
  ['розовый_пушистый-единороги', 'розовыйПушистыйЕдинороги'],
  ['РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ', 'розовыйПушистыйЕдинороги'],
  ['桑德在这里。', '桑德在这里。'],
  ['桑德在这里。', '桑德在这里。'],
  ['桑德_在这里。', '桑德在这里。'],
]

const miscCases: ReadonlyArray<readonly [string, string]> = [
  ['a0A0', 'a0A0'],
  ['a0a0', 'a0A0'],
]

runStandardTestSuite(
  S.CamelCaseString(),
  _ => ({
    decoderTests: [
      ...typefestCases.map(([input, expected]) => _.decoder.pass(input, expected)),
      ...camelcaseCases.map(([input, expected]) => _.decoder.pass(input, expected)),
      ...miscCases.map(([input, expected]) => _.decoder.pass(input, expected)),
    ],
    encoderTests: [
      ...typefestCases.map(([, expected]) =>
        _.encoder.pass(_.c(expected), _.c(expected)),
      ),
      ...camelcaseCases.map(([, expected]) =>
        _.encoder.pass(_.c(expected), _.c(expected)),
      ),
      ...miscCases.map(([, expected]) => _.encoder.pass(_.c(expected), _.c(expected))),
    ],
    guardTests: [],
    eqTests: [],
    jsonSchema: JS.string(),
    typeString: 'string',
  }),
  { skip: ['semigroup-many-associativity'] },
)()
