import type { AttributePrimitive } from "./attribute-primitive";

/**
 * Describes an attribute.
 */
export type AttributeSetItem = {
  /**
   * The primitive type of the attribute within the array buffer.
   */
  readonly attributePrimitive: keyof AttributePrimitive;

  /**
   * The primitive type of the attribute within the shader.
   */
  readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;
};
