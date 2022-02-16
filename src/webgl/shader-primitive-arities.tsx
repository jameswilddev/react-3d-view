import type { ShaderPrimitive } from "./shader-primitive";

/**
 * Maps shader primitive names to their arities (vec3 = 3, etc.).
 */
export const shaderPrimitiveArities: {
  readonly [T in keyof ShaderPrimitive]: number;
} = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
};
