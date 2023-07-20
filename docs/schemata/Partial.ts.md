---
title: schemata/Partial.ts
nav_order: 57
parent: Modules
---

## Partial overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Partial](#partial)

---

# Combinators

## Partial

Used to construct a struct schema with enumerated keys where any number of known keys
are permitted.

**Signature**

```ts
export declare const Partial: <T extends Record<string, any>>(props: T, extraProps?: 'strip' | 'error') => any
```

Added in v1.0.0
