/**
 * The location of a polygon's vertex.
 */
export type Location = {
  /**
   * The position of the vertex on the X axis, where negative values are to the left and positive values are to the right.
   */
  readonly x: number;

  /**
   * The position of the vertex on the Y axis, where negative values are below and positive values are above.
   */
  readonly y: number;

  /**
   * The position of the vertex on the Z axis, where negative values are backwards and positive values are forwards.
   */
  readonly z: number;
};
