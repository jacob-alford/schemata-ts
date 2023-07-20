---
title: schemata/Strict.ts
nav_order: 66
parent: Modules
---

## Strict overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Strict](#strict)

---

# Combinators

## Strict

Same as `Struct` combinator, but disallows additional properties.

**Signature**

```ts
export declare const Strict: <T extends Record<string, any>>(props: T) => any
```

Added in v2.0.0
