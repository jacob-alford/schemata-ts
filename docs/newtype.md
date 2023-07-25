---
title: newtype.ts
nav_order: 9
permalink: /newtype/
---

## newtype overview

A port of `newtype-ts` to schemata-ts. Unliked branded types, newtypes are not
assignable to the underlying type.

Schemata-ts uses Newtypes for UUIDs.

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [iso](#iso)
- [Models](#models)
  - [Newtype (interface)](#newtype-interface)
- [Type Helpers](#type-helpers)
  - [CarrierOf (type alias)](#carrierof-type-alias)
  - [CombineURIs (type alias)](#combineuris-type-alias)
  - [URIOf (type alias)](#uriof-type-alias)
- [utils](#utils)
  - [NewtypeIso (interface)](#newtypeiso-interface)

---

# Constructors

## iso

**Signature**

```ts
export declare const iso: <Nt extends Newtype<any, any>>() => NewtypeIso<Nt, CarrierOf<Nt>>
```

Added in v1.4.0

# Models

## Newtype (interface)

Represents a wrapped type that's not assignable to its underlying type.

**Signature**

```ts
export interface Newtype<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

Added in v1.4.0

# Type Helpers

## CarrierOf (type alias)

**Signature**

```ts
export type CarrierOf<N extends Newtype<any, any>> = N['_A']
```

Added in v1.4.0

## CombineURIs (type alias)

**Signature**

```ts
export type CombineURIs<N1 extends Newtype<any, any>, N2 extends Newtype<any, CarrierOf<N1>>> = Newtype<
  URIOf<N1> & URIOf<N2>,
  CarrierOf<N1>
>
```

Added in v1.4.0

## URIOf (type alias)

**Signature**

```ts
export type URIOf<N extends Newtype<any, any>> = N['_URI']
```

Added in v1.4.0

# utils

## NewtypeIso (interface)

**Signature**

```ts
export interface NewtypeIso<A, B> {
  readonly wrap: (B: B) => A
  readonly unwrap: (A: A) => B
}
```

Added in v2.0.0
