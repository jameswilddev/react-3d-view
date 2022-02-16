import type { AttributeSet } from "./attribute-set";
import type { ShaderPrimitive } from "./shader-primitive";

/**
 * A single instance of the data described by an attribute set.
 * @template TAttributeSet The attribute set of which an instance has been defined.
 */
export type AttributeValue<TAttributeSet extends AttributeSet> = {
  readonly /**
   * The attributes defined.
   */
  [TKey in keyof TAttributeSet]: ReadonlyArray<
    ShaderPrimitive[TAttributeSet[TKey][`shaderPrimitive`]]
  > & { readonly length: TAttributeSet[TKey][`quantity`] };
};
