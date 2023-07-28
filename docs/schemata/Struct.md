---
title: Struct
nav_order: 78
parent: schemata
---

## Struct overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Struct](#struct)

---

# Combinators

## Struct

Used to construct a struct schema with enumerated keys.

**Note:** Index signatures must accomodate the input/output types for all other
enumerated keys. It will decode properly otherwise, but TypeScript will not permit
construction of such a type

**Signature**

```ts
export declare const Struct: <
  T extends Record<string, Schema<any, any>>,
  IndexSignature extends Schema<any, any> | undefined
>(
  props: T,
  extraProps?: IndexSignature | 'strip' | 'error'
) => Schema<
  {
    [KeyType in keyof (RestInput<IndexSignature> &
      RequiredInputProps<T> &
      OptionalInputProps<T>)]: (RestInput<IndexSignature> & RequiredInputProps<T> & OptionalInputProps<T>)[KeyType]
  },
  {
    [KeyType in keyof (RestOutput<IndexSignature> & OutputProps<T>)]: (RestOutput<IndexSignature> &
      OutputProps<T>)[KeyType]
  }
>
```

Added in v1.0.0
