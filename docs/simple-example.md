---
title: Simple Example
nav_order: 89
permalink: /simple-example/
---

# Simple Example

This is an example using schemata-ts derivation on a simple schema.  

## Imports

This example uses the following imports:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=1-14) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Schema

> Use the `S` import to access all schemas and schema combinators.

This schema uses the `Struct` combinator, `String` schema, `Number` schema, and `Optional` combinator.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=16-20) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
const Person = S.Struct({
  name: S.String(),
  age: S.Number,
  favoriteColor: S.Optional(S.String()),
})
```
<!-- AUTO-GENERATED-CONTENT:END -->

## TypeScript Types

> Use `S.InputOf` to extract the underlying input type, and `S.OutputOf` to extract the underlying output type.

The `Person` schema has nearly identical input/output types, with one exception. The `favoriteColor` key, may be present or not with the input type, but will always be present in the output type.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=24-36) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Validation

> Use `deriveTranscoder` to interpret the schema as a `Transcoder`.

Transcoders can `decode` an unknown value of an expected input type and transform it to the expected output type. They can also `encode` a value of the output type and transform it to the expected input type.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=40-64) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Type Guards

> Use `deriveGuard` to interpret the schema as a `Guard`

Guards are used to determine if the type of an unknown value matches the output type, and also serve as TypeScript type guards.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=68-93) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Json Schema

> Use `deriveJsonSchema` to interpret the schema as a `JsonSchema`.

Json Schemas are used to generate a JSON Schema Draft 7, 2019-09, or 2020-12 representation of the schema.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=97-108) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Arbitrary

> Use `deriveArbitrary` to interpret the schema as an `Arbitrary`

Arbitraries are used to generate random values of the expected output type.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=112-126) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Merge Semigroup

> Use `deriveMergeSemigroup` to interpret the schema as a `MergeSemigroup`

Merge Semigroups are used to merge two values of the output type, and can be configured as  `first`, or `last` semigroups; or to concat two primitives based on supplied semigroups and a fallback semigroup.  MergeSemigroup will merge mergable data types such as arrays and records.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=130-151) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Eq

> Use `deriveEq` to interpret the schema as an `Eq`

`Eq` insteances s are used to determine if two values of the expected output type are equal.  Which are essentially a schema-tailored deep-merge.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=155-172) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Type String

> Use `deriveTypeString` to interpret the schema as a `TypeString`

TypeStrings are used to generate a user-descriptive string that describes the underlying input and output types.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=176-186) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
const [inputString, outputString] = deriveTypeString(Person)

assert.deepStrictEqual(
  inputString,
  '{ age: Float, favoriteColor?: string?, name: string }',
)

assert.deepStrictEqual(
  outputString,
  '{ age: Float, favoriteColor: string?, name: string }',
)
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Displaying Errors

> Use `drawErrorTree` to display errors in a friendly way

There are many ways to format errors in schemata, but the easiest is `drawErrorTree` from the `Transcoder` module.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../examples/simple-example.ts&lines=190-202) -->
<!-- The below code snippet is automatically added from ../examples/simple-example.ts -->
```ts
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
```
<!-- AUTO-GENERATED-CONTENT:END -->
