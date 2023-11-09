---
title: Optional
nav_order: 64
parent: schemata
---

## Optional overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Optional](#optional)

---

# Combinators

## Optional

A schema that widens a schema to include `undefined`. Also marks the input property of
a struct as optional.

Optional property `fallbackInput` is used to provide a default value for transcoders
and json-schemas.

**Signature**

```ts
export declare const Optional: <I, O, Fallback extends I | undefined = undefined>(
  target: Schema<I, O>,
  fallbackInput?: Fallback | undefined
) => Fallback extends undefined
  ? ImplicitOptional & Schema<I | undefined, O | undefined>
  : ImplicitOptional & Schema<I | undefined, O>
```

Added in v1.0.0
