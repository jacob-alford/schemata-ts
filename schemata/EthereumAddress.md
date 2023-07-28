---
title: EthereumAddress
nav_order: 33
parent: schemata
---

## EthereumAddress overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [EthereumAddress (type alias)](#ethereumaddress-type-alias)
- [Pattern](#pattern)
  - [ethereumAddress](#ethereumaddress)
- [String](#string)
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

## ethereumAddress

**Signature**

```ts
export declare const ethereumAddress: k.Pattern
```

Added in v1.0.0

# String

## EthereumAddress

Represents strings which are valid Ethereum addresses.

**Signature**

```ts
export declare const EthereumAddress: Schema<Opaque<string, EthereumAddressBrand>, Opaque<string, EthereumAddressBrand>>
```

Added in v1.0.0
