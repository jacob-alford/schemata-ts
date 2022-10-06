---
title: string/BigIntString.ts
nav_order: 22
parent: Modules
---

## BigIntString overview

Represents strings which can be converted into `BitInt`.

Added in v0.0.4

---

<h2 class="text-delta">Table of contents</h2>

- [Destructors](#destructors)
  - [toBigInt](#tobigint)
- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [Decoder](#decoder)
  - [Encoder](#encoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [BigIntString (type alias)](#bigintstring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isBigIntString](#isbigintstring)

---

# Destructors

## toBigInt

**Signature**

```ts
export declare const toBigInt: (n: BigIntString) => bigint
```

Added in v0.0.1

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<BigIntString>
```

Added in v0.0.4

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, BigIntString>
```

Added in v0.0.4

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, BigIntString>
```

Added in v0.0.4

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<BigIntString>
```

Added in v0.0.4

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, BigIntString>
```

Added in v0.0.4

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, BigIntString>
```

Added in v0.0.4

## Type

**Signature**

```ts
export declare const Type: t.Type<BigIntString>
```

Added in v0.0.4

# Model

## BigIntString (type alias)

Represents strings which can be converted into `BitInt`

**Signature**

```ts
export type BigIntString = string & BigIntStringBrand
```

Added in v0.0.4

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, BigIntString>
```

Added in v0.0.4

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, BigIntString>
```

Added in v0.0.4

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, BigIntString>
```

Added in v0.0.4

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, BigIntString>
```

Added in v0.0.4

# Refinements

## isBigIntString

**Signature**

```ts
export declare const isBigIntString: (s: string) => s is BigIntString
```

Added in v0.0.4
