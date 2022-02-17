import type { AttributeSetItem } from "./attribute-set-item";

/**
 * Describes a set of attributes.
 */
export type AttributeSet = {
  /**
   * Maps the names of the attributes to their type information.
   */
  readonly [key: string]: AttributeSetItem;
};
