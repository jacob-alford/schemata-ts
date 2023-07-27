---
title: Eq.ts
nav_order: 3
permalink: /eq/
---

## Eq overview

Eq is a data type that determines if two values of the same type are equal, and abides
the following laws:

1. Reflexivity: `x === x`
2. Symmetry: `x === y <=> y === x`
3. Transitivity: `x === y && y === z => x === z`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [and](#and)
  - [or](#or)
- [Constructors](#constructors)
  - [fromEquals](#fromequals)
- [Instance Methods](#instance-methods)
  - [contramap](#contramap)
  - [imap](#imap)
- [Instances](#instances)
  - [Contravariant](#contravariant)
  - [Invariant](#invariant)
  - [always](#always)
  - [eqStrict](#eqstrict)
- [Interpreters](#interpreters)
  - [deriveEq](#deriveeq)
- [Model](#model)
  - [Eq (interface)](#eq-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Combinators

## and

**Signature**

```ts
export declare const and: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A>
```

Added in v2.0.0

## or

**Signature**

```ts
export declare const or: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A>
```

Added in v2.0.0

# Constructors

## fromEquals

**Signature**

```ts
export declare const fromEquals: <A>(equals: (x: A, y: A) => boolean) => Eq<A>
```

Added in v2.0.0

# Instance Methods

## contramap

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v2.0.0

## imap

**Signature**

```ts
export declare const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v2.0.0

# Instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'schemata-ts/Eq'>
```

Added in v2.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: Invariant1<'schemata-ts/Eq'>
```

Added in v2.0.0

## always

**Signature**

```ts
export declare const always: Eq<unknown>
```

Added in v2.0.0

## eqStrict

**Signature**

```ts
export declare const eqStrict: Eq<unknown>
```

Added in v2.0.0

# Interpreters

## deriveEq

Interprets a schema as an `Eq` instance.

**Signature**

```ts
export declare const deriveEq: <E, A>(schema: Schema<E, A>) => I.Eq<A>
```

Added in v2.0.0

# Model

## Eq (interface)

Represents a typeclass and data type that determines if two values of the same type are
equal, and follows the following laws:

1. Reflexivity: `x === x`
2. Symmetry: `x === y <=> y === x`
3. Transitivity: `x === y && y === z => x === z`

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/Eq'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
