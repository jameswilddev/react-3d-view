import type { CSSProperties } from "react";
import type { Model } from "./Model";

/**
 * The props given to the Viewport component.
 */
export type ViewportProps = {
  /**
   * The model to render in the viewport.  This is shallow compared to determine whether changes need to be uploaded to the GPU, so do not mutate the content of this value, nor provide a different instance containing the same data (as this will impact performance).
   */
  readonly model: Model;

  /**
   * The "yaw" about the Y axis, in radians.  When 0, the camera is at negative Z relative to the model.  When PI/2, the camera is at negative X relative to the model.
   */
  readonly azimuth: number;

  /**
   * The "pitch" about the X/Z axes after applying the azimuth, in radians.  When 0, the camera points directly at the horizon.  When PI/2, the camera points directly down (towards negative Y).
   */
  readonly altitude: number;

  /**
   * The styling applied to the viewport itself.
   */
  readonly style?: undefined | CSSProperties;
};
