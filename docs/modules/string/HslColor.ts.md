---
title: string/HslColor.ts
nav_order: 30
parent: Modules
---

## HslColor overview

An HSL string. Commonly in CSS.

**Example**

```ts
import { Guard } from 'schemable-ts-types/string/HslColor'

const hue = 270
const saturation = 60
const lightness = 70
const alpha = 0.7

const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`

assert.equal(Guard.is(hslString), true)
```

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
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isHslColor](#ishslcolor)
- [utils](#utils)
  - [HslColor (type alias)](#hslcolor-type-alias)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<HslColor>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, HslColor>
```

Added in v0.0.3

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, HslColor>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<HslColor>
```

Added in v0.0.3

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, HslColor>
```

Added in v0.0.3

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, HslColor>
```

Added in v0.0.3

## Type

**Signature**

```ts
export declare const Type: t.Type<HslColor>
```

Added in v0.0.3

# Model

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, HslColor>
```

Added in v0.0.3

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, HslColor>
```

Added in v0.0.3

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, HslColor>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, HslColor>
```

Added in v0.0.3

# Refinements

## isHslColor

**Signature**

```ts
export declare const isHslColor: (s: string) => s is HslColor
```

Added in v0.0.3

# utils

## HslColor (type alias)

An HSL string. Commonly in CSS.

**Signature**

```ts
export type HslColor = string & HslColorBrand
```

**Example**

```ts
import { Guard } from 'schemable-ts-types/string/HslColor'

const hue = 270
const saturation = 60
const lightness = 70
const alpha = 0.7

const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`

assert.equal(Guard.is(hslString), true)
```

Added in v0.0.3
