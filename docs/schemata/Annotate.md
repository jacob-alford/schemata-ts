---
title: Annotate
nav_order: 12
parent: schemata
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
declaration of the primary schema. This is because mutual-recursion for json-schema is
implemented as a ref, and that ref must be specified in the parent using `Annotate`

**Signature**

```ts
export declare const Annotate: <Refs extends Readonly<Record<string, Schema<any, any>>>>(params: {
  readonly title?: string | undefined
  readonly description?: string | undefined
  readonly references?: Refs | undefined
  readonly typeString?: string | readonly [string, string] | undefined
  readonly readOnly?: boolean | undefined
  readonly deprecated?: boolean | undefined
}) => <O, A>(schema: Schema<O, A>) => Schema<O, A>
```

Added in v1.2.0
