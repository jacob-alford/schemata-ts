---
title: schemables/WithCheckDigit/instances/schema.ts
nav_order: 35
parent: Modules
---

## schema overview

Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Schema](#schema)

---

# Combinators

## Schema

**Signature**

```ts
export declare const Schema: (
  algorithm: (s: string) => string,
  location: number | ((s: string) => number)
) => <O>(schema: SC.SchemaExt<O, string>) => SC.SchemaExt<O, Branded<string, CheckDigitVerified>>
```

Added in v1.0.0
