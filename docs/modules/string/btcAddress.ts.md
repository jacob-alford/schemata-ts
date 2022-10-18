---
title: string/btcAddress.ts
nav_order: 27
parent: Modules
---

## btcAddress overview

Represents strings which are valid Bitcoin addresses.

This is heavily inspired by the `validator.js` module
[`isBtcAddress`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBtcAddress.js).

Added in v0.0.2

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
  - [BtcAddress (type alias)](#btcaddress-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isBtcAddress](#isbtcaddress)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<BtcAddress>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, BtcAddress>
```

Added in v0.0.2

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, BtcAddress>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<BtcAddress>
```

Added in v0.0.2

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, BtcAddress>
```

Added in v0.0.2

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, BtcAddress>
```

Added in v0.0.2

## Type

**Signature**

```ts
export declare const Type: t.Type<BtcAddress>
```

Added in v0.0.2

# Model

## BtcAddress (type alias)

Represents strings which are valid Bitcoin addresses.

This is heavily inspired by the `validator.js` module
[`isBtcAddress`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBtcAddress.js).

**Signature**

```ts
export type BtcAddress = string & BtcAddressBrand
```

Added in v0.0.2

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, BtcAddress>
```

Added in v0.0.2

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, BtcAddress>
```

Added in v0.0.2

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, BtcAddress>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, BtcAddress>
```

Added in v0.0.2

# Refinements

## isBtcAddress

**Signature**

```ts
export declare const isBtcAddress: (s: string) => s is BtcAddress
```

Added in v0.0.2
