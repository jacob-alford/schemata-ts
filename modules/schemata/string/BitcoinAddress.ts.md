---
title: schemata/string/BitcoinAddress.ts
nav_order: 177
parent: Modules
---

## BitcoinAddress overview

Represents strings which are valid Bitcoin addresses.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [BitcoinAddress (type alias)](#bitcoinaddress-type-alias)
- [Pattern](#pattern)
  - [BitcoinAddressS (type alias)](#bitcoinaddresss-type-alias)
  - [bitcoinAddress](#bitcoinaddress)
- [Schema](#schema)
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

## BitcoinAddressS (type alias)

**Signature**

```ts
export type BitcoinAddressS = SchemaExt<string, BitcoinAddress>
```

Added in v1.0.0

## bitcoinAddress

**Signature**

```ts
export declare const bitcoinAddress: PB.Pattern
```

Added in v1.0.0

# Schema

## BitcoinAddress

Represents strings which are valid Bitcoin addresses.

**Signature**

```ts
export declare const BitcoinAddress: BitcoinAddressS
```

Added in v1.0.0
