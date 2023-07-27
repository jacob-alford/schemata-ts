---
title: schemata/LatLong.ts
nav_order: 45
parent: schemata
---

## LatLong overview

Representing a Lat/Long coordinate.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [LatLong (type alias)](#latlong-type-alias)
- [String](#string)
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

# String

## LatLong

Represents a Lat/Long coordinate.

**Signature**

```ts
export declare const LatLong: Schema<Opaque<string, LatLongBrand>, Opaque<string, LatLongBrand>>
```

Added in v1.0.0
