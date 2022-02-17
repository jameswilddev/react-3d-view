import type { VariableSetItem } from "./variable-set-item";

/**
 * Describes a set of variables, e.g. the attributes or uniforms fed into a shader program.
 */
export type VariableSet = {
  /**
   * Maps the names of the variables to their type information.
   */
  readonly [key: string]: VariableSetItem;
};
