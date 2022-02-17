import type { AttributePrimitive } from "./attribute-primitive";
import { Gl } from "./constants";

/**
 * A map of attribute primitive names to their type constants (u8 = UNSIGNED_BYTE, etc.).
 */
export const attributePrimitiveTypes: {
  readonly [T in keyof AttributePrimitive]:
    | Gl.UnsignedByte
    | Gl.Byte
    | Gl.UnsignedShort
    | Gl.Short
    | Gl.Float;
} = {
  u8: Gl.UnsignedByte,
  s8: Gl.Byte,
  u16: Gl.UnsignedShort,
  s16: Gl.Short,
  f32: Gl.Float,
};
