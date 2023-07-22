---
title: schemata/CreditCard.ts
nav_order: 16
parent: Modules
---

## CreditCard overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [CreditCard (type alias)](#creditcard-type-alias)
- [String](#string)
  - [CreditCard](#creditcard)

---

# Model

## CreditCard (type alias)

**Signature**

```ts
export type CreditCard = Branded<CheckDigitVerified, CreditCardBrand>
```

Added in v1.0.0

# String

## CreditCard

Represents a credit card number; currently this should accept Visa, Mastercard,
American Express, Diners Club, Discover, JCB, Rupay, and UnionPay.

**Signature**

```ts
export declare const CreditCard: any
```

Added in v1.0.0