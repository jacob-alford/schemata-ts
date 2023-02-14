---
title: iso.ts
nav_order: 20
parent: Modules
---

## iso overview

A port of `monocle-ts` experimental `Iso` to schemata-ts

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [make](#make)
- [Instance Methods](#instance-methods)
  - [compose](#compose)
  - [id](#id)
  - [imap](#imap)
- [Instances](#instances)
  - [Category](#category)
  - [Invariant](#invariant)
  - [Semigroupoid](#semigroupoid)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Models](#models)
  - [Iso (interface)](#iso-interface)

---

# Constructors

## make

**Signature**

```ts
export declare const make: <A, B>(get: (a: A) => B, reverseGet: (b: B) => A) => Iso<A, B>
```

Added in v1.4.0

# Instance Methods

## compose

**Signature**

```ts
export declare const compose: <B, C>(ab: Iso<B, C>) => <A>(iso: Iso<A, B>) => Iso<A, C>
```

Added in v1.4.0

## id

**Signature**

```ts
export declare const id: <A>() => Iso<A, A>
```

Added in v1.4.0

## imap

**Signature**

```ts
export declare const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <S>(iso: Iso<S, A>) => Iso<S, B>
```

Added in v1.4.0

# Instances

## Category

**Signature**

```ts
export declare const Category: Category2<'schemata-ts/Iso'>
```

Added in v1.4.0

## Invariant

**Signature**

```ts
export declare const Invariant: Invariant2<'schemata-ts/Iso'>
```

Added in v1.4.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'schemata-ts/Iso'>
```

Added in v1.4.0

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/Iso'
```

Added in v1.4.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.4.0

# Models

## Iso (interface)

Represents an isomorphism between two types.

**Signature**

```ts
export interface Iso<A, B> {
  readonly get: (a: A) => B
  readonly reverseGet: (b: B) => A
}
```

Added in v1.4.0
