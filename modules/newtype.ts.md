---
title: newtype.ts
nav_order: 24
parent: Modules
---

## newtype overview

A port of `newtype-ts` to schemata-ts

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [iso](#iso)
  - [wrap](#wrap)
- [Destructors](#destructors)
  - [unwrap](#unwrap)
- [Models](#models)
  - [Newtype (interface)](#newtype-interface)
- [Type Helpers](#type-helpers)
  - [CarrierOf (type alias)](#carrierof-type-alias)
  - [CombineURIs (type alias)](#combineuris-type-alias)
  - [URIOf (type alias)](#uriof-type-alias)

---

# Constructors

## iso

**Signature**

```ts
export declare const iso: <Nt extends Newtype<any, any>>() => Iso<Nt, CarrierOf<Nt>>
```

Added in v1.4.0

## wrap

**Signature**

```ts
export declare const wrap: <Nt extends Newtype<any, any>>() => (a: CarrierOf<Nt>) => Nt
```

Added in v1.4.0

# Destructors

## unwrap

**Signature**

```ts
export declare const unwrap: <Nt extends Newtype<any, any>>() => (a: Nt) => CarrierOf<Nt>
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
