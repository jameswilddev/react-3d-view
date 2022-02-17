import { Buffer } from "./buffer";
import { Gl } from "./constants";
import type { Context } from "./context";

/**
 * A buffer of element indices.
 */
export abstract class IndexBuffer extends Buffer {
  /**
   * Creates a new buffer of element indices.
   * @param context The context under which the buffer will be created.
   * @param mode The mode which should be used to render elements from this buffer.
   */
  constructor(
    context: Context,
    public readonly mode:
      | Gl.Points
      | Gl.LineStrip
      | Gl.LineLoop
      | Gl.Lines
      | Gl.TriangleStrip
      | Gl.TriangleFan
      | Gl.Triangles
  ) {
    super(context, Gl.ElementArrayBuffer);
  }

  _count = 0;
  _type: Gl.UnsignedByte | Gl.UnsignedShort = Gl.UnsignedByte;

  protected generateData(): BufferSource {
    const indices = this.generateIndices();

    this._count = indices.length;

    if (indices.includes(Number.NaN)) {
      throw new Error(`Indices cannot be NaN.`);
    } else if (indices.some((index) => !Number.isFinite(index))) {
      throw new Error(`Indices must be finite.`);
    } else if (indices.some((index) => !Number.isInteger(index))) {
      throw new Error(`Indices must be integers.`);
    } else if (indices.some((index) => index < 0)) {
      throw new Error(`Indices cannot be less than 0.`);
    } else if (indices.some((index) => index > 65535)) {
      throw new Error(`Indices cannot be greater than 65535.`);
    } else if (indices.some((index) => index > 255)) {
      this._type = Gl.UnsignedShort;
      return Uint16Array.from(indices);
    } else {
      this._type = Gl.UnsignedByte;
      return Uint8Array.from(indices);
    }
  }

  /**
   * Lists the indices which are to be included in the buffer.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   * @returns The indices which are to be included in the buffer.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   */
  protected abstract generateIndices(): ReadonlyArray<number>;
}
