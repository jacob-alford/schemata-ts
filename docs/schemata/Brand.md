---
title: Brand
nav_order: 21
parent: schemata
---

## Brand overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Brand](#brand)

---

# Combinators

## Brand

A schema for branding an inner schema

**Signature**

```ts
export declare const Brand: <Brand>() => <I, O>(inner: Schema<I, O>) => Schema<Opaque<I, Brand>, Opaque<O, Brand>>
```

Added in v1.0.0
