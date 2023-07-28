---
title: NonEmptyString
nav_order: 54
parent: schemata
---

## NonEmptyString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonEmptyString (type alias)](#nonemptystring-type-alias)
- [String](#string)
  - [NonEmptyString](#nonemptystring)

---

# Model

## NonEmptyString (type alias)

A string with length greater than one

**Signature**

```ts
export type NonEmptyString = Branded<string, NonEmptyStringBrand>
```

Added in v1.0.0

# String

## NonEmptyString

A string with length greater than one

**Signature**

```ts
export declare const NonEmptyString: Schema<Opaque<string, NonEmptyStringBrand>, Opaque<string, NonEmptyStringBrand>>
```

Added in v1.0.0
