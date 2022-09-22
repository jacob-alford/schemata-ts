---
title: string/ISODateString.ts
nav_order: 22
parent: Modules
---

## ISODateString overview

Represents strings that conform to the ISO 8601 standard.

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromDate](#fromdate)
- [Destructors](#destructors)
  - [toSafeDate](#tosafedate)
- [Instances](#instances)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [ISODate (type alias)](#isodate-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isISODate](#isisodate)

---

# Constructors

## fromDate

**Signature**

```ts
export declare const fromDate: (d: Date) => O.Option<ISODate>
```

Added in v0.0.1

# Destructors

## toSafeDate

**Signature**

```ts
export declare const toSafeDate: (iso: ISODate) => SafeDate
```

Added in v0.0.1

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, ISODate>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, ISODate>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<ISODate>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, ISODate>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, ISODate>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<ISODate>
```

Added in v0.0.1

# Model

## ISODate (type alias)

Represents strings that conform to the ISO 8601 standard.

**Signature**

```ts
export type ISODate = string & ISODateBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, ISODate>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, ISODate>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, ISODate>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, ISODate>
```

Added in v0.0.1

# Refinements

## isISODate

**Signature**

```ts
export declare function isISODate(s: string): s is ISODate
```

Added in v0.0.1
