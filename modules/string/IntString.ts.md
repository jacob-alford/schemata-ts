---
title: string/IntString.ts
nav_order: 25
parent: Modules
---

## IntString overview

Integer branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [toInt](#toint)
- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [IntString (type alias)](#intstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isIntString](#isintstring)

---

# Destructors

## toInt

**Signature**

```ts
export declare const toInt: (s: IntString) => Int.Int
```

Added in v0.0.1

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<IntString>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, IntString>
```

Added in v0.0.1

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, IntString>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<IntString>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, IntString>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, IntString>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<IntString>
```

Added in v0.0.1

# Model

## IntString (type alias)

Integer branded newtype.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type IntString = string & IntStringBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, IntString>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, IntString>
```

Added in v0.0.1

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, IntString>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, IntString>
```

Added in v0.0.1

# Refinements

## isIntString

**Signature**

```ts
export declare const isIntString: (n: string) => n is IntString
```

Added in v0.0.1
