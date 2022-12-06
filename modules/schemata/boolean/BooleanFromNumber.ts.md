---
title: schemata/boolean/BooleanFromNumber.ts
nav_order: 144
parent: Modules
---

## BooleanFromNumber overview

A boolean value whose encoded representation is a number, where 0 is false and 1 is true.

Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
true), but will only _encode_ 0 and 1.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [BooleanS (type alias)](#booleans-type-alias)
- [Schema](#schema)
  - [BooleanFromNumber](#booleanfromnumber)

---

# Model

## BooleanS (type alias)

**Signature**

```ts
export type BooleanS = SchemaExt<number, boolean>
```

Added in v1.0.0

# Schema

## BooleanFromNumber

A boolean value whose encoded representation is a number, where 0 is false and 1 is true.

Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
true), but will only _encode_ 0 and 1.

**Signature**

```ts
export declare const BooleanFromNumber: BooleanS
```

Added in v1.0.0
