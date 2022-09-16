---
title: string/UUID.ts
nav_order: 19
parent: Modules
---

## UUID overview

Represents strings that are UUIDs.

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
  - [UUID (type alias)](#uuid-type-alias)
  - [UUIDSchemableOptions (type alias)](#uuidschemableoptions-type-alias)
- [Refinements](#refinements)
  - [isUUID](#isuuid)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: SchemableParams2C<'io-ts/Decoder'>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: SchemableParams1<'Eq'>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: SchemableParams1<'io-ts/Guard'>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: SchemableParams2C<'io-ts/TaskDecoder'>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: SchemableParams1<'io-ts/Type'>
```

Added in v0.0.1

# Model

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = (options: UUIDSchemableOptions) => HKT<S, UUID>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = (options: UUIDSchemableOptions) => Kind<S, UUID>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = (options: UUIDSchemableOptions) => Kind2<S, unknown, UUID>
```

Added in v0.0.1

## UUID (type alias)

Represents strings that are UUIDs.

**Signature**

```ts
export type UUID = string & UUIDBrand
```

Added in v0.0.1

## UUIDSchemableOptions (type alias)

**Signature**

```ts
export type UUIDSchemableOptions = {
  version: keyof typeof uuidRegex
}
```

Added in v0.0.1

# Refinements

## isUUID

**Signature**

```ts
export declare const isUUID: (options: UUIDSchemableOptions) => (s: string) => s is UUID
```

Added in v0.0.1
