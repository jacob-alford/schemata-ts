---
title: Guard.ts
nav_order: 5
permalink: /guard/
---

## Guard overview

`Guard` is a data-type that narrows an unknown value to a specific type using
Typescript type guards

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromPredicate](#frompredicate)
- [Interpreters](#interpreters)
  - [deriveGuard](#deriveguard)
- [Model](#model)
  - [Guard (interface)](#guard-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Constructors

## fromPredicate

Constructs a guard from predicate function

**Signature**

```ts
export declare const fromPredicate: <A>(predicate: (u: unknown) => u is A) => Guard<A>
```

Added in v2.0.0

# Interpreters

## deriveGuard

Interprets a schema as a decoder

**Signature**

```ts
export declare const deriveGuard: Interpreter<I.SchemableLambda>
```

Added in v2.0.0

# Model

## Guard (interface)

Represents a typeclass and data-type that narrows an unknown value to a specific type

**Signature**

```ts
export interface Guard<A> {
  readonly is: (u: unknown) => u is A
}
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/Guard'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
