import type { Color, Location } from ".";

/**
 * A vertex within a vertex-colored polygon.
 */
export type Vertex = {
  /**
   * The location of the vertex.
   */
  readonly location: Location;

  /**
   * The color of the vertex.  This will be interpolated over the surface of the polygon.
   */
  readonly color: Color;
};
