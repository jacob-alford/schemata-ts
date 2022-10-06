---
title: string/HexColor.ts
nav_order: 28
parent: Modules
---

## HexColor overview

A valid hexadecimal color value.

Inspired by
[isHexColor](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexColor.js)

Added in v0.0.3

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
  - [HexColor (type alias)](#hexcolor-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isHexColor](#ishexcolor)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<HexColor>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, HexColor>
```

Added in v0.0.3

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, HexColor>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<HexColor>
```

Added in v0.0.3

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, HexColor>
```

Added in v0.0.3

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, HexColor>
```

Added in v0.0.3

## Type

**Signature**

```ts
export declare const Type: t.Type<HexColor>
```

Added in v0.0.3

# Model

## HexColor (type alias)

A valid hexadecimal color value.

Inspired by
[isHexColor](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexColor.js)

**Signature**

```ts
export type HexColor = string & HexColorBrand
```

Added in v0.0.3

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, HexColor>
```

Added in v0.0.3

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, HexColor>
```

Added in v0.0.3

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, HexColor>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, HexColor>
```

Added in v0.0.3

# Refinements

## isHexColor

**Signature**

```ts
export declare const isHexColor: (s: string) => s is HexColor
```

Added in v0.0.3
