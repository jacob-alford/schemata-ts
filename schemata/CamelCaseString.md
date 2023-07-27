---
title: schemata/CamelCaseString.ts
nav_order: 24
parent: schemata
---

## CamelCaseString overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [CamelCase (type alias)](#camelcase-type-alias)
- [String](#string)
  - [CamelCaseString](#camelcasestring)

---

# Model

## CamelCase (type alias)

**Signature**

```ts
export type CamelCase = Branded<string, CamelCaseStringBrand>
```

Added in v2.0.0

# String

## CamelCaseString

A schema that converts any string to camel-case

**Signature**

```ts
export declare const CamelCaseString: (params?: StringParams | undefined) => Schema<CamelCase>
```

Added in v2.0.0
