---
title: string/creditCard.ts
nav_order: 28
parent: Modules
---

## creditCard overview

Represents (some) valid credit card numbers.

At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
Discover, and JCB.

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
  - [CreditCard (type alias)](#creditcard-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2 (type alias)](#schemableparams2-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isCreditCard](#iscreditcard)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: Arb.Arbitrary<CreditCard>
```

Added in v0.0.3

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, CreditCard>
```

Added in v0.0.3

## Encoder

**Signature**

```ts
export declare const Encoder: Enc.Encoder<string, CreditCard>
```

Added in v0.0.3

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<CreditCard>
```

Added in v0.0.3

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, CreditCard>
```

Added in v0.0.3

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, CreditCard>
```

Added in v0.0.3

## Type

**Signature**

```ts
export declare const Type: t.Type<CreditCard>
```

Added in v0.0.3

# Model

## CreditCard (type alias)

Represents (some) valid credit card numbers.

At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
Discover, and JCB.

**Signature**

```ts
export type CreditCard = string & CreditCardBrand
```

Added in v0.0.3

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT2<S, string, CreditCard>
```

Added in v0.0.3

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, CreditCard>
```

Added in v0.0.3

## SchemableParams2 (type alias)

**Signature**

```ts
export type SchemableParams2<S extends URIS2> = Kind2<S, string, CreditCard>
```

Added in v0.0.3

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, CreditCard>
```

Added in v0.0.3

# Refinements

## isCreditCard

**Signature**

```ts
export declare const isCreditCard: (s: string) => s is CreditCard
```

Added in v0.0.3
