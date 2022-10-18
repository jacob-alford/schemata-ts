---
title: generic/mapFromEntries.ts
nav_order: 6
parent: Modules
---

## mapFromEntries overview

Represents a ReadonlyMap converted from an expected array of entries.

Added in v1.0.0

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

Added in v1.0.0

## Decoder

**Signature**

```ts
export declare const Decoder: SchemableParams2C<'io-ts/Decoder'>
```

Added in v1.0.0

## Encoder

**Signature**

```ts
export declare const Encoder: SchemableParams2<'io-ts/Encoder'>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: SchemableParams1<'Eq'>
```

Added in v1.0.0

## Guard

**Signature**

```ts
export declare const Guard: SchemableParams1<'io-ts/Guard'>
```

Added in v1.0.0

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: SchemableParams2C<'io-ts/TaskDecoder'>
```

Added in v1.0.0

## Type

**Signature**

```ts
export declare const Type: SchemableParams1<'io-ts/Type'>
```

Added in v1.0.0

# Model

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = <K, A, EK, EA>(
  ordEK: Ord.Ord<K>,
  sk: HKT2<S, EK, K>,
  sa: HKT2<S, EA, A>
) => HKT2<S, ReadonlyArray<readonly [K, A]>, ReadonlyMap<K, A>>
```

Added in v1.0.0

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = <K, A>(
  ordK: Ord.Ord<K>,
  sk: Kind<S, K>,
  sa: Kind<S, A>
) => Kind<S, ReadonlyMap<K, A>>
```

Added in v1.0.0

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = <K, A, EK, EA>(
  ordEK: Ord.Ord<K>,
  sk: Kind2<S, EK, K>,
  sa: Kind2<S, EA, A>
) => Kind2<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
```

Added in v1.0.0

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = <K, A>(
  ordK: Ord.Ord<K>,
  sk: Kind2<S, unknown, K>,
  sa: Kind2<S, unknown, A>
) => Kind2<S, unknown, ReadonlyMap<K, A>>
```

Added in v1.0.0
