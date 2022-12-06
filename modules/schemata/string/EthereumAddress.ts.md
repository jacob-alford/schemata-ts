---
title: schemata/string/EthereumAddress.ts
nav_order: 168
parent: Modules
---

## EthereumAddress overview

Represents strings which are valid Ethereum addresses.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [EthereumAddress (type alias)](#ethereumaddress-type-alias)
- [Pattern](#pattern)
  - [EthereumAddressS (type alias)](#ethereumaddresss-type-alias)
  - [ethereumAddress](#ethereumaddress)
- [Schema](#schema)
  - [EthereumAddress](#ethereumaddress)

---

# Model

## EthereumAddress (type alias)

Represents strings which are valid Ethereum addresses.

**Signature**

```ts
export type EthereumAddress = Branded<string, EthereumAddressBrand>
```

Added in v1.0.0

# Pattern

## EthereumAddressS (type alias)

**Signature**

```ts
export type EthereumAddressS = SchemaExt<string, EthereumAddress>
```

Added in v1.0.0

## ethereumAddress

**Signature**

```ts
export declare const ethereumAddress: PB.Pattern
```

Added in v1.0.0

# Schema

## EthereumAddress

Represents strings which are valid Ethereum addresses.

**Signature**

```ts
export declare const EthereumAddress: EthereumAddressS
```

Added in v1.0.0
