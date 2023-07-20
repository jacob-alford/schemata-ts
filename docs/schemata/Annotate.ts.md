---
title: schemata/Annotate.ts
nav_order: 1
parent: Modules
---

## Annotate overview

Added in v1.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Annotate](#annotate)

---

# Combinators

## Annotate

Annotate a Json Schema with title, description, and references.

Note: references must be specified for all "Lazy" schemas, and must occur after the
declaration of the primary schema. This is because Lazy for json-schema is implemented
as a ref, and that ref must be specified in the parent using `Annotate`

**Signature**

```ts
export declare const Annotate: <Refs extends Readonly<Record<string, any>>>(params: {
  readonly title?: string | undefined
  readonly description?: string | undefined
  readonly references?: Refs | undefined
  readonly typeString?: string | readonly [string, string] | undefined
  readonly readOnly?: boolean | undefined
}) => <O, A>(schema: any) => any
```

Added in v1.2.0
