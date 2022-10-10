---
title: generic/optionFromUndefined.ts
nav_order: 8
parent: Modules
---

## optionFromUndefined overview

Represents a conversion from an value that can be undefined to an Optional type

Added in v0.0.4

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: SchemableParams1<'Arbitrary'>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: SchemableParams2C<'io-ts/Decoder'>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: SchemableParams2<'io-ts/Encoder'>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: SchemableParams1<'Eq'>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: SchemableParams1<'io-ts/Guard'>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: SchemableParams2C<'io-ts/TaskDecoder'>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: SchemableParams1<'io-ts/Type'>
```

Added in v0.0.4

# Model

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = <A, E>(sa: HKT2<S, E, A>) => HKT2<S, E | undefined, O.Option<A>>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = <A>(sa: Kind<S, A>) => Kind<S, O.Option<A>>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = <A, E>(sa: Kind2<S, E, A>) => Kind2<S, E | undefined, O.Option<A>>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = <A>(sa: Kind2<S, unknown, A>) => Kind2<S, unknown, O.Option<A>>
```

Added in v0.0.4
