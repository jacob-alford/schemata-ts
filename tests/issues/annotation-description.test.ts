import * as S from 'schemata-ts'

import { runStandardTestSuite } from '../../test-utils/test-suite'

const Titled = S.Annotate({ title: 'Titled' })(S.String())
const Described = S.Annotate({ description: 'Described' })(S.String())
const Deprecated = S.Annotate({ deprecated: true })(S.String())
const ReadOnly = S.Readonly(S.String())

runStandardTestSuite(Titled, () => ({
  jsonSchema: {
    type: 'string',
    title: 'Titled',
  },
  jsonSchema2007: {
    type: 'string',
    title: 'Titled',
  },
  jsonSchema2020: {
    type: 'string',
    title: 'Titled',
  },
}))()

runStandardTestSuite(Described, () => ({
  jsonSchema: {
    type: 'string',
    description: 'Described',
  },
  jsonSchema2007: {
    type: 'string',
    description: 'Described',
  },
  jsonSchema2020: {
    type: 'string',
    description: 'Described',
  },
}))()

runStandardTestSuite(Deprecated, () => ({
  jsonSchema: {
    type: 'string',
    deprecated: true,
  },
  jsonSchema2007: {
    type: 'string',
    deprecated: true,
  },
  jsonSchema2020: {
    type: 'string',
    deprecated: true,
  },
}))()

runStandardTestSuite(ReadOnly, () => ({
  jsonSchema: {
    type: 'string',
    readOnly: true,
  },
  jsonSchema2007: {
    type: 'string',
    readOnly: true,
  },
  jsonSchema2020: {
    type: 'string',
    readOnly: true,
  },
}))()
