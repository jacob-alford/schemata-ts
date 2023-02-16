---
title: schemata/generic/OptionFromUndefined.ts
nav_order: 40
parent: Modules
---

## OptionFromUndefined overview

Represents an optional type which encodes to / decodes from undefined

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [OptionFromUndefinedS (type alias)](#optionfromundefineds-type-alias)
- [Schema](#schema)
  - [OptionFromUndefined](#optionfromundefined)

---

# Model

## OptionFromUndefinedS (type alias)

**Signature**

```ts
export type OptionFromUndefinedS = <A, O>(sA: SchemaExt<O, A>) => SchemaExt<O | undefined, O.Option<A>>
```

Added in v1.0.0

# Schema

## OptionFromUndefined

Represents an optional type which encodes to / decodes from undefined

**Signature**

```ts
export declare const OptionFromUndefined: OptionFromUndefinedS
```

Added in v1.0.0
