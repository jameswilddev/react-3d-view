import type { AttributeSet } from "./attribute-set";
import type { AttributeValue } from "./attribute-value";
import type { Context } from "./context";
import { VertexBuffer } from "./vertex-buffer";

/**
 * A static buffer of vertex attributes.
 * @template TAttributeSet The attribute set contained within the vertex buffer.
 */
export class StaticVertexBuffer<
  TAttributeSet extends AttributeSet
> extends VertexBuffer<TAttributeSet> {
  /**
   * Creates a new static buffer of vertex attributes.
   * @param context The context under which the buffer will be created.
   * @param attributeSet The attribute contained within the vertex buffer.
   * @param attributeValues The static attribute values.
   */
  constructor(
    context: Context,
    attributeSet: AttributeSet,
    private readonly attributeValues: ReadonlyArray<
      AttributeValue<TAttributeSet>
    >
  ) {
    super(context, attributeSet);
  }

  protected generateVertices() {
    return this.attributeValues;
  }
}
