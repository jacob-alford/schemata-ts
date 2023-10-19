---
title: Class
nav_order: 26
parent: schemata
---

## Class overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Class](#class)

---

# Combinators

## Class

A schema combinator which transforms the output type of a schema to a specified class

**Signature**

```ts
export declare const Class: <T, O>(
  constructor: new (...args: ReadonlyArray<any>) => T,
  toClass: (output: O) => T,
  fromClass: (class_: T) => O
) => <I>(schema: Schema<I, O>) => Schema<I, T>
```

Added in v2.2.0
