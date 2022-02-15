import type { Vertex } from ".";

/**
 * A vertex-colored polygon.
 */
export type Polygon = {
  /**
   * The vertices of the vertex-colored polygon.  These should describe a planar, convex polygon, wound clockwise.  Must contain at least 3 items.
   */
  readonly vertices: ReadonlyArray<Vertex>;
};
