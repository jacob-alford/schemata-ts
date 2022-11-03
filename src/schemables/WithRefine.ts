/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { Kind2, URIS2, HKT2 } from 'fp-ts/HKT'
import { Refinement } from 'fp-ts/Refinement'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Enc from 'io-ts/Encoder'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithRefineHKT2<S> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string
  ) => <O>(from: HKT2<S, O, A>) => HKT2<S, O, B>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithRefine1,
} from 'io-ts/Schemable'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithRefine2<S extends URIS2> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string
  ) => <O>(from: Kind2<S, O, A>) => Kind2<S, O, B>
}

export {
  /**
   * @since 1.0.0
   * @category Model
   */
  WithRefine2C,
} from 'io-ts/Schemable'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as Arbitrary,
} from '../internal/ArbitraryBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as Decoder,
} from '../internal/DecoderBase'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithRefine2<Enc.URI> = {
  // @ts-expect-error -- refinement only changes type-level information, but types don't check out here
  refine: () => Enc.id,
}

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as Eq,
} from '../internal/EqBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as Guard,
} from '../internal/GuardBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as TaskDecoder,
} from '../internal/TaskDecoderBase'

export {
  /**
   * @since 1.0.0
   * @category Instances
   */
  WithRefine as Type,
} from '../internal/TypeBase'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithRefine2<SchemaURI> = {
  refine: (refinement, id) => from => SC.make(_ => _.refine(refinement, id)(from(_))),
}
