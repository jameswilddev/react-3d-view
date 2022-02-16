/**
 * A map of attribute data type names to Javascript equivalents.
 */
export type AttributePrimitive = {
  /**
   * An unsigned 8-bit integer (0 to 255, inclusive).
   */
  readonly u8: number;

  /**
   * A signed 8-bit integer (-128 to 127, inclusive).
   */
  readonly s8: number;

  /**
   * An unsigned 16-bit integer (0 to 65535, inclusive).
   */
  readonly u16: number;

  /**
   * A signed 16-bit integer (-32768 to 32767, inclusive).
   */
  readonly s16: number;

  /**
   * A 32-bit floating-point number.
   */
  readonly f32: number;
};
