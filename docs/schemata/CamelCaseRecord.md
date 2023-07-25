---
title: schemata/CamelCaseRecord.ts
nav_order: 23
parent: schemata
---

## CamelCaseRecord overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [CamelCaseRecord](#camelcaserecord)

---

# Combinators

## CamelCaseRecord

A record combinator which converts the keys of a record to camel case.

**Signature**

```ts
export declare const CamelCaseRecord: <I, O>(
  codomain: Schema<I, O>,
  mergeStrategy?: MergeStrategy | undefined
) => Schema<
  Readonly<Record<Opaque<string, CamelCaseStringBrand>, I>>,
  Readonly<Record<Opaque<string, CamelCaseStringBrand>, O>>
>
```

Added in v2.0.0
