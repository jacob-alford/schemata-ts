---
title: Either
nav_order: 32
parent: schemata
---

## Either overview

Added in v2.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Either](#either)

---

# Combinators

## Either

The fp-ts Either type as a schemata-ts schema.

**Signature**

```ts
export declare const Either: <EI, EO, AI, AO>(
  left: Schema<EI, EO>,
  right: Schema<AI, AO>
) => Schema<{ readonly _tag: 'Left'; left: EI } | { readonly _tag: 'Right'; right: AI }, Either_<EO, AO>>
```

Added in v2.1.0
