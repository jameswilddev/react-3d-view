import type { Polygon } from ".";

/**
 * A vertex-colored model which can be rendered in a viewport.
 */
export type Model = {
  readonly polygons: ReadonlyArray<Polygon>;
};
