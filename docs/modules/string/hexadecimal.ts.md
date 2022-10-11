---
title: string/hexadecimal.ts
nav_order: 29
parent: Modules
---

## hexadecimal overview

A string of hexadecimal characters.

Inspired by
[isHexadecimal](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexadecimal.js)

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
  - [Hexadecimal (type alias)](#hexadecimal-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isHexadecimal](#ishexadecimal)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<Hexadecimal>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, Hexadecimal>
```

Added in v0.0.3

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, Hexadecimal>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<Hexadecimal>
```

Added in v0.0.3

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, Hexadecimal>
```

Added in v0.0.3

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, Hexadecimal>
```

Added in v0.0.3

## Type

**Signature**

```ts
export declare const Type: t.Type<Hexadecimal>
```

Added in v0.0.3

# Model

## Hexadecimal (type alias)

A string of hexadecimal characters.

Inspired by
[isHexadecimal](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexadecimal.js)

**Signature**

```ts
export type Hexadecimal = string & HexadecimalBrand
```

Added in v0.0.3

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, Hexadecimal>
```

Added in v0.0.3

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, Hexadecimal>
```

Added in v0.0.3

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, Hexadecimal>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Hexadecimal>
```

Added in v0.0.3

# Refinements

## isHexadecimal

**Signature**

```ts
export declare const isHexadecimal: (s: string) => s is Hexadecimal
```

Added in v0.0.3
