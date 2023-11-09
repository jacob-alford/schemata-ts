---
title: Nullable
nav_order: 61
parent: schemata
---

## Nullable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Nullable](#nullable)

---

# Combinators

## Nullable

Widens a schema to include null and undefined

**Signature**

```ts
export declare const Nullable: <I, O>(
  schema: Schema<I, O>
) => ImplicitOptional & Schema<I | null | undefined, O | null | undefined>
```

Added in v1.0.0
