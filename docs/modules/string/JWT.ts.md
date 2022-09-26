---
title: string/JWT.ts
nav_order: 22
parent: Modules
---

## JWT overview

A valid, Base64-encoded JWT.

Inspired by validator.js' [JWT
module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).

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
  - [JWT (type alias)](#jwt-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isJWT](#isjwt)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, JWT>
```

Added in v0.0.2

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<JWT>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, JWT>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, JWT>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<JWT>
```

Added in v0.0.2

# Model

## JWT (type alias)

A valid, Base64-encoded JWT.

Inspired by validator.js' [JWT
module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).

**Signature**

```ts
export type JWT = string & JWTBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, JWT>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, JWT>
```

Added in v0.0.2

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, JWT>
```

Added in v0.0.2

# Refinements

## isJWT

**Signature**

```ts
export declare const isJWT: (s: string) => s is JWT
```

Added in v0.0.2