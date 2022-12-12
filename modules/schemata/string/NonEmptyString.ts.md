---
title: schemata/string/NonEmptyString.ts
nav_order: 185
parent: Modules
---

## NonEmptyString overview

A string with length greater than one

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NonEmptyString (type alias)](#nonemptystring-type-alias)
  - [NonEmptyStringS (type alias)](#nonemptystrings-type-alias)
- [Schema](#schema)
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

## NonEmptyStringS (type alias)

**Signature**

```ts
export type NonEmptyStringS = SchemaExt<string, NonEmptyString>
```

Added in v1.0.0

# Schema

## NonEmptyString

A string with length greater than one

**Signature**

```ts
export declare const NonEmptyString: NonEmptyStringS
```

Added in v1.0.0
