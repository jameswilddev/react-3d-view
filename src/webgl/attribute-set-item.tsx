import type { AttributePrimitive } from "./attribute-primitive";
import type { ShaderPrimitive } from "./shader-primitive";

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
  readonly shaderPrimitive: keyof ShaderPrimitive;

  /**
   * When 1, the attribute is NOT an array.  When greater than 1, the attribute is an array of the specified length.
   */
  readonly quantity: number;
};
