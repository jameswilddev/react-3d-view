/**
 * A color which can be applied to a vertex-colored polygon's vertex.
 */
export type Color = {
  /**
   * The intensity of the color's red channel, where 0 is as dark as possible, and 255 is as bright as possible.
   */
  readonly red: number;

  /**
   * The intensity of the color's green channel, where 0 is as dark as possible, and 255 is as bright as possible.
   */
  readonly green: number;

  /**
   * The intensity of the color's blue channel, where 0 is as dark as possible, and 255 is as bright as possible.
   */
  readonly blue: number;
};
