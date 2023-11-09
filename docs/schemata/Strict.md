---
title: Strict
nav_order: 81
parent: schemata
---

## Strict overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [~~Strict~~](#strict)

---

# Combinators

## ~~Strict~~

Same as `Struct` combinator, but disallows additional properties.

**Signature**

```ts
export declare const Strict: <T extends Record<string, Schema<any, any>>>(
  props: T
) => Schema<
  {
    [KeyType in keyof (RequiredInputProps<T> & OptionalInputProps<T>)]: (RequiredInputProps<T> &
      OptionalInputProps<T>)[KeyType]
  },
  { [KeyType in keyof OutputProps<T>]: OutputProps<T>[KeyType] }
>
```

Added in v2.0.0
