import { Gl } from "./constants";
import type { Context } from "./context";
import { IndexBuffer } from "./index-buffer";

/**
 * A buffer of element indices representing triangles, grouped into triangles.
 */
export abstract class TriangleIndexBuffer extends IndexBuffer {
  /**
   * Creates a new buffer of triangle element indices.
   * @param context The context under which the buffer will be created.
   */
  constructor(context: Context) {
    super(context, Gl.Triangles);
  }

  protected generateIndices(): ReadonlyArray<number> {
    return this.generateTriangleIndices().flat();
  }

  /**
   * Lists the indices which are to be included in the buffer, grouped into triangles.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   * @returns The indices which are to be included in the buffer, grouped into triangles.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   */
  protected abstract generateTriangleIndices(): ReadonlyArray<
    readonly [number, number, number]
  >;
}
