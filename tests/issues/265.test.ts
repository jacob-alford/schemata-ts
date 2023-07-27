import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../../test-utils/test-suite'

// See issue #265

const AnnotatedOptionalStruct = pipe(
  S.Optional(S.Struct({ field: S.String() })),
  S.Annotate({
    title: 'Annotated optional struct',
    description: 'Description of the annotated optional struct',
  }),
)

const ExampleSchema = S.Struct({
  annotatedOptionalStruct: AnnotatedOptionalStruct,
})

runStandardTestSuite(ExampleSchema, () => ({
  jsonSchema: JS.struct({
    annotatedOptionalStruct: JS.annotate({
      title: 'Annotated optional struct',
      description: 'Description of the annotated optional struct',
    })(
      JS.struct(
        {
          field: JS.string(),
        },
        ['field'],
      ),
    ),
  }),
}))()
