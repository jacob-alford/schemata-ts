---
title: schemata/string/LatLong.ts
nav_order: 59
parent: Modules
---

## LatLong overview

Representing a Lat/Long coordinate.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [LatLong (type alias)](#latlong-type-alias)
  - [LatLongS (type alias)](#latlongs-type-alias)
- [Pattern](#pattern)
  - [LatLongPattern](#latlongpattern)
- [Schema](#schema)
  - [LatLong](#latlong)

---

# Model

## LatLong (type alias)

Representing a Lat/Long coordinate.

**Signature**

```ts
export type LatLong = Branded<string, LatLongBrand>
```

Added in v1.0.0

## LatLongS (type alias)

**Signature**

```ts
export type LatLongS = SchemaExt<string, LatLong>
```

Added in v1.0.0

# Pattern

## LatLongPattern

**Signature**

```ts
export declare const LatLongPattern: PB.Pattern
```

Added in v1.0.0

# Schema

## LatLong

Representing a Lat/Long coordinate.

**Signature**

```ts
export declare const LatLong: LatLongS
```

Added in v1.0.0
