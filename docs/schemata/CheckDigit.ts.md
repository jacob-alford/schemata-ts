---
title: schemata/CheckDigit.ts
nav_order: 15
parent: Modules
---

## CheckDigit overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [CheckDigit](#checkdigit)

---

# Combinators

## CheckDigit

Verifies a character of a string against a check digit algorithm, useful for ISBNs,
credit cards, and others

**Signature**

```ts
export declare const CheckDigit: (
  algorithm: (s: string) => string,
  location: number | ((s: string) => number)
) => (schema: any) => any
```

Added in v1.0.0
