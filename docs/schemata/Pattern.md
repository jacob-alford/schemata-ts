---
title: Pattern
nav_order: 68
parent: schemata
---

## Pattern overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Pattern](#pattern)

---

# Combinators

## Pattern

A schema for describing the structure of a string using patterns

**Signature**

```ts
export declare const Pattern: (
  pattern: k.Pattern,
  name: string | readonly [string, string],
  caseSensitive?: boolean | undefined
) => Schema<string, string>
```

Added in v1.0.0
