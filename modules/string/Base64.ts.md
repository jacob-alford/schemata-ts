---
title: string/Base64.ts
nav_order: 15
parent: Modules
---

## Base64 overview

Representing a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

This module is heavily inspired by the `validator.js` module
[`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).

Added in v0.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [Base64 (type alias)](#base64-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isBase64](#isbase64)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, Base64>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<Base64>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, Base64>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, Base64>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<Base64>
```

Added in v0.0.2

# Model

## Base64 (type alias)

Representing a Base64-encoded string.

For a URL-safe version, @see Base64Url module.

Heavily inspired by the `validator.js` module
[`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).

**Signature**

```ts
export type Base64 = string & Base64Brand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, Base64>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, Base64>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Base64>
```

Added in v0.0.2

# Refinements

## isBase64

**Signature**

```ts
export declare const isBase64: (s: string) => s is Base64
```

Added in v0.0.2
