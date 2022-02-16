import type { ShaderPrimitive } from "./shader-primitive";

/**
 * Describes a set of variables, e.g. the attributes or uniforms fed into a shader program.
 */
export type VariableSet = {
  /**
   * Maps the names of the variables to their type information.
   */
  readonly [key: string]: {
    /**
     * The primitive type of the variable within the shader.
     */
    readonly shaderPrimitive: keyof ShaderPrimitive;

    /**
     * When 1, the variable is NOT an array.  When greater than 1, the variable is an array of the specified length.
     */
    readonly quantity: number;
  };
};
