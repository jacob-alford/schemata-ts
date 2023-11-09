---
title: UUID
nav_order: 90
parent: schemata
---

## UUID overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [UUID (interface)](#uuid-interface)
  - [UUIDVersion (type alias)](#uuidversion-type-alias)
- [String](#string)
  - [UUID](#uuid)
- [utils](#utils)
  - [isoUUID](#isouuid)

---

# Model

## UUID (interface)

Represents strings that are UUIDs.

**Signature**

```ts
export interface UUID<Version extends UUIDVersion> extends Nt.Newtype<UUIDBrand<Version>, string> {}
```

Added in v1.0.0

## UUIDVersion (type alias)

**Signature**

```ts
export type UUIDVersion = keyof typeof uuidPattern
```

Added in v1.0.0

# String

## UUID

**Signature**

```ts
export declare const UUID: <Version extends 2 | 1 | 3 | 4 | 5 | 'any'>(
  version: Version
) => Schema<string, UUID<Version>>
```

Added in v1.0.0

# utils

## isoUUID

A newtype iso for UUID

**Signature**

```ts
export declare const isoUUID: <Version extends 2 | 1 | 3 | 4 | 5 | 'any'>() => Nt.NewtypeIso<UUID<Version>, string>
```

Added in v2.0.0
