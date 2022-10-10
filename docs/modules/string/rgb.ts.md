---
title: string/rgb.ts
nav_order: 41
parent: Modules
---

## rgb overview

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

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
  - [RGB (type alias)](#rgb-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isRGB](#isrgb)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<RGB>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, RGB>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, RGB>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<RGB>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, RGB>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, RGB>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<RGB>
```

Added in v0.0.4

# Model

## RGB (type alias)

Represents strings which are valid RGB colors. Permits both absolute and percentage based values.

**Signature**

```ts
export type RGB = string & RGBBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, RGB>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, RGB>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, RGB>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, RGB>
```

Added in v0.0.4

# Refinements

## isRGB

**Signature**

```ts
export declare const isRGB: (s: string) => s is RGB
```

Added in v0.0.4
