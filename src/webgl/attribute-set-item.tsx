/**
 * Describes an attribute.
 */
export type AttributeSetItem =
  | {
      /**
       * The primitive type of the attribute within the array buffer.
       */
      readonly attributePrimitive: `u8`;

      /**
       * The primitive type of the attribute within the shader.
       */
      readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;

      /**
       * When true, the value is normalized, meaning that 0 is 0 and 255 is 1.
       */
      readonly normalized: boolean;
    }
  | {
      /**
       * The primitive type of the attribute within the array buffer.
       */
      readonly attributePrimitive: `u16`;

      /**
       * The primitive type of the attribute within the shader.
       */
      readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;

      /**
       * When true, the value is normalized, meaning that 0 is 0 and 65535 is 1.
       */
      readonly normalized: boolean;
    }
  | {
      /**
       * The primitive type of the attribute within the array buffer.
       */
      readonly attributePrimitive: `s8`;

      /**
       * The primitive type of the attribute within the shader.
       */
      readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;

      /**
       * When true, the value is normalized, meaning that -128 is -1 and 127 is 1.
       */
      readonly normalized: boolean;
    }
  | {
      /**
       * The primitive type of the attribute within the array buffer.
       */
      readonly attributePrimitive: `s16`;

      /**
       * The primitive type of the attribute within the shader.
       */
      readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;

      /**
       * When true, the value is normalized, meaning that -32768 is -1 and 32767 is 1.
       */
      readonly normalized: boolean;
    }
  | {
      /**
       * The primitive type of the attribute within the array buffer.
       */
      readonly attributePrimitive: `f32`;

      /**
       * The primitive type of the attribute within the shader.
       */
      readonly shaderPrimitive: `float` | `vec2` | `vec3` | `vec4`;
    };
