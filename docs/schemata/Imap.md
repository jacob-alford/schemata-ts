---
title: schemata/Imap.ts
nav_order: 39
parent: schemata
---

## Imap overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Mapping](#mapping)
  - [Imap](#imap)

---

# Mapping

## Imap

A Schema that maps the output type of another Schema. Guard is not invariant, and
`Imap` requires an explicit guard for the output type.

**Signature**

```ts
export declare const Imap: <A, B>(
  targetGuard: G.Guard<B>,
  f: (a: A) => B,
  g: (b: B) => A,
  newName?: string | undefined
) => <I>(target: Schema<I, A>) => Schema<I, B>
```

Added in v1.0.0
