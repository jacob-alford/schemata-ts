---
title: schemata/CamelCaseKeys.ts
nav_order: 12
parent: Modules
---

## CamelCaseKeys overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [CamelCaseKeys](#camelcasekeys)

---

# Combinators

## CamelCaseKeys

The same as the `Struct` schema combinator, but keys are transformed to camel case in
the output type.

**Warning** It is possible to have one or more input keys map to the same output key.
This combination will produce unlawful instances.

**Signature**

```ts
export declare const CamelCaseKeys: <T extends Record<string, any>>(
  props: T,
  extraProps?: 'strip' | 'error' | undefined,
  mergeStrategy?: 'first' | 'last' | undefined
) => any
```

Added in v1.4.0
