import type { AttributePrimitive } from "./attribute-primitive";

/**
 * A map of attribute primitive names to their sizes in bytes (s16 = 2, etc.).
 */
export const attributePrimitiveBytes: {
  readonly [T in keyof AttributePrimitive]: number;
} = {
  u8: 1,
  s8: 1,
  u16: 2,
  s16: 2,
  f32: 4,
};
