---
title: PatternBuilder.ts
nav_order: 22
parent: Modules
---

## PatternBuilder overview

The `PatternBuilder` module contains utilities to construct regular expressions,
fast-check arbitraries, and (potentially) other things that match some pattern. These
`Pattern`s can be used directly or via the `pattern` addition to the `Schemable`
interface. They can also be composed together to create more readable descriptions of a
regular expression.

**Example**

```ts
import * as PB from 'schemata-ts/PatternBuilder'
import { pipe } from 'fp-ts/function'

const digit = PB.characterClass(false, ['0', '9'])

const areaCode = pipe(
  pipe(PB.char('('), PB.then(PB.times(3)(digit)), PB.then(PB.char(')')), PB.then(PB.maybe(PB.char(' ')))),
  PB.or(PB.times(3)(digit)),
  PB.subgroup
)

const prefix = PB.times(3)(digit)

const lineNumber = PB.times(4)(digit)

export const usPhoneNumber = pipe(
  areaCode,
  PB.then(pipe(PB.char('-'), PB.maybe)),
  PB.then(prefix),
  PB.then(PB.char('-')),
  PB.then(lineNumber)
)

assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123) 456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123)456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('123-456-7890'), true)
assert.equal(PB.regexFromPattern(usPhoneNumber).test('1234567890'), false)
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Atom (type alias)](#atom-type-alias)
  - [CharacterClass (type alias)](#characterclass-type-alias)
  - [Disjunction (type alias)](#disjunction-type-alias)
  - [Pattern (type alias)](#pattern-type-alias)
  - [QuantifiedAtom (type alias)](#quantifiedatom-type-alias)
  - [Term (type alias)](#term-type-alias)
  - [TermSequence (type alias)](#termsequence-type-alias)
- [utils](#utils)
  - [alnum](#alnum)
  - [alpha](#alpha)
  - [and](#and)
  - [anyNumber](#anynumber)
  - [anything](#anything)
  - [atLeast](#atleast)
  - [atLeastOne](#atleastone)
  - [between](#between)
  - [blank](#blank)
  - [char](#char)
  - [characterClass](#characterclass)
  - [digit](#digit)
  - [empty](#empty)
  - [exactString](#exactstring)
  - [exactly](#exactly)
  - [graph](#graph)
  - [hexDigit](#hexdigit)
  - [integerRange](#integerrange)
  - [lower](#lower)
  - [maybe](#maybe)
  - [non](#non)
  - [oneOf](#oneof)
  - [or](#or)
  - [print](#print)
  - [punct](#punct)
  - [regexFromPattern](#regexfrompattern)
  - [sequence](#sequence)
  - [space](#space)
  - [subgroup](#subgroup)
  - [then](#then)
  - [times](#times)
  - [upper](#upper)
  - [word](#word)
  - [xdigit](#xdigit)

---

# Model

## Atom (type alias)

**Signature**

```ts
export type Atom =
  | CharacterClass
  | ({ tag: 'atom' } & (
      | { kind: 'character'; char: string }
      | { kind: 'anything' }
      | { kind: 'subgroup'; subpattern: Pattern }
    ))
```

Added in v1.0.0

## CharacterClass (type alias)

**Signature**

```ts
export type CharacterClass = {
  tag: 'atom'
  kind: 'characterClass'
  exclude: boolean
  ranges: ReadonlyArray<{ lower: number; upper: number }>
}
```

Added in v1.0.0

## Disjunction (type alias)

**Signature**

```ts
export type Disjunction = {
  tag: 'disjunction'
  left: Pattern
  right: TermSequence | Term
}
```

Added in v1.0.0

## Pattern (type alias)

**Signature**

```ts
export type Pattern = Disjunction | TermSequence | Term
```

Added in v1.0.0

## QuantifiedAtom (type alias)

**Signature**

```ts
export type QuantifiedAtom = { tag: 'quantifiedAtom'; atom: Atom } & (
  | { kind: 'star'; greedy: boolean }
  | { kind: 'plus'; greedy: boolean }
  | { kind: 'question' }
  | { kind: 'exactly'; count: number }
  | { kind: 'minimum'; min: number }
  | { kind: 'between'; min: number; max: number }
)
```

Added in v1.0.0

## Term (type alias)

**Signature**

```ts
export type Term = Atom | QuantifiedAtom
```

Added in v1.0.0

## TermSequence (type alias)

**Signature**

```ts
export type TermSequence = { tag: 'termSequence'; terms: ReadonlyArray<Term> }
```

Added in v1.0.0

# utils

## alnum

Any alphanumeric character in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const alnum: CharacterClass
```

Added in v1.0.0

## alpha

Any upper or lower case letter in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const alpha: CharacterClass
```

Added in v1.0.0

## and

Modify a character class with more ranges, or combine two character classes together.

**Signature**

```ts
export declare const and: {
  (...ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>): (
    cc: CharacterClass
  ) => CharacterClass
  (ccb: CharacterClass): (cca: CharacterClass) => CharacterClass
}
```

Added in v1.0.0

## anyNumber

Repeat an `Atom` any number of times (including zero).

**Signature**

```ts
export declare const anyNumber: (opts?: { greedy: boolean } | undefined) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## anything

A pattern of any single character

**Signature**

```ts
export declare const anything: Atom
```

Added in v1.0.0

## atLeast

Repeat an `Atom` at least some number of times. For example, `atLeast(3)(char('a'))`
represents `aaa`, `aaaaaa`, and `aaaaaaaaaaaaaaaaaaaaaaaa` but not `aa`

**Signature**

```ts
export declare const atLeast: (min: number) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## atLeastOne

Repeat an `Atom` any number of times, but at least once.

**Signature**

```ts
export declare const atLeastOne: (opts?: { greedy: boolean } | undefined) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## between

Repeat an `Atom` some number of times in the given range, inclusive.

**Signature**

```ts
export declare const between: (min: number, max: number) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## blank

Space or tab. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const blank: CharacterClass
```

Added in v1.0.0

## char

A pattern of a single, specific character

**Signature**

```ts
export declare const char: (c: Char) => Atom
```

Added in v1.0.0

## characterClass

A pattern of a single character that matches a list of characters or ranges. The ranges
can either be charcter to character (e.g. `['A', 'Z']`) or number to number (e.g.
`[0x3040, 0x309F]` which matches the Hiragana range in Unicode.)

If the first argument (`exclude`) is true, then the pattern is a single character that
is _not_ in the given ranges.

**Signature**

```ts
export declare const characterClass: (
  exclude: boolean,
  ...ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>
) => CharacterClass
```

Added in v1.0.0

## digit

Any digit character in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const digit: CharacterClass
```

Added in v1.0.0

## empty

An empty pattern.

**Signature**

```ts
export declare const empty: Pattern
```

Added in v1.0.0

## exactString

Construct an `Atom` for a specific string.

**Signature**

```ts
export declare const exactString: (s: string) => Atom
```

Added in v1.0.0

## exactly

Alias of `times`

**Signature**

```ts
export declare const exactly: (count: number) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## graph

Any character in ASCII which has a graphical representation (i.e. not control
characters or space). See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const graph: CharacterClass
```

Added in v1.0.0

## hexDigit

Alias of `xdigit`

**Signature**

```ts
export declare const hexDigit: CharacterClass
```

Added in v1.0.0

## integerRange

Create a pattern that matches integers in a given range. Does not currently handle
negatives (it returns an empty pattern if either number is negative)

**Signature**

```ts
export declare const integerRange: (min: number, max: number) => Pattern
```

Added in v1.0.0

## lower

Any lower case letter in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const lower: CharacterClass
```

Added in v1.0.0

## maybe

Make an `Atom` optional -- it can occur in the pattern once or not at all.

**Signature**

```ts
export declare const maybe: (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## non

Invert a character class

**Signature**

```ts
export declare const non: (cc: CharacterClass) => CharacterClass
```

Added in v1.0.0

## oneOf

Form a disjunction of multiple terms or term sequences.

**Signature**

```ts
export declare const oneOf: (pattern: Pattern, ...terms: ReadonlyArray<Term | TermSequence>) => Pattern
```

Added in v1.0.0

## or

Create a disjunction of two patterns. In regular expression terms, this corresponds to `|`.

**Signature**

```ts
export declare const or: (right: TermSequence | Atom | QuantifiedAtom) => (left: Pattern) => Disjunction
```

Added in v1.0.0

## print

Any non-control character in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const print: CharacterClass
```

Added in v1.0.0

## punct

Any punctuation character in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const punct: CharacterClass
```

Added in v1.0.0

## regexFromPattern

Construct a regular expression (`RegExp`) from a given `Pattern`.

**Signature**

```ts
export declare const regexFromPattern: (pattern: Pattern, caseInsensitive?: boolean) => RegExp
```

Added in v1.0.0

## sequence

Concatenate `Term`s

**Signature**

```ts
export declare const sequence: (term: Term, ...terms: ReadonlyArray<Term>) => TermSequence
```

Added in v1.0.0

## space

Any whitespace character in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const space: CharacterClass
```

Added in v1.0.0

## subgroup

Turn a `Pattern` into an `Atom`. In regular expression terms, this is wrapping the
pattern in parentheses.

**Signature**

```ts
export declare const subgroup: (subpattern: Pattern) => Atom
```

Added in v1.0.0

## then

Append a term or term sequence onto another.

**Signature**

```ts
export declare const then: (term: Term | TermSequence) => (alt: TermSequence | Term) => TermSequence
```

Added in v1.0.0

## times

Repeat an `Atom` an exact number of times. (Aliased to `exactly` for better readability
in some situations)

**Signature**

```ts
export declare const times: (count: number) => (atom: Atom) => QuantifiedAtom
```

Added in v1.0.0

## upper

Any upper case letter in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const upper: CharacterClass
```

Added in v1.0.0

## word

Any alphanumeric character in ASCII, or an underscore ('\_'). See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const word: CharacterClass
```

Added in v1.0.0

## xdigit

Any hexadecimal digit in ASCII. See [POSIX
equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)

**Signature**

```ts
export declare const xdigit: CharacterClass
```

Added in v1.0.0
