import type { ShaderPrimitive } from "./shader-primitive";

/**
 * Describes a variable, e.g. an attribute or uniform, fed into a shader program.
 */
export type VariableSetItem = {
  /**
   * The primitive type of the variable within the shader.
   */
  readonly shaderPrimitive: keyof ShaderPrimitive;

  /**
   * When 1, the variable is NOT an array.  When greater than 1, the variable is an array of the specified length.
   */
  readonly quantity: number;
};
