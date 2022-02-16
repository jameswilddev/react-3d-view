/**
 * A map of type names to Javascript equivalents.
 */
export type ShaderPrimitive = {
  /**
   * A 1-dimensional float.
   */
  readonly float: number;

  /**
   * A 2-dimensional floating-point vector.
   */
  readonly vec2: readonly [number, number];

  /**
   * A 3-dimensional floating-point vector.
   */
  readonly vec3: readonly [number, number, number];

  /**
   * A 4-dimensional floating-point vector.
   */
  readonly vec4: readonly [number, number, number, number];

  /**
   * A 2x2 floating-point column-order matrix.
   */
  readonly mat2: readonly [number, number, number, number];

  /**
   * A 3x3 floating-point column-order matrix.
   */
  readonly mat3: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];

  /**
   * A 4x4 floating-point column-order matrix.
   */
  readonly mat4: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
};
