---
title: schemata/DateFromUnixTime.ts
nav_order: 31
parent: schemata
---

## DateFromUnixTime overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [DateFromUnixTime](#datefromunixtime)
- [utils](#utils)
  - [MaxUnixTime (type alias)](#maxunixtime-type-alias)
  - [MinUnixTime (type alias)](#minunixtime-type-alias)
  - [maxUnixTime](#maxunixtime)
  - [minUnixTime](#minunixtime)

---

# Conversion

## DateFromUnixTime

Represents Date objects derived from unix time.

**Signature**

```ts
export declare const DateFromUnixTime: Schema<
  Opaque<number, FloatBrand<-8640000000000, 8640000000000>>,
  Opaque<Date, { readonly SafeDate: unique symbol }>
>
```

Added in v1.0.0

# utils

## MaxUnixTime (type alias)

**Signature**

```ts
export type MaxUnixTime = 8_640_000_000_000
```

Added in v2.0.0

## MinUnixTime (type alias)

**Signature**

```ts
export type MinUnixTime = -8_640_000_000_000
```

Added in v2.0.0

## maxUnixTime

**Signature**

```ts
export declare const maxUnixTime: 8640000000000
```

Added in v2.0.0

## minUnixTime

**Signature**

```ts
export declare const minUnixTime: -8640000000000
```

Added in v2.0.0
