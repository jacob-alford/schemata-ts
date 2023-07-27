---
title: schemata/BitcoinAddress.ts
nav_order: 17
parent: schemata
---

## BitcoinAddress overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [BitcoinAddress (type alias)](#bitcoinaddress-type-alias)
- [Pattern](#pattern)
  - [bitcoinAddress](#bitcoinaddress)
- [String](#string)
  - [BitcoinAddress](#bitcoinaddress)

---

# Model

## BitcoinAddress (type alias)

Represents strings which are valid Bitcoin addresses.

**Signature**

```ts
export type BitcoinAddress = Branded<string, BitcoinAddressBrand>
```

Added in v1.0.0

# Pattern

## bitcoinAddress

**Signature**

```ts
export declare const bitcoinAddress: k.Pattern
```

Added in v1.0.0

# String

## BitcoinAddress

Represents strings which are valid Bitcoin addresses.

**Signature**

```ts
export declare const BitcoinAddress: Schema<Opaque<string, BitcoinAddressBrand>, Opaque<string, BitcoinAddressBrand>>
```

Added in v1.0.0
