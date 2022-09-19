---
title: string/ASCII.ts
nav_order: 13
parent: Modules
---

## ASCII overview

A string in which every character is valid ASCII.

- This is heavily inspired by the `validator.js` module
  [`isAscii`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isAscii.js).

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [ASCII (type alias)](#ascii-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isAscii](#isascii)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, ASCII>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<ASCII>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, ASCII>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, ASCII>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<ASCII>
```

Added in v0.0.1

# Model

## ASCII (type alias)

Represents strings that contain only valid ASCII characters.

**Signature**

```ts
export type ASCII = string & ASCIIBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, ASCII>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, ASCII>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, ASCII>
```

Added in v0.0.1

# Refinements

## isAscii

**Signature**

```ts
export declare const isAscii: (s: string) => s is ASCII
```

Added in v0.0.1
