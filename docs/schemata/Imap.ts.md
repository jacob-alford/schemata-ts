---
title: schemata/Imap.ts
nav_order: 29
parent: Modules
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
  targetGuard: any,
  f: (a: A) => B,
  g: (b: B) => A,
  newName?: string | undefined
) => <I>(target: any) => any
```

Added in v1.0.0
