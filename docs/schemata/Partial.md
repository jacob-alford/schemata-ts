---
title: Partial
nav_order: 68
parent: schemata
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
export declare const Partial: <T extends Record<string, Schema<any, any>>>(
  props: T,
  extraProps?: 'strip' | 'error'
) => Schema<
  {
    [KeyType in keyof Partial<RequiredInputProps<T> & OptionalInputProps<T>>]: Partial<
      RequiredInputProps<T> & OptionalInputProps<T>
    >[KeyType]
  },
  { [KeyType in keyof PartialOutputProps<T>]: PartialOutputProps<T>[KeyType] }
>
```

Added in v1.0.0
