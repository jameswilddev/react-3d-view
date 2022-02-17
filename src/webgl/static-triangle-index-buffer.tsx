import type { Context } from "./context";
import { TriangleIndexBuffer } from "./triangle-index-buffer";

/**
 * A buffer of static element indices representing triangles, grouped into triangles.
 */
export abstract class StaticTriangleIndexBuffer extends TriangleIndexBuffer {
  /**
   * Creates a new buffer of static triangle element indices.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   * @param context The context under which the buffer will be created.
   * @param triangleIndices The indices of the triangles to store in the buffer, grouped into triangles.  All must be integers between 0 and 65535, inclusive.  Cannot be empty.
   */
  constructor(
    context: Context,
    private readonly triangleIndices: ReadonlyArray<
      readonly [number, number, number]
    >
  ) {
    super(context);
  }

  protected generateTriangleIndices(): ReadonlyArray<
    readonly [number, number, number]
  > {
    return this.triangleIndices;
  }
}
