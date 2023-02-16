---
title: schemata/string/UUID.ts
nav_order: 68
parent: Modules
---

## UUID overview

Represents strings that are UUIDs.

This is heavily inspired by the `validator.js` module
[`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [UUID (type alias)](#uuid-type-alias)
  - [UUIDS (type alias)](#uuids-type-alias)
  - [UUIDVersion (type alias)](#uuidversion-type-alias)
- [Schema](#schema)
  - [UUID](#uuid)

---

# Model

## UUID (type alias)

Represents strings that are UUIDs.

**Signature**

```ts
export type UUID<Version extends UUIDVersion> = Branded<string, UUIDBrand<Version>>
```

Added in v1.0.0

## UUIDS (type alias)

**Signature**

```ts
export type UUIDS<Version extends UUIDVersion> = SchemaExt<string, UUID<Version>>
```

Added in v1.0.0

## UUIDVersion (type alias)

**Signature**

```ts
export type UUIDVersion = keyof typeof uuidPattern
```

Added in v1.0.0

# Schema

## UUID

**Signature**

```ts
export declare const UUID: <Version extends 2 | 1 | 4 | 3 | 5 | 'any'>(version: Version) => UUIDS<Version>
```

Added in v1.0.0
