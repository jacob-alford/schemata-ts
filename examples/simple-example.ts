import * as fc from 'fast-check'
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { strict as assert } from 'node:assert'
import * as S from 'schemata-ts'
import { deriveArbitrary } from 'schemata-ts/Arbitrary'
import { deriveEq } from 'schemata-ts/Eq'
import { type Float } from 'schemata-ts/float'
import { deriveGuard } from 'schemata-ts/Guard'
import { deriveJsonSchema } from 'schemata-ts/JsonSchema'
import { deriveMergeSemigroup } from 'schemata-ts/MergeSemigroup'
import * as TC from 'schemata-ts/Transcoder'
import { deriveTypeString } from 'schemata-ts/TypeString'

const Person = S.Struct({
  name: S.String(),
  age: S.Number,
  favoriteColor: S.Optional(S.String()),
})

// #################### Typescript Types ######################################

/**
 * This type wull be:
 *
 * { name: string, age: Float, favoriteColor?: string | undefined }
 */
export type PersonInput = S.InputOf<typeof Person>

/**
 * This type will be:
 *
 * { name: string, age: Float, favoriteColor: string | undefined }
 */
export type PersonOutput = S.OutputOf<typeof Person>

// #################### Validation #############################################

const transcoderPerson = TC.deriveTranscoder(Person)

// failed decoding
const decodeResult = transcoderPerson.decode({})

assert.deepStrictEqual(
  decodeResult,
  TC.failure(
    TC.transcodeErrors(
      TC.errorAtKey('age', TC.typeMismatch('Float', undefined)),
      TC.errorAtKey('name', TC.typeMismatch('string', undefined)),
    ),
  ),
)

// successful decoding
const decodeResult2 = transcoderPerson.decode({
  name: 'John',
  age: 42,
})

assert.deepStrictEqual(
  decodeResult2,
  TC.success({ name: 'John', age: 42, favoriteColor: undefined }),
)

// #################### Type Guards ###############################################

const guardPerson = deriveGuard(Person)

const testPerson1: unknown = {
  name: 'John',
  age: NaN,
}

// failed type guard
const isPerson = guardPerson.is(testPerson1)

if (isPerson) {
  // $ExpectType PersonOutput
  testPerson1
}

assert.strictEqual(isPerson, false)

const testPerson2: unknown = {
  name: 'John',
  age: 42,
}

// successful type guard
const isPerson2 = guardPerson.is(testPerson2)

assert.strictEqual(isPerson2, true)

// #################### Json Schema ###############################################

/** Derives Json-Schema version 2019-09 */
const jsonSchemaPerson = deriveJsonSchema(Person)

assert.deepStrictEqual(jsonSchemaPerson, {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    favoriteColor: { type: 'string' },
  },
  required: ['age', 'name'],
})

// #################### Arbitrary ###############################################

/** Note: fast-check start imports needs to be supplied in the `arbitrary` method */
const arbitraryPerson = deriveArbitrary(Person).arbitrary(fc)

// generate 5 random people
const people = fc.sample(arbitraryPerson, 5)

// all five should be valid according to `guard`
assert.deepStrictEqual(
  pipe(
    people,
    // check that all people are valid
    RA.foldMap(B.MonoidAll)(guardPerson.is),
  ),
  true,
)

// #################### Merge Semigroup #########################################

/** Derives a semigroup that configurably merges two people */
const mergeSemigroupPerson = deriveMergeSemigroup(Person)

const mergeSemigroupPersonFirst = mergeSemigroupPerson.semigroup('first')

assert.deepStrictEqual(
  mergeSemigroupPersonFirst.concat(
    { name: 'John', age: 42 as Float, favoriteColor: 'brown' },
    { name: 'Tim', age: 12 as Float, favoriteColor: 'blue' },
  ),
  { name: 'John', age: 42 as Float, favoriteColor: 'brown' },
)

const mergeSemigroupPersonLast = mergeSemigroupPerson.semigroup('last')

assert.deepStrictEqual(
  mergeSemigroupPersonLast.concat(
    { name: 'John', age: 42 as Float, favoriteColor: 'brown' },
    { name: 'Tim', age: 12 as Float, favoriteColor: 'blue' },
  ),
  { name: 'Tim', age: 12 as Float, favoriteColor: 'blue' },
)

// #################### Eq ######################################################

/** An `Eq` instance for person, essentially schema-tailored deep-equality */
const eqPerson = deriveEq(Person)

assert.deepStrictEqual(
  eqPerson.equals(
    { name: 'John', age: 42 as Float, favoriteColor: undefined },
    { name: 'John', age: 42 as Float, favoriteColor: undefined },
  ),
  true,
)

assert.deepStrictEqual(
  eqPerson.equals(
    { name: 'John', age: 42 as Float, favoriteColor: undefined },
    { name: 'John', age: 42 as Float, favoriteColor: 'blue' },
  ),
  false,
)

// #################### Type String ####################################################

const [inputString, outputString] = deriveTypeString(Person)

assert.deepStrictEqual(
  inputString,
  '{ age: Float, favoriteColor?: string?, name: string }',
)

assert.deepStrictEqual(
  outputString,
  '{ age: Float, favoriteColor: string?, name: string }',
)

// #################### Drawing Errors ####################################################

const testError = TC.transcodeErrors(
  TC.errorAtKey('age', TC.typeMismatch('Float', undefined)),
  TC.errorAtKey('name', TC.typeMismatch('string', undefined)),
)

assert.strictEqual(
  TC.drawErrorTree(testError),
  `Encountered 2 transcode errors:
┌ at key age:
└── Expected Float but got \`undefined\`
┌ at key name:
└── Expected string but got \`undefined\``,
)
