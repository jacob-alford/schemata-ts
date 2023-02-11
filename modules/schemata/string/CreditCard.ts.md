---
title: schemata/string/CreditCard.ts
nav_order: 53
parent: Modules
---

## CreditCard overview

Represents (some) valid credit card numbers.

At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
Discover, and JCB.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [CreditCard (type alias)](#creditcard-type-alias)
- [Pattern](#pattern)
  - [creditCard](#creditcard)
- [Schema](#schema)
  - [CreditCard](#creditcard)

---

# Model

## CreditCard (type alias)

**Signature**

```ts
export type CreditCard = Branded<string, CreditCardBrand>
```

Added in v1.0.0

# Pattern

## creditCard

**Signature**

```ts
export declare const creditCard: PB.Pattern
```

Added in v1.0.0

# Schema

## CreditCard

Represents a credit card number; currently this should accept Visa, Mastercard,
American Express, Diners Club, Discover, JCB, Rupay, and UnionPay.

**Signature**

```ts
export declare const CreditCard: SchemaExt<string, Branded<Branded<string, CheckDigitVerified>, CreditCardBrand>>
```

Added in v1.0.0
