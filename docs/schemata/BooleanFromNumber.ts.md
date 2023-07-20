---
title: schemata/BooleanFromNumber.ts
nav_order: 9
parent: Modules
---

## BooleanFromNumber overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [BooleanFromNumber](#booleanfromnumber)

---

# Conversion

## BooleanFromNumber

A boolean value whose encoded representation is a number, where 0 is false and 1 is true.

Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
true), but will only _encode_ 0 and 1.

**Signature**

```ts
export declare const BooleanFromNumber: any
```

Added in v1.0.0
